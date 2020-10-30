import { templator } from '../../services/templator.service.js';
import UploadService from '../../services/upload.service.js';
import { Block } from '../../utils/block.js';
import {
    AvatarComponentProps,
    IAvatarComponentExternalProps,
} from './interfaces.js';

export default class Avatar extends Block<AvatarComponentProps> {
    constructor(props: IAvatarComponentExternalProps) {
        let upload: (base64: string) => void;

        if (props.handlers) {
            upload = props.handlers.upload;
        }

        super({
            tagName: 'app-avatar',
            props: {
                ...props,
                handlers: {
                    ...(props.handlers || {}),
                    upload: () => {
                        if (!this.props.canChangeAvatar) {
                            return;
                        }

                        return this._uploadAvatar(upload);
                    },
                },
            },
        });
    }

    private _uploadAvatar(callback: (base64: string) => void) {
        UploadService.upload()
            .then((fileList) => UploadService.getBase64(fileList[0]))
            .then((base64) => callback(base64));
    }

    render() {
        return templator
            .getEnvironment()
            .render('../static/components/avatar.tmpl.njk', {
                ...this.props,
            });
    }
}
