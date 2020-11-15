import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import {
    IMessage,
    IMessageComponentExternalProps,
    MessageComponentProps,
} from './interfaces.js';

export default class MessageComponent extends Block<MessageComponentProps> {
    constructor(props: IMessageComponentExternalProps) {
        super({
            tagName: 'app-messages',
            props: {
                ...props,
            },
        });
    }

    componentDidMount() {
        this.setProps({
            class: this._getClasses(this.props.message),
        });
    }

    private _getClasses(message: IMessage) {
        const element = 'message-list__item';

        let res: string[] = [];

        if (message.isMyMessage) {
            res.push(`${element}_my`);
        }

        if (message.type === 'text') {
            res.push(`${element}_text`);
        }

        if (message.type === 'image') {
            res.push(`${element}_image`);
        }

        return res.join(' ');
    }

    render() {
        return templator
            .getTemplate('../app/components/message/message.tmpl.njk')
            .render({
                ...this.props,
            });
    }
}
