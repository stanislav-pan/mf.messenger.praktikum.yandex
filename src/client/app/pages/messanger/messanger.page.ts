import BriefInformationComponent from '../../components/brief-information/brief-information';
import ChatManagementComponent from '../../components/chat-management/chat-management';
import { ChatManagementComponentType } from '../../components/chat-management/interfaces';
import ChatsComponent from '../../components/chats/chats';
import { IMenuItem } from '../../components/menu/interfaces';
import MenuComponent from '../../components/menu/menu';
import { IMessage } from '../../components/message/interfaces';
import MessagesComponent from '../../components/messages/messages';
import ModalComponent from '../../components/modal/modal';
import SearchComponent from '../../components/search/search';
import { Chat } from '../../core/models/chat';
import { User } from '../../core/models/user';
import { router } from '../../init-router';
import { apiService } from '../../services/chats-api/api.service';
import { chatsService } from '../../services/chats.service';
import { templator } from '../../services/templator.service';
import { userService } from '../../services/user.service';
import { Block } from '../../utils/block';
import { FormGroup } from '../../utils/forms/form-group';
import { MessangerPageProps } from './interfaces';

export default class MessangerPage extends Block<MessangerPageProps> {
    private _bindedChatsChangingHandler;

    get loginFormGroup(): FormGroup {
        return this.props.components?.loginForm?.props?.formGroup;
    }

    constructor() {
        const { avatar } = userService.getUser();

        const messages = [
            {
                type: 'dateDivider',
                date: '19 июня',
            },
            {
                type: 'text',
                text: `Here you can find activities to practise your reading skills. Reading will help you to improve your understanding of the language and build your vocabulary. The self-study lessons in this section are written and organised according to the levels of the Common European Framework of Reference for languages (CEFR). There are different types of texts and insteractive exercises that practise the reading skills you need to do well in your studies, to get ahead at work and to communicate in English in your free time. Take our free online English test to find out which level to choose. Select your level, from beginner (CEFR level A1) to advanced (CEFR level C1), and improve your reading skills at your own speed, whenever it's convenient for you.`,
                time: '11:56',
            },
            {
                type: 'image',
                time: '11:56',
            },
            {
                type: 'text',
                text: 'Круто!',
                time: '11:56',
                isMyMessage: true,
            },
        ].reverse() as IMessage[];

        super({
            tagName: 'app-messanger-page',
            props: {
                currectChatId: null,
                components: {
                    search: new SearchComponent({
                        handlers: {
                            submit: (_, query: string) => {
                                console.log(query);
                            },
                        },
                    }),
                    messages: new MessagesComponent({ messages }),
                    briefInformation: new BriefInformationComponent({
                        name: userService.getUser().getDisplayName(),
                        lastVisit: userService.getUser().getLastVisit(),

                        avatarSrc: avatar,
                    }),
                    chats: new ChatsComponent({
                        chats: [],
                        handlers: {
                            click: (_, chat: Chat) => {
                                this.setProps({ currectChatId: chat.id });

                                this.props.components.briefInformation.setProps({
                                    name: chat.title,
                                    avatarSrc: chat.avatar
                                })
                            },
                        },
                    }),
                },
                handlers: {
                    goToSettings: () => this._goToSettings(),
                    createChat: () => this._createChat(),
                    showChatMenu: (event: Event) => {
                        event.stopPropagation();

                        this._showOrHideChatMenu(
                            !this.props.components.chatMenu
                        );
                    },
                },
            } as MessangerPageProps,
        });
    }

    componentDidMount() {
        chatsService.fetchChats();

        this._bindedChatsChangingHandler = this._chatsChangingHandler.bind(
            this
        );

        chatsService.subscribe(this._bindedChatsChangingHandler);
    }

    componentWillUnmount() {
        chatsService.unsubscribe(this._bindedChatsChangingHandler);
    }

    private _chatsChangingHandler(chats: Chat[]) {
        this.props.components.chats.setProps({
            chats,
            // chats: chats.map((chat) => ({
            //     avatarSrc: chat.avatar,
            //     name: chat.title,
            //     text: '',
            //     data: '10:49',
            //     numberOfUnreadMessages: 2,
            // })),
        });

        console.error(chats);
    }

    private _createChat() {
        this._showOrHideCreateChatModal(true);
    }

    private _showOrHideCreateChatModal(
        show: boolean = true,
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
                              currectChatId: this.props.currectChatId,
                              ...(selectedUsers && { selectedUsers }),
                              handlers: {
                                  complete: () =>
                                      this._showOrHideCreateChatModal(false),
                              },
                          }),
                          handlers: {
                              close: () =>
                                  this._showOrHideCreateChatModal(false),
                          },
                      })
                    : null,
            },
        });
    }

    private _showOrHideChatMenu(show: boolean = true) {
        this.setProps({
            components: {
                ...this.props.components,
                chatMenu: show
                    ? new MenuComponent({
                          items: [
                              {
                                  title: 'Edit participants',
                                  callback: () => {
                                      if (!this.props.currectChatId) {
                                          return;
                                      }

                                      apiService.chats
                                          .getChatUsers(
                                              this.props.currectChatId
                                          )
                                          .then((users) => {
                                              this._showOrHideCreateChatModal(
                                                  true,
                                                  'edit',
                                                  users.filter(
                                                      (user) =>
                                                          user.id !==
                                                          userService.getUser()
                                                              .id
                                                  )
                                              );
                                          });
                                  },
                              },
                              {
                                  title: 'Delete chat',
                                  callback: () => {
                                      if (!this.props.currectChatId) {
                                          return;
                                      }

                                      chatsService
                                          .deleteChat(this.props.currectChatId)
                                          .then(() => {
                                              this.props.currectChatId = null;
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
                          class: 'messanger__chat-menu',
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

    public render() {
        const {
            briefInformation,
            chats,
            search,
            messages,
            modal,
            chatMenu,
        } = this.props.components;

        return templator
            .getTemplate('app/pages/messanger/messanger.tmpl.njk')
            .render({
                ...this.props,
                briefInformationComponentId: briefInformation.getId(),
                chatsCopmonentId: chats.getId(),
                searchComponentId: search.getId(),
                messagesComponentId: messages.getId(),
                modalComponentId: modal?.getId(),
                chatMenuComponentId: chatMenu?.getId(),
            });
    }
}
