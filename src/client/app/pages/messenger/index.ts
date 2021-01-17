import BriefInformationComponent from '@components/brief-information';
import Button from '@components/button';
import ChatManagementComponent from '@components/chat-management';
import { ChatManagementComponentType } from '@components/chat-management/interfaces';
import ChatsComponent from '@components/chats';
import MenuComponent from '@components/menu';
import { IMenuItem } from '@components/menu/interfaces';
import { IMessage } from '@components/message/interfaces';
import MessagesComponent from '@components/messages/messages';
import ModalComponent from '@components/modal';
import SearchComponent from '@components/search';
import { SubmitEvent } from '@core/interfaces';
import { Chat } from '@core/models/chat';
import { User } from '@core/models/user';
import { FormControl } from '@forms/form-control';
import { getPrettyGroupingDate } from '@my-lodash/get-pretty-grouping-date';
import { apiService } from '@services/chats-api/api.service';
import { chatsService } from '@services/chats.service';
import { userService } from '@services/user.service';
import { Block } from '@utils/block';
import { router } from '../../init-router';
import { MessengerPageProps } from './interfaces';

import './messenger.scss';
import template from './messenger.tmpl.njk';

export default class MessengerPage extends Block<MessengerPageProps> {
  private _bindedChatsChangingHandler;

  constructor() {
    const { avatar } = userService.getUser();

    super({
      tagName: 'app-messenger-page',
      props: {
        selectedChat: null,
        messageInput: new FormControl(''),
        components: {
          search: new SearchComponent({
            handlers: {
              submit: () => {
                console.log('Search');
              },
            },
          }),
          messages: new MessagesComponent({ messages: [] }),
          briefInformation: new BriefInformationComponent({
            name: userService.getUser().getDisplayName(),
            lastVisit: userService.getUser().getLastVisit(),

            avatarSrc: avatar,
          }),
          chats: new ChatsComponent({
            chats: [],
            handlers: {
              click: (_, chat: Chat) => {
                if (chat.id === this.props.selectedChat?.id) {
                  return;
                }

                this.setProps({ selectedChat: chat });

                this.props.components.briefInformation.setProps({
                  name: chat.title,
                  avatarSrc: chat.avatar,
                });

                chat.subscribeOnMessages((messages) => {
                  let groupingDate: Date;

                  const isSameDay = (date1: Date, date2: Date) =>
                    date1.getFullYear() === date2.getFullYear() &&
                    date1.getMonth() === date2.getMonth() &&
                    date1.getDay() === date2.getDay();

                  const mappedMessages: IMessage[] = [];

                  [...messages].reverse().forEach((message) => {
                    if (
                      !groupingDate ||
                      !isSameDay(groupingDate, message.time)
                    ) {
                      groupingDate = message.time;

                      mappedMessages.push({
                        type: 'dateDivider',
                        date: getPrettyGroupingDate(groupingDate),
                      });
                    }

                    mappedMessages.push({
                      type: 'text',
                      text: message.content,
                      time: message.getMappedTime(),
                      isMyMessage: chat.isMessageOfCurrentUser(message),
                    });
                  });

                  this.props.components.messages.setProps({
                    messages: mappedMessages.reverse(),
                  });
                });
              },
            },
          }),
          createChatBtn: new Button({
            text: 'Create chat',
            class: 'messenger__create-chat-btn',
            handlers: {
              click: (event: Event) => {
                event.preventDefault();

                this._createChat();
              },
            },
          }),
        },
        handlers: {
          goToSettings: () => this._goToSettings(),
          showChatMenu: (event: Event) => {
            event.stopPropagation();

            this._showOrHideChatMenu(!this.props.components.chatMenu);
          },
          send: (event: SubmitEvent) => {
            event.preventDefault();

            const message = this.props.messageInput.getValue();

            if (!message) {
              return;
            }

            this.props.selectedChat?.sendMessage(message);

            this.props.messageInput.reset();
          },
        },
      } as MessengerPageProps,
    });
  }

  componentDidMount(): void {
    chatsService.fetchChats(userService.getUser().id);

    this._bindedChatsChangingHandler = this._chatsChangingHandler.bind(this);

    chatsService.subscribe(this._bindedChatsChangingHandler);
  }

  componentWillUnmount(): void {
    chatsService.unsubscribe(this._bindedChatsChangingHandler);
  }

  private _chatsChangingHandler(chats: Chat[]) {
    this.props.components.chats.setProps({ chats });
  }

  private _createChat() {
    this._showOrHideCreateChatModal(true);
  }

  private _showOrHideCreateChatModal(
    show = true,
    componentType: ChatManagementComponentType = 'create',
    selectedUsers?: User[]
  ) {
    this.setProps({
      components: {
        ...this.props.components,
        modal: show
          ? new ModalComponent({
              component: new ChatManagementComponent({
                componentType,
                currectChatId: this.props.selectedChat?.id,
                ...(selectedUsers && { selectedUsers }),
                handlers: {
                  complete: () => this._showOrHideCreateChatModal(false),
                },
              }),
              handlers: {
                close: () => this._showOrHideCreateChatModal(false),
              },
            })
          : null,
      },
    });
  }

  private _showOrHideChatMenu(show = true) {
    this.setProps({
      components: {
        ...this.props.components,
        chatMenu: show
          ? new MenuComponent({
              items: [
                {
                  title: 'Edit participants',
                  callback: () => {
                    if (!this.props.selectedChat?.id) {
                      return;
                    }

                    apiService.chats
                      .getChatUsers(this.props.selectedChat.id)
                      .then((users) => {
                        this._showOrHideCreateChatModal(
                          true,
                          'edit',
                          users.filter(
                            (user) => user.id !== userService.getUser().id
                          )
                        );
                      });
                  },
                },
                {
                  title: 'Delete chat',
                  callback: () => {
                    if (!this.props.selectedChat?.id) {
                      return;
                    }

                    chatsService
                      .deleteChat(this.props.selectedChat.id)
                      .then(() => {
                        this.props.selectedChat = null;
                      });
                  },
                },
              ],
              handlers: {
                select: (item: IMenuItem) => {
                  this._showOrHideChatMenu(false);

                  item.callback();
                },
                close: () => this._showOrHideChatMenu(false),
              },
              class: 'messenger__chat-menu',
            })
          : (() => {
              this.props.components.chatMenu?.remove();

              return null;
            })(),
      },
    });
  }

  private _goToSettings() {
    router.go('/settings');
  }

  public render(): string {
    const {
      briefInformation,
      chats,
      search,
      messages,
      modal,
      chatMenu,
      createChatBtn,
    } = this.props.components;

    return template({
      ...this.props,
      briefInformationComponentId: briefInformation.getId(),
      chatsCopmonentId: chats.getId(),
      searchComponentId: search.getId(),
      messagesComponentId: messages.getId(),
      modalComponentId: modal?.getId(),
      chatMenuComponentId: chatMenu?.getId(),
      createChatBtnCopmonentId: createChatBtn?.getId(),
    });
  }
}
