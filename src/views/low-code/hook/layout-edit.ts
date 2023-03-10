export interface LeftMenuOptions {
    open: string[];
    widgets: MenuItemOptions[];
    layouts: EditBoxOptions[];
}
export interface MenuItemOptions {
    name: string;
    icon: string;
    desc?: string;
    items: EditBoxOptions[];
}
export interface EditBoxOptions {
    name: string;
    icon: string;
    active: boolean;
    widget: string;
    width: number;
    height: number;
    top: number;
    left: number;
    visible: boolean;
}
