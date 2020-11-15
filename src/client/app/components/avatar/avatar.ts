import { templator } from '../../services/templator.service.js';
import UploadService from '../../services/upload.service.js';
import { Block } from '../../utils/block.js';
import {
    AvatarComponentProps,
    IAvatarComponentExternalProps,
} from './interfaces.js';

export default class Avatar extends Block<AvatarComponentProps> {
    constructor(props: IAvatarComponentExternalProps) {
        let upload: (file: File) => void;

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

    private _uploadAvatar(callback: (ile: File) => void) {
        UploadService.upload()
            .then((fileList) => fileList[0])
            .then((file) => callback(file));
    }

    render() {
        return templator
            .getTemplate('../app/components/avatar/avatar.tmpl.njk')
            .render({
                ...this.props,
            });
    }
}
