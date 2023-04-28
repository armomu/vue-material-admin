export interface LeftMenuOptions {
    open: string[];
    attrTab: string;
    widgets: MenuItemOptions[];
    layouts: EditBoxOptions[];
}
export interface MenuItemOptions {
    name: string;
    icon: string;
    open: boolean;
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
export interface SnapLine {
    display: boolean;
    id: number;
    lineLength: string;
    origin: string;
    position: string;
}
