import { SubmitEvent } from '../../core/interfaces.js';
import FormDataPerserService from '../../services/form-data-parser.service.js';
import { templator } from '../../services/templator.service.js';
import { Block } from '../../utils/block.js';
import Avatar from '../avatar/avatar.js';
import {
    BriefInformationProps,
    IBriefInformationExternalProps,
} from './interfaces.js';

export default class BriefInformationComponent extends Block<
    BriefInformationProps
> {
    constructor(props?: IBriefInformationExternalProps) {
        const {
            avatarSrc,
            canChangeName = false,
            canChangeAvatar = false,
        } = props as IBriefInformationExternalProps;

        super({
            tagName: 'app-brief-information',
            props: {
                ...props,

                displayedNameInput: false,

                components: {
                    avatar: new Avatar({
                        avatarSrc,
                        canChangeAvatar,
                        handlers: {
                            upload: (base64: string) => {
                                this._uploadAvatar(base64);
                            },
                        },
                    }),
                },
                handlers: {
                    ...(canChangeName && {
                        changeName: (event: SubmitEvent) =>
                            this._changeName(event),
                    }),
                    showNameInput: () => this._showNameInput(),
                },
            } as BriefInformationProps,
        });
    }

    public componentDidUpdate(
        old: BriefInformationProps,
        current: BriefInformationProps
    ) {
        if (old.canChangeName !== current.canChangeName) {
            this.setProps({
                handlers: {
                    ...current.handlers,
                    ...(current.canChangeName && {
                        changeName: (event: SubmitEvent) =>
                            this._changeName(event),
                    }),
                    showNameInput: () => this._showNameInput(),
                },
            });
        }

        if (old.canChangeAvatar !== current.canChangeAvatar) {
            this.props.components.avatar.setProps({
                canChangeAvatar: current.canChangeAvatar,
            });
        }

        return true;
    }

    private _changeName(event: SubmitEvent) {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;

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
            .render('../app/components/brief-information/brief-information.tmpl.njk', {
                ...this.props,
                avatarComponentId: this.props.components.avatar.getId(),
            });
    }
}
