import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import Avatar from '../avatar/avatar.js';
import {
    IChatComponentExternalProps,
    IChatComponentInnerProps,
} from './interfaces.js';

export default class ChatComponent extends Block<IChatComponentInnerProps> {
    constructor(props: IChatComponentExternalProps) {
        const click = props.handlers.click;
        const avatarSrc = props.chat.avatar;

        super({
            tagName: 'app-chat',
            props: {
                ...props,
                handlers: {
                    click: (event: MouseEvent) => click(event, props.chat),
                },
                components: {
                    avatar: new Avatar({
                        avatarSrc,
                    }),
                },
            } as IChatComponentInnerProps,
        });
    }

    render() {
        return templator
            .getTemplate('../app/components/chat/chat.tmpl.njk')
            .render({
                ...this.props,
                avatarComponentId: this.props.components.avatar.getId(),
            });
    }
}
