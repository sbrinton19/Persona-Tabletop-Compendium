import { Arcana } from "./Arcana";
import { Subject } from 'rxjs';
import { PersonaReference } from "./PersonaReference";

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
            return 'Sticky Gown';
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

interface Unflatten {
    personaSources: Set<PersonaRef>;
}

class PersonaRef {
    readonly personaId: number;
    readonly personaName: string;
    origins: number;
    constructor(id: number, name: string, origin: OriginType) {
        this.personaId = id;
        this.personaName = name;
        this.origins = origin;
    }
}

export function getOrigins(orig: number): OriginType[] {
    const origins: OriginType[] = [];
    for(let origin in OriginType) {
        if(Number(origin)) {
            if((orig & +origin) === +origin) {
                origins.push(+origin);
            }
        }
    }
    if(origins.length == 0) {
        origins.push(0);
    }
    return origins;
}

export class FlatItem {
    private static idSource = 0;
    static connection: Subject<any> = null;
    readonly id: number;
    readonly name: string;
    readonly schedule: number;
    readonly description: string;
    readonly special: string;
    readonly type: ItemType;
    readonly consumableType: ConsumableType;
    origins: number = 0;
    transmuteId: number;

    static getOriginName(origin: OriginType) {
        return OriginType[origin];
    }

    constructor(id: number, name: string, schedule: number, origin: OriginType[],
        description: string, special: string, type: ItemType, transmuteId: number = -1, consumableType = ConsumableType.None) {
        if (id !== -1) {
            this.id = id;
        }
        else {
            this.id = FlatItem.idSource++;
        }
        this.name = name;
        this.schedule = schedule;
        origin.forEach(origin => this.origins += origin);
        this.description = description;
        this.special = special;
        this.type = type;
        this.consumableType = consumableType;
        this.transmuteId = transmuteId;
    }

    getTypeName(): string {
        return ItemType[this.type];
    }

    getOrigins(): OriginType[] {
        const origins: OriginType[] = [];
        for(let origin in OriginType) {
            if(Number(origin)) {
                if((this.origins  & +origin) === +origin) {
                    origins.push(+origin);
                }
            }
        }
        if(origins.length == 0) {
            origins.push(0);
        }
        return origins;
    }

    getOriginName(origin: OriginType) {
        return Item.getOriginName(origin);
    }
}

export class FullItem extends FlatItem {
    personaSources: PersonaReference[];

    constructor(name: string, schedule: number, origin: OriginType[],
        description: string, special: string, type: ItemType, personaSources: PersonaReference[]) {
        super(-1, name, schedule, origin, description, special, type);
        this.personaSources = personaSources;
    } 
}

export class Item extends FlatItem implements Unflatten {
    personaSources: Set<PersonaRef> = new Set();

    constructor(name: string, schedule: number, origin: OriginType[],
        description: string, special: string, type: ItemType) {
        super(-1, name, schedule, origin, description, special, type);
    }

    addPersonaSource(id: number, name: string, origin: OriginType) {
        let has = false;
        this.personaSources.forEach(pRef => {
            if(pRef.personaId === id) {
                has = true;
                pRef.origins += origin;
                return;
            }
        });
        if(!has) {
            this.personaSources.add(new PersonaRef(id, name, origin));
        }
    }
}

export class FlatWeapon extends FlatItem {
    readonly baseDamage: number;
    readonly maxDamageDice: number;
    readonly damageDie: number;
    readonly lowRange: number;
    readonly highRange: number;
    readonly failValue: number;

    constructor(id: number, name: string, schedule: number, origin: OriginType[], description: string, special: string, transmuteId: number,
    baseDamage: number, maxDamageDice: number, damageDie: number, lowValue: number, highValue: number, failValue: number) {
        super(id, name, schedule, origin, description, special, ItemType.Weapon, transmuteId);
        this.baseDamage = baseDamage;
        this.maxDamageDice = maxDamageDice;
        this.damageDie = damageDie;
        this.lowRange = lowValue;
        this.highRange = highValue;
        this.failValue = failValue;
    }
}

export class Weapon extends FlatWeapon implements Unflatten {
    personaSources: Set<PersonaRef> = new Set<PersonaRef>();

    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string,
    baseDamage: number, maxDamageDice: number, damageDie: number, range: string, failValue: number) {
        super(-1, name, schedule, origin, description, special, -1, baseDamage, maxDamageDice, damageDie, +range.split('-')[0], +(range.split('-').length === 2 ? range.split('-')[1] : range.split('-')[0]), failValue);
    }

    addPersonaSource(id: number, name: string, origin: OriginType) {
        let has = false;
        this.personaSources.forEach(pRef => {
            if(pRef.personaId === id) {
                has = true;
                pRef.origins += origin;
            }
        });
        if(!has) {
            this.personaSources.add(new PersonaRef(id, name, origin));
        }
    }

}

