import UploadService from '../../services/upload.service';
import { Block } from '../../utils/block';
import {
  AvatarComponentProps,
  IAvatarComponentExternalProps,
} from './interfaces';

import './avatar.scss';
import template from './avatar.tmpl.njk';

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
    return template({ ...this.props });
  }
}
