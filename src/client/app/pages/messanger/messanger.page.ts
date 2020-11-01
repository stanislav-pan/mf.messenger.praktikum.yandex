import BriefInformationComponent from '../../components/brief-information/brief-information.js';
import { IChat } from '../../components/chat/interfaces.js';
import ChatsComponent from '../../components/chats/chats.js';
import { IMessage } from '../../components/message/interfaces.js';
import MessagesComponent from '../../components/messages/messages.js';
import SearchComponent from '../../components/search/search.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { FormGroup } from '../../utils/forms/form-group.js';
import { MessangerPageProps } from './interfaces.js';

export default class MessangerPage extends Block<MessangerPageProps> {
    get loginFormGroup(): FormGroup {
        return this.props.components?.loginForm?.props?.formGroup;
    }

    constructor() {
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
            tagName: 'app-login-page',
            props: {
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
                        name: 'Stanislav',
                        lastVisit: 'was last seen today at 21:37',

                        avatarSrc: '/assets/images/my-avatar.png',
                    }),
                    chats: new ChatsComponent({
                        chats: [
                            {
                                avatarSrc: '/assets/images/my-avatar.png',
                                name: 'Andrew',
                                text:
                                    'ImageImageImageImage ImageImageImage ImageImageImage ImageImageImage ImageImage',
                                date: '10:49',
                                numberOfUnreadMessages: 2,
                            },
                        ],
                        handlers: {
                            click: (_, chat: IChat) => {
                                console.log(chat);
                            },
                        },
                    }),
                },
                handlers: {
                    goToSettings: () => this._goToSettings(),
                },
            } as MessangerPageProps,
        });
    }

    private _goToSettings() {
        window.location.href = `${window.location.origin}/static/settings.html`;
    }

    public render() {
        return templator.getEnvironment().render('pages/messanger.tmpl.njk', {
            ...this.props,
            briefInformationComponentId: this.props.components.briefInformation.getId(),
            chatsCopmonentId: this.props.components.chats.getId(),
            searchComponentId: this.props.components.search.getId(),
            messagesComponentId: this.props.components.messages.getId(),
        });
    }
}