export class FlatRangedWeapon extends FlatWeapon {
    readonly magSize: number;
    readonly magCount: number;
    constructor(id: number, name: string, schedule: number, origin: OriginType[], description: string, special: string, transmuteId: number,
    baseDamage: number, maxDamageDice: number, damageDie: number, lowValue: number, highValue: number, failValue: number,
    magSize: number, magCount: number) {
        super(id, name, schedule, origin, description, special, transmuteId, baseDamage, maxDamageDice, damageDie, lowValue, highValue, failValue);
        this.magSize = magSize;
        this.magCount = magCount;
    }
}

export class RangedWeapon extends FlatRangedWeapon implements Unflatten {
    personaSources: Set<PersonaRef> = new Set<PersonaRef>();

    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string,
    baseDamage: number, maxDamageDice: number, damageDie: number, range: string, failValue: number,
    magSize: number, magCount: number) {
        super(-1, name, schedule, origin, description, special, -1, baseDamage, maxDamageDice, damageDie, +range.split('-')[0], +(range.split('-').length === 2 ? range.split('-')[1] : range.split('-')[0]), failValue, magSize, magCount);
    }

    addPersonaSource(id: number, name: string, origin: OriginType) {
        let has = false;
        this.personaSources.forEach(pRef => {
            if(pRef.personaId === id) {
                has = true;
                pRef.origins += origin;
            }
        });
        if(!has) {
            this.personaSources.add(new PersonaRef(id, name, origin));
        }
    }
}

export class FlatArmor extends FlatItem {
    readonly armorClass: ArmorClass;
    readonly damageReduction: number;
    readonly moveAimPenalty: number;
    readonly maxDodgeBonus: number;
    readonly dirtyGearPool: GearPool;

    constructor(id: number, name: string, schedule: number, origin: OriginType[], description: string, special: string, transmuteId: number,
    armorClass: ArmorClass, damageReduction: number, moveAimPenalty: number, maxDodgeBonus: number, dirtyGearPool: GearPool) {
        super(id, name, schedule, origin, description, special, ItemType.Armor, transmuteId);
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

export class Armor extends FlatArmor implements Unflatten {
    personaSources: Set<PersonaRef> = new Set<PersonaRef>();

    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string,
        armorClass: ArmorClass, damageReduction: number, moveAimPenalty: number, maxDodgeBonus: number, dirtyGearPool: GearPool) {
            super(-1, name, schedule, origin, description, special, -1, armorClass, damageReduction, moveAimPenalty, maxDodgeBonus, dirtyGearPool);
    }

    addPersonaSource(id: number, name: string, origin: OriginType) {
        let has = false;
        this.personaSources.forEach(pRef => {
            if(pRef.personaId === id) {
                has = true;
                pRef.origins += origin;
            }
        });
        if(!has) {
            this.personaSources.add(new PersonaRef(id, name, origin));
        }
    }
}

export class FlatAccessory extends FlatItem {
    constructor(id: number, name: string, schedule: number, origin: OriginType[], description: string, special: string, transmuteId: number) {
        super(id, name, schedule, origin, description, special, ItemType.Accessory, transmuteId);
    }
}

export class Accessory extends FlatAccessory implements Unflatten {
    personaSources: Set<PersonaRef> = new Set<PersonaRef>();

    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string) {
        super(-1, name, schedule, origin, description, special, -1);
    }

    addPersonaSource(id: number, name: string, origin: OriginType) {
        let has = false;
        this.personaSources.forEach(pRef => {
            if(pRef.personaId === id) {
                has = true;
                pRef.origins += origin;
            }
        });
        if(!has) {
            this.personaSources.add(new PersonaRef(id, name, origin));
        }
    }
}

export class FlatConsumable extends FlatItem {
    constructor(id: number, name: string, schedule: number, origin: OriginType[], description: string, special: string,
    consumableType: ConsumableType, transmuteId: number) {
        super(id, name, schedule, origin, description, special, ItemType.Consumable, transmuteId, consumableType);
    }
}

export class Consumable extends FlatConsumable implements Unflatten {
    personaSources: Set<PersonaRef> = new Set<PersonaRef>();

    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string,
    consumableType: ConsumableType) {
        super(-1, name, schedule, origin, description, special, consumableType, -1);
    }

    addPersonaSource(id: number, name: string, origin: OriginType) {
        let has = false;
        this.personaSources.forEach(pRef => {
            if(pRef.personaId === id) {
                has = true;
                pRef.origins += origin;
            }
        });
        if(!has) {
            this.personaSources.add(new PersonaRef(id, name, origin));
        }
    }
}

