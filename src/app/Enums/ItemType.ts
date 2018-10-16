export enum ItemType {
    Weapon = 1,
    Armor,
    Accessory,
    Consumable,
    SkillCard,
    Loot,
    None
}

export function getItemTypeName(itemType: ItemType): string {
    switch (itemType) {
        case ItemType.Weapon:
        case ItemType.Armor:
        case ItemType.Accessory:
        case ItemType.Consumable:
        case ItemType.SkillCard:
        case ItemType.Loot:
        case ItemType.None:
            return ItemType[itemType];
    }
}
