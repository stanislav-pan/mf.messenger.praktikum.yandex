import { SubmitEvent } from '../../core/interfaces.js';
import FormDataPerserService from '../../services/form-data-parser.service.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import { Avatar } from '../avatar/index.js';
import {
    BriefInformationProps,
    IBriefInformationExternalProps,
} from './interfaces.js';

export default class BriefInformationComponent extends Block<
    BriefInformationProps
> {
    constructor(props?: IBriefInformationExternalProps) {
        const { avatarSrc } = props;

        super({
            tagName: 'app-brief-information',
            props: {
                ...props,

                displayedNameInput: false,

                components: {
                    avatar: new Avatar({
                        avatarSrc,
                        handlers: {
                            upload: (base64: string) => {
                                this._uploadAvatar(base64);
                            },
                        },
                    }),
                },
                handlers: {
                    ...(props.canChangeName && {
                        changeName: (event: SubmitEvent) =>
                            this._changeName(
                                event.currentTarget as HTMLFormElement
                            ),
                    }),
                    showNameInput: () => this._showNameInput(),
                },
            } as BriefInformationProps,
        });
    }

    private _changeName(form: HTMLFormElement) {
        const { displayNameInput } = FormDataPerserService.getFormValues<{
            displayNameInput: string;
        }>(form);

        this.setProps({
            name: displayNameInput,
            displayedNameInput: false,
        });
    }

    private _showNameInput() {
        this.setProps({
            displayedNameInput: true,
        });
    }

    private _uploadAvatar(base64: string) {
        this.props.components.avatar.setProps({
            avatarSrc: base64,
        });
    }

    render() {
        return templator
            .getEnvironment()
            .render('../static/components/brief-information.tmpl.njk', {
                ...this.props,
                avatarComponentId: this.props.components.avatar.getId(),
            });
    }
}
