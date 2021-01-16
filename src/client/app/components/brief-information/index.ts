import Avatar from '@components/avatar';
import { SubmitEvent } from '@core/interfaces';
import { parseFormValues } from '@my-lodash/parse-form-values';
import { userService } from '@services/user.service';
import { Block } from '@utils/block';
import {
  BriefInformationProps,
  IBriefInformationExternalProps,
} from './interfaces';

import './brief-information.scss';
import template from './brief-information.tmpl.njk';

export default class BriefInformationComponent extends Block<BriefInformationProps> {
  constructor(props?: IBriefInformationExternalProps) {
    const {
      avatarSrc,
      canChangeName = false,
      canChangeAvatar = false,
      handlers: { click } = {},
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
              upload: (file: File) => userService.changeAvatar(file),
            },
          }),
        },
        handlers: {
          ...(click && { click }),
          ...(canChangeName && {
            changeName: (event: SubmitEvent) => this._changeName(event),
          }),
          showNameInput: () => this._showNameInput(),
        },
      } as BriefInformationProps,
    });
  }

  public componentDidUpdate(
    old: BriefInformationProps,
    current: BriefInformationProps
  ): boolean {
    if (old.canChangeName !== current.canChangeName) {
      this.setProps({
        displayedNameInput: false,
        handlers: {
          ...current.handlers,
          ...(current.canChangeName && {
            changeName: (event: SubmitEvent) => this._changeName(event),
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

    if (old.avatarSrc !== current.avatarSrc) {
      this.props.components.avatar.setProps({
        avatarSrc: current.avatarSrc,
      });
    }

    return true;
  }

  private _changeName(event: SubmitEvent) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;

    const { displayNameInput } = parseFormValues<{
      displayNameInput: string;
    }>(form);

    userService
      .changeProfile({
        ...userService.getUser(),
        displayName: displayNameInput,
      })
      .then(() => {
        this.setProps({
          name: displayNameInput,
          displayedNameInput: false,
        });
      });
  }

  private _showNameInput() {
    this.setProps({
      displayedNameInput: true,
    });

    const input = document.querySelector(
      '[name=displayNameInput]'
    ) as HTMLInputElement;

    if (!input) {
      return;
    }

    input.focus();
    input.selectionStart = input.value.length;
  }

  render(): string {
    return template({
      ...this.props,
      avatarComponentId: this.props.components.avatar.getId(),
    });
  }
}
