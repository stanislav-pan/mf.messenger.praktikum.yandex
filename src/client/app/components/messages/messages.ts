import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import MessageComponent from '../message/message.js';
import {
    IMessagesComponentExternalProps,
    MessagesComponentProps,
} from './interfaces.js';

export default class MessagesComponent extends Block<MessagesComponentProps> {
    constructor(props: IMessagesComponentExternalProps) {
        const messagesComponentsIds: string[] = [];

        const messages = props.messages.reduce((acc, message) => {
            const messageComponent = new MessageComponent({
                message,
            });

            const id = messageComponent.getId();
            acc[id] = messageComponent;
            messagesComponentsIds.push(messageComponent.getId());

            return acc;
        }, {});

        super({
            tagName: 'app-messages',
            props: {
                ...props,
                messagesComponentsIds,
                components: {
                    ...messages,
                },
            },
        });
    }

    render() {
        return templator
            .getEnvironment()
            .render('../static/components/messages.tmpl.njk', {
                ...this.props,
            });
    }
}
