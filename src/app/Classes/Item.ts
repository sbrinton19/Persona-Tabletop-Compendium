import { Arcana } from './Persona';

export enum ItemType {
    Weapon = 1,
    Armor,
    Accessory,
    Recovery,
    SkillCard,
    Loot,
    None
}

export enum RecoveryType {
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
    Error = 16,
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
    readonly itemId: number;
    readonly name: string;
    readonly schedule: number;
    readonly origin: number;
    readonly transmute: string;
    readonly description: string;
    readonly special: string;
    readonly type: ItemType;
    personaSources: string[] = [];

    constructor(name: string, schedule: number, origin: OriginType[],
        transmute: string, description: string, special: string, type: ItemType) {
        this.itemId = Item.idSource++;
        this.name = name;
        this.schedule = schedule;
        let sum = 0;
        origin.forEach(o => sum += o);
        this.origin = sum;
        this.transmute = transmute;
        this.description = description;
        this.special = special;
        this.type = type;
    }
}

export class Weapon extends Item {
    readonly baseDamage: number;
    readonly maxDamageDice: number;
    readonly damageDie: number;
    readonly range: string;
    readonly failValue: number;

    constructor(name: string, schedule: number, origin: OriginType[], transmute: string, description: string, special: string,
    baseDamage: number, maxDamageDice: number, damageDie: number, range: string, failValue: number) {
        super(name, schedule, origin, transmute, description, special, ItemType.Weapon);
        this.baseDamage = baseDamage;
        this.maxDamageDice = maxDamageDice;
        this.damageDie = damageDie;
        this.range = range;
        this.failValue = failValue;
    }
}

export class Armor extends Item {
    readonly armorClass: ArmorClass;
    readonly damageReduction: number;
    readonly moveAimPenalty: number;
    readonly maxDodgeBonus: number;
    readonly dirtyGearPool: GearPool;

    constructor(name: string, schedule: number, origin: OriginType[], transmute: string, description: string, special: string,
    armorClass: ArmorClass, damageReduction: number, moveAimPenalty: number, maxDodgeBonus: number, dirtyGearPool: GearPool) {
        super(name, schedule, origin, transmute, description, special, ItemType.Armor);
        this.armorClass = armorClass;
        this.damageReduction = damageReduction;
        this.moveAimPenalty = moveAimPenalty;
        this.maxDodgeBonus = maxDodgeBonus;
        this.dirtyGearPool = dirtyGearPool;
    }
}

export class Accessory extends Item {
    constructor(name: string, schedule: number, origin: OriginType[], transmute: string, description: string, special: string) {
        super(name, schedule, origin, transmute, description, special, ItemType.Accessory);
    }
}

export class Recovery extends Item {
    readonly recoveryType: RecoveryType;

    constructor(name: string, schedule: number, origin: OriginType[], transmute: string, description: string, special: string,
    recoveryType: RecoveryType) {
        super(name, schedule, origin, transmute, description, special, ItemType.Recovery);
        this.recoveryType = recoveryType;
    }
}

export class SkillCard extends Item {
    readonly skillName: string;
    readonly cardType: SkillCardType;

    constructor(skillName: string, schedule: number, origin: OriginType[], transmute: string, description: string, special: string,
        cardType: SkillCardType) {
        const name = `${skillName} ${SkillCardType[cardType]}`;
        super(name, schedule, origin, transmute, description, special, ItemType.SkillCard);
        this.skillName = skillName;
        this.cardType = cardType;
    }
}

export class Loot extends Item {
    readonly arcanaSource: Arcana[];

    constructor(name: string, schedule: number, origin: OriginType[], transmute: string, description: string, special: string,
        arcanaSource: Arcana[]) {
        super(name, schedule, origin, transmute, description, special, ItemType.Loot);
        this.arcanaSource = arcanaSource;
    }
}

export class Drop {
    readonly item: Item;
    readonly low: number;
    readonly high: number;
    readonly name: string;
    rollWinDisplay: string;
    constructor(item: Item, low: number, high: number) {
        this.item = item;
        this.name = item.name;
        this.low = low;
        this.high = high;
    }
}
