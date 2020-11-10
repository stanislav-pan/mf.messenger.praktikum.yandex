import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import ChatComponent from '../chat/chat.js';
import { IChat } from '../chat/interfaces.js';
import {
    IChatsComponentExternalProps,
    IChatsComponentInnerProps,
} from './interfaces.js';

export default class ChatsComponent extends Block<IChatsComponentInnerProps> {
    constructor(props: IChatsComponentExternalProps) {
        const click = props.handlers.click;

        const chatsComponentsIds: string[] = [];

        const chats = props.chats.reduce((acc, chat) => {
            const chatComponent = new ChatComponent({
                chat,
                handlers: { click },
            });

            const id: string = chatComponent.getId();
            acc[id] = chatComponent;

            chatsComponentsIds.push(id);

            return acc;
        }, {});

        super({
            tagName: 'app-chats',
            props: {
                ...props,
                chatsComponentsIds,
                components: {
                    ...chats,
                },
                handlers: {
                    click: (event: MouseEvent, chat: IChat) =>
                        click(event, chat),
                },
            },
        });
    }

    render() {
        return templator
            .getEnvironment()
            .render('../app/components/chats/chats.tmpl.njk', {
                ...this.props,
            });
    }
}
