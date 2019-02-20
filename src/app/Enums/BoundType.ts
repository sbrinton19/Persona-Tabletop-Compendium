export enum BoundType {
    Activity = 1,
    Item = 2,
    None = 0
}

export function getBoundTypeName(boundType: BoundType): string {
    switch (boundType) {
        case BoundType.Activity:
        case BoundType.Item:
        case BoundType.None:
            return BoundType[boundType];
    }
}
