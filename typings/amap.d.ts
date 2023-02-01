declare const Loca: {
    Container: {
        // eslint-disable-next-line no-unused-vars
        new (options: { map: any }): any;
    };
    GeoJSONSource: {
        // eslint-disable-next-line no-unused-vars
        new (options: { url: string }): any;
    };
    PolygonLayer: {
        // eslint-disable-next-line no-unused-vars
        new (options: {
            zIndex: number;
            shininess: number;
            hasSide: boolean;
            cullface: string;
            depth: boolean;
        }): any;
    };
    Dat: {
        // eslint-disable-next-line no-unused-vars
        new (): any;
    };
};
