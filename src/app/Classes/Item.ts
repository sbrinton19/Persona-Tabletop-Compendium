import { Arcana } from './Persona';

export enum ItemType {
    Weapon = 1,
    Armor,
    Accessory,
    Consumable,
    SkillCard,
    Loot,
    None
}

export enum ConsumableType {
    Battle = 1,
    Roam,
    Both,
    None
}

export enum OriginType {
    Transmute = 1,
    Store = 2,
    Chest = 4,
    Drop = 8,
    Confidant = 16,
    Error = 32,
    None = 0
}

export enum ArmorClass {
    Mystic = 1,
    Light,
    Heavy,
    Shield
}

export enum GearPool {
    Reveler = 1,
    Shouzoku,
    Prisoner,
    Uniform,
    Patient,
    Scrubs,
    Student,
    Gown,
    Servant,
    Tuxedo,
    Slave,
    Ancient,
    Spirit,
    Desecrated
}

export function getGearPoolName(gearPoolEnum: GearPool): string {
    switch (gearPoolEnum) {
        case GearPool.Reveler:
            return 'Reveler\'s Clothing';
        case GearPool.Shouzoku:
            return 'Burned Shozoku';
        case GearPool.Prisoner:
            return 'Prisoner\'s Jumpsuit';
        case GearPool.Uniform:
            return 'Grimy Guard Uniform';
        case GearPool.Patient:
            return 'Patient\'s Gown';
        case GearPool.Scrubs:
            return 'Bloodstained Scrubs';
        case GearPool.Student:
            return 'Student\'s Uniform';
        case GearPool.Gown:
            return 'Stick Gown';
        case GearPool.Servant:
            return 'Servant\'s Clothes';
        case GearPool.Tuxedo:
            return 'Smokestained Tuxedo';
        case GearPool.Slave:
            return 'Slave\'s Rags';
        case GearPool.Ancient:
            return 'Ancient Armor';
        case GearPool.Spirit:
            return 'Spirit\'s Robe';
        case GearPool.Desecrated:
            return 'Desecrated Armor';
    }
}

export enum SkillCardType {
    Ally = 1,
    Main
}

export class Item {
    private static idSource = 0;
    readonly id: number;
    readonly name: string;
    readonly schedule: number;
    readonly origins: OriginType[];
    readonly description: string;
    readonly special: string;
    readonly type: ItemType;
    transmute = '';
    personaSources: Set<string> = new Set();

    static getOriginName(origin: OriginType) {
        return OriginType[origin];
    }



    constructor(name: string, schedule: number, origin: OriginType[],
        description: string, special: string, type: ItemType) {
        this.id = Item.idSource++;
        this.name = name;
        this.schedule = schedule;
        this.origins = origin;
        this.description = description;
        this.special = special;
        this.type = type;
    }

    getTypeName(): string {
        return ItemType[this.type];
    }

    getOriginName(origin: OriginType) {
        return Item.getOriginName(origin);
    }
}

export class Weapon extends Item {
    readonly baseDamage: number;
    readonly maxDamageDice: number;
    readonly damageDie: number;
    readonly range: string;
    readonly failValue: number;

    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string,
    baseDamage: number, maxDamageDice: number, damageDie: number, range: string, failValue: number) {
        super(name, schedule, origin, description, special, ItemType.Weapon);
        this.baseDamage = baseDamage;
        this.maxDamageDice = maxDamageDice;
        this.damageDie = damageDie;
        this.range = range;
        this.failValue = failValue;
    }
}

export class RangedWeapon extends Weapon {
    readonly magSize: number;
    readonly magCount: number;
    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string,
    baseDamage: number, maxDamageDice: number, damageDie: number, range: string, failValue: number,
    magSize: number, magCount: number) {
        super(name, schedule, origin, description, special, baseDamage, maxDamageDice, damageDie, range, failValue);
        this.magSize = magSize;
        this.magCount = magCount;
    }
}

export class Armor extends Item {
    readonly armorClass: ArmorClass;
    readonly damageReduction: number;
    readonly moveAimPenalty: number;
    readonly maxDodgeBonus: number;
    readonly dirtyGearPool: GearPool;

    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string,
    armorClass: ArmorClass, damageReduction: number, moveAimPenalty: number, maxDodgeBonus: number, dirtyGearPool: GearPool) {
        super(name, schedule, origin, description, special, ItemType.Armor);
        this.armorClass = armorClass;
        this.damageReduction = damageReduction;
        this.moveAimPenalty = moveAimPenalty;
        this.maxDodgeBonus = maxDodgeBonus;
        this.dirtyGearPool = dirtyGearPool;
    }

    getArmorClassName(): string {
        return ArmorClass[this.armorClass];
    }

    getGearPoolName(): string {
        return getGearPoolName(this.dirtyGearPool);
    }
}

export class Accessory extends Item {
    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string) {
        super(name, schedule, origin, description, special, ItemType.Accessory);
    }
}

export class Consumable extends Item {
    readonly consumableType: ConsumableType;

    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string,
    consumableType: ConsumableType) {
        super(name, schedule, origin, description, special, ItemType.Consumable);
        this.consumableType = consumableType;
    }
}

export class SkillCard extends Item {
    readonly skillId: number;
    readonly skillName: string;
    readonly cardType: SkillCardType;

    constructor(skillId: number, skillName: string, schedule: number, origin: OriginType[], description: string, special: string,
        cardType: SkillCardType) {
        const name = `${skillName} ${SkillCardType[cardType]}`;
        super(name, schedule, origin, description, special, ItemType.SkillCard);
        this.skillId = skillId;
        this.skillName = skillName;
        this.cardType = cardType;
    }
}

export class Loot extends Item {
    readonly arcanaSources: Arcana[];

    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string,
        arcanaSources: Arcana[]) {
        super(name, schedule, origin, description, special, ItemType.Loot);
        this.arcanaSources = arcanaSources;
    }
}

export class Drop {
    readonly item: Item;
    readonly low: number;
    readonly high: number;
    readonly name: string;
    rollWinDisplay: string;
    constructor(item: Item, low: number, high: number) {
        if (!item.origins.includes(OriginType.Drop) && item.name !== '-') {
            console.warn(`${item.name} is available as a drop, but does not have the drop OriginType`);
        }
        this.item = item;
        this.name = item.name;
        this.low = low;
        this.high = high;
    }
}
