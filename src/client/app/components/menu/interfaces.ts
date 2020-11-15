import { ICommonPropFields } from '../../utils/block';

export interface IMenuComponentExternalProps extends ICommonPropFields {
    items: IMenuItem[];

    handlers: {
        select: (item: IMenuItem) => void;
    };
}

export interface IMenuComponentInnerProps {
    handlers: {
        click: (event: Event, index: number) => void;
    };
}

export type MenuComponentProps = IMenuComponentExternalProps &
    IMenuComponentInnerProps;

export interface IMenuItem {
    index?: number;
    title: string;
    iconTemplate?: string;

    callback: () => void;
}