export class FlatSkillCard extends FlatItem {

    constructor(id: number, skillName: string, schedule: number, origin: OriginType[], description: string, special: string,
        transmuteId: number, cardType: SkillCardType) {
        const name = `${skillName} ${SkillCardType[cardType]}`;
        super(id, name, schedule, origin, description, special, ItemType.SkillCard, transmuteId, ConsumableType.Both);
    }

    getSkillName(): string {
        let split: string[] = this.name.split(" ");
        let retVal = "";
        for(let i = 0; i < split.length - 1; i++) {
            retVal += split[i];
            retVal += " ";
        }
        return retVal.trim();
    }

    getSkillCardType(): SkillCardType {
        let split: string[] = this.name.split(" ");
        return <SkillCardType> SkillCardType[split[split.length-1]];
    }
}

export class SkillCard extends FlatSkillCard implements Unflatten {
    personaSources: Set<PersonaRef> = new Set<PersonaRef>();

    constructor(skillName: string, schedule: number, origin: OriginType[], description: string, special: string,
        cardType: SkillCardType) {
        super(-1, skillName, schedule, origin, description, special, -1, cardType);
    }

    addPersonaSource(id: number, name: string, origin: OriginType) {
        let has = false;
        this.personaSources.forEach(pRef => {
            if(pRef.personaId === id) {
                has = true;
                pRef.origins += origin;
            }
        });
        if(!has) {
            this.personaSources.add(new PersonaRef(id, name, origin));
        }
    }
}

export class FlatLoot extends FlatItem {
    readonly arcanaSources: Arcana[];

    constructor(id: number, name: string, schedule: number, origin: OriginType[], description: string, special: string, transmuteId: number,
        arcanaSources: Arcana[]) {
        super(id, name, schedule, origin, description, special, ItemType.Loot, transmuteId);
        this.arcanaSources = arcanaSources;
    }
}

export class Loot extends FlatLoot implements Unflatten {
    personaSources: Set<PersonaRef> = new Set<PersonaRef>();

    constructor(name: string, schedule: number, origin: OriginType[], description: string, special: string,
        arcanaSources: Arcana[]) {
        super(-1, name, schedule, origin, description, special, -1, arcanaSources);
    }

    addPersonaSource(id: number, name: string, origin: OriginType) {
        let has = false;
        this.personaSources.forEach(pRef => {
            if(pRef.personaId === id) {
                has = true;
                pRef.origins += origin;
            }
        });
        if(!has) {
            this.personaSources.add(new PersonaRef(id, name, origin));
        }
    }
}

export class Drop {
    readonly itemid: number;
    readonly personaid: number;
    readonly isDrop: boolean;
    readonly low: number;
    readonly high: number;
    constructor(itemid: number, personaid: number, low: number, high: number, isDrop: boolean) {
        this.itemid = itemid;
        this.personaid = personaid;
        this.low = low;
        this.high = high;
        this.isDrop = isDrop;
    }
}

export class ItemReference {
    readonly id: number;
    readonly name: String;
    constructor(id: number, name: String) {
        this.id = id;
        this.name = name;
    }

    public static copyConstructor(source: ItemReference): ItemReference {
        return new ItemReference(source.id, source.name);
    }
}

export class DropReference extends ItemReference{
    readonly low: number;
    readonly high: number;
    constructor(id: number, name: String, low: number, high: number) {
        super(id, name);
        this.low = low;
        this.high = high;
    }

    public static copyConstructor(source: DropReference): DropReference {
        return new DropReference(source.id, source.name, source.low, source.high);
    }

    getRollWinDisplay(): String {
        if (this.id !== 0) {
            if (this.low === this.high) {
                return `${this.high}`;
            } else {
                return `${this.low}-${this.high}`;
            }
        } else {
            return 'All';
        }
    }
}

export class OldDrop {
    readonly item: Item;
    readonly low: number;
    readonly high: number;
    rollWinDisplay: string;
    constructor(item: Item, low: number, high: number) {
        this.item = item;
        this.low = low;
        this.high = high;
    }

    checkDrop(roll: number): boolean {
        return this.low <= roll && roll <= this.high;
    }

    warning(): void {
        if (!(this.item.origins & OriginType.Drop) && this.item.name !== '-') {
            console.warn(`${this.item.name} is available as a drop, but does not have the drop OriginType`);
        }
    }
}

export class NegotiateDrop extends OldDrop {
    constructor(item: Item, low: number, high: number) {
        super(item, low, high);
    }

    warning(): void {
        if (!(this.item.origins & OriginType.Negotiate) && this.item.name !== '-') {
            console.warn(`${this.item.name} is available as a Negotiate, but does not have the negotiate OriginType`);
        }
    }
}