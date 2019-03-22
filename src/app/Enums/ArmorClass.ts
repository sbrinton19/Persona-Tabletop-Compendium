export enum ArmorClass {
    Mystic = 1,
    Light,
    Heavy,
    Shield
}

const DisplayArmorClasses = [ArmorClass.Mystic, ArmorClass.Light, ArmorClass.Heavy, ArmorClass.Shield];

export function getDisplayArmorClasses(): ArmorClass[] {
    return DisplayArmorClasses;
}

export function getArmorClassName(armorClass: ArmorClass): string {
    switch (armorClass) {
        case ArmorClass.Light:
            return 'Light Armor';
        case ArmorClass.Heavy:
            return 'Heavy Armor';
        case ArmorClass.Mystic:
        case ArmorClass.Shield:
        default:
            return ArmorClass[armorClass];
    }
}
