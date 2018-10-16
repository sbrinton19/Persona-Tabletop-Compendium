export enum OriginType {
    Chest = 1,
    Confidant = 2,
    Drop = 4,
    Negotiate = 8,
    Store = 16,
    Transmute = 32,
    All = 63,
    Error = 64,
    None = 0
}

export function getOrigins(orig: number): OriginType[] {
    const origins: OriginType[] = [];
    for (const origin in OriginType) {
        if (Number(origin)) {
            if ((orig & +origin) === +origin) {
                origins.push(+origin);
            }
        }
    }
    if (origins.length === 0) {
        origins.push(0);
    }
    return origins;
}

export function getOriginName(originType: OriginType) {
    switch (originType) {
        case OriginType.Chest:
        case OriginType.Confidant:
        case OriginType.Drop:
        case OriginType.Negotiate:
        case OriginType.Store:
        case OriginType.Transmute:
        case OriginType.All:
        case OriginType.Error:
        case OriginType.None:
            return OriginType[originType];
    }
}
