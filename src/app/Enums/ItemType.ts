export enum ItemType {
    Weapon = 1,
    Armor,
    Accessory,
    Consumable,
    SkillCard,
    Loot,
    TraitBoost,
    StatBoost,
    None
}

const DisplayMiscItemTypes = [ItemType.Consumable, ItemType.Loot, ItemType.TraitBoost, ItemType.StatBoost];

export function getDisplayMiscItemTypes(): ItemType[] {
    return DisplayMiscItemTypes;
}

export function getItemTypeName(itemType: ItemType): string {
    switch (itemType) {
        case ItemType.SkillCard:
            return 'Skill Card';
        case ItemType.StatBoost:
            return 'Stat Boost';
        case ItemType.TraitBoost:
            return 'Trait Boost';
        case ItemType.Weapon:
        case ItemType.Armor:
        case ItemType.Accessory:
        case ItemType.Consumable:
        case ItemType.Loot:
        case ItemType.None:
            return ItemType[itemType];
    }
}
