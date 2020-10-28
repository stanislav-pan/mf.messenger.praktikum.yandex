import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import {
    ISettingsHeaderExternalProps,
    SettingsHeaderProps,
} from './interfaces.js';

export default class SettingsHeader extends Block<SettingsHeaderProps> {
    constructor(props: ISettingsHeaderExternalProps) {
        const close = props.handlers.close;
        const back = props.handlers.back;

        super({
            tagName: 'app-avatar',
            props: {
                ...props,
                handlers: {
                    close,
                    back,
                },
            } as SettingsHeaderProps,
        });
    }

    render() {
        return templator
            .getEnvironment()
            .render('../static/components/settings-header.tmpl.njk', {
                ...this.props,
            });
    }
}
