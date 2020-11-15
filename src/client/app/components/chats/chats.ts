import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { isEqual } from '../../utils/is-equal.js';
import ChatComponent from '../chat/chat.js';
import {
    ChatsComponentProps,
    IChatsComponentExternalProps,
} from './interfaces.js';

export default class ChatsComponent extends Block<ChatsComponentProps> {
    constructor(props: IChatsComponentExternalProps) {
        super({
            tagName: 'app-chats',
            props: {
                ...props,
                chatsComponentsIds: [],
                components: {},
            } as ChatsComponentProps,
        });
    }

    componentDidUpdate(old: ChatsComponentProps, current: ChatsComponentProps) {
        if (!isEqual(old.chats, current.chats)) {
            this._setChats();
        }

        return true;
    }

    private _setChats() {
        const click = this.props.handlers.click;
        const chatsComponentsIds: string[] = [];

        const chats = this.props.chats.reduce((acc, chat) => {
            const chatComponent = new ChatComponent({
                chat,
                handlers: { click },
            });

            const id: string = chatComponent.getId();
            acc[id] = chatComponent;

            chatsComponentsIds.push(id);

            return acc;
        }, {});

        this.setProps({
            components: {
                ...chats,
            },
            chatsComponentsIds,
        });
    }

    render() {
        return templator
            .getTemplate('../app/components/chats/chats.tmpl.njk')
            .render({
                ...this.props,
            });
    }
}
