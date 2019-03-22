export enum ConsumableType {
    Battle = 1,
    Roam,
    Both,
    None
}

const DisplayConsumableTypes = [ConsumableType.Battle, ConsumableType.Roam, ConsumableType.Both, ConsumableType.None];

export function getDisplayConsumableTypes(): ConsumableType[] {
    return DisplayConsumableTypes;
}

export function getConsumableTypeName(consumableType: ConsumableType): string {
    switch (consumableType) {
        case ConsumableType.Battle:
        case ConsumableType.Roam:
        case ConsumableType.Both:
        case ConsumableType.None:
            return ConsumableType[consumableType];
    }
}
