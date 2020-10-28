import { templator } from '../../services/templator.service.js';
import UploadService from '../../services/upload.service.js';
import { Block } from '../../utils/block.js';
import { IAvatarProps } from './interfaces.js';

export default class Avatar extends Block<IAvatarProps> {
    constructor(props: IAvatarProps) {
        const upload = props.handlers?.upload;

        super({
            tagName: 'app-avatar',
            props: {
                ...props,
                ...(typeof upload === 'function' && {
                    handlers: {
                        ...(props.handlers || {}),
                        upload: () => this._uploadAvatar(upload),
                    },
                }),
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
                canEdit: typeof this.props.handlers?.upload === 'function',
            });
    }
}
