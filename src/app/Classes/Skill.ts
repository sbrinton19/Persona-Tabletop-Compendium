import { skillCardList } from '../Data/ItemData';
import { SkillCard, OriginType, SkillCardType, ItemReference } from './Item';
import { Arcana } from './Arcana';
import { DamageMultiplier, getDamageMultiplierString } from './DamageMultiplier';
import { PersonaReference } from './PersonaReference';

export interface UnflattenSkill {
    personaSources: PersonaReference[];
}

interface OldUnflatten {
    personaSources: PersonaReference[];
    allySkillCard: SkillCard;
    mainSkillCard: SkillCard;
}

export enum Element {
    Physical = 0,
    Gun,
    Fire,
    Ice,
    Elec,
    Wind,
    Psy,
    Nuke,
    Bless,
    Curse,
    Almighty,
    Healing,
    Support,
    Ailment,
    Passive,
    Magic,
    AllDamage
}

function getElementString(element: Element): string {
    switch (element) {
        case Element.Ailment:
        case Element.Almighty:
        case Element.Bless:
        case Element.Curse:
        case Element.Fire:
        case Element.Gun:
        case Element.Healing:
        case Element.Ice:
        case Element.Magic:
        case Element.Passive:
        case Element.Physical:
        case Element.Support:
        case Element.Wind:
            return Element[element];
        case Element.Elec:
            return 'Electric';
        case Element.Nuke:
            return 'Nuclear';
        case Element.Psy:
            return 'Psychic';
        case Element.AllDamage:
            return 'any damage';
    }
}

export enum KillFV {
    Low = 18,
    Med = 15,
    High = 12,
}

export enum AilmentType {
    Sleep = 0,
    Forget,
    Dizzy,
    Hunger,
    Physical,
    Confuse,
    Brainwash,
    Rage,
    Fear,
    Despair,
    Mental,
    Burn,
    Freeze,
    Shock,
    Elemental,
    All,
    Instakill
}

function getAilmentString(ailmentType: AilmentType): string {
    switch (ailmentType) {
        case AilmentType.Physical:
            return "Dizzy, Forget, Sleep, & Hunger";
        case AilmentType.Mental:
            return "Confuse, Fear, Rage, Despair, & Brainwash";
        case AilmentType.Elemental:
            return "Burn, Freeze, & Shock";
        case AilmentType.All:
            return "any non-special ailment";
    }
    return AilmentType[ailmentType];
}

export enum AilmentFV {
    Rare = 18,
    Low = 16,
    Med = 14,
    High = 12,
    Best = 7
}

export enum SupportType {
    Lower,
    Increase,
    Wall,
    Break,
    SpecialBuff
}

export enum BuffType {
    Attack = 0,
    Defense,
    Agility,
    TripleStat,
    CritMod,
    CritBonus,
    Crit
}

function getBuffString(buffType: BuffType): string {
    switch (buffType) {
        case BuffType.Attack:
            return "Damage";
        case BuffType.Defense:
            return "Damage Reduction";
        case BuffType.Agility:
            return "AGI Bonus";
        case BuffType.TripleStat:
            return "Damage, Damage Reduction, & AGI Bonus";
        case BuffType.CritMod:
            return "Crit Mod";
        case BuffType.CritBonus:
            return "Crit Bonus";
        case BuffType.Crit:
            return "Crit Mod & Bonus";
    }
}

export enum BoostType {
    Boost = 25,
    Amp = 50,
    Ailment = 2,
    Special = 0
}

export enum ReductionType {
    Special = 0,
    ResistElement = 1,
    ResistAilment,
    NullElement,
    NullAilment,
    Repel,
    Absorb
}

export enum DodgeBonus {
    Dodge = 16,
    Evade = 12,
    HighEvade = 10,
    Speical = 0
}

export enum RecoveryType {
    HP = 1,
    SP = 2,
    HPSP = 3,
    Ailment = 4
}

function getRecoveryString(recoveryType: RecoveryType): string {
    switch (recoveryType) {
        case RecoveryType.HP:
            return "% max health";
        case RecoveryType.SP:
            return "SP";
        case RecoveryType.HPSP:
            return "";
        case RecoveryType.Ailment:
            return "Ailments last";
    }
}

export enum MasterType {
    Tarukaja = 2,
    Rakukaja = 4,
    Sukukaja = 6,
    HP = 1,
    SP = 3,
}

export enum MasteryLevel {
    Master = 1,
    God = 2
}

export enum PassiveType {
    Boost = 0,
    Reduction,
    Dodge,
    Counter,
    Recover,
    Master,
    Kill,
    Post,
    Growth,
    Chain,
    Irregular
}

export class FlatSkill {
    private static idSource = 0;
    readonly id: number;
    readonly name: string;
    readonly cost: number;
    readonly element: Element;
    readonly minLevel: number;
    readonly aoe: number;
    description: string;
    allyCardId: number;
    mainCardId: number;

    constructor(id: number, name: string, cost: number, element: Element, description: string, allyCardId: number, mainCardId: number, aoe = -1, minLevel = 0, createSkillCards = true) {
        if (id !== -1) {
            this.id = id;
        } else {
            this.id = FlatSkill.idSource++;
        }
        this.name = name;
        this.cost = cost;
        this.element = element;
        this.minLevel = minLevel;
        this.description = description;
        this.allyCardId = allyCardId;
        this.mainCardId = mainCardId;
        this.aoe = aoe;
        if (createSkillCards) {
            this.createSkillCards();
        }
    }

    getAllyCardName(): String {
        return `${this.name} Ally`;
    }

    geMainCardName(): String {
        return `${this.name} Main`;
    }

    getDescription(): string {
        return this.description;
    }

    createSkillCards(): void {
        let allySkillCard = new SkillCard(this.name, 1, [OriginType.Drop, OriginType.Negotiate, OriginType.Transmute], `A skill card for ${this.name}`,
            `Grants 1 ${SkillCardType[SkillCardType.Ally]} Persona the ${this.name} skill`, SkillCardType.Ally);
        this.allyCardId = allySkillCard.id;
        let mainSkillCard = new SkillCard(this.name, 1, [OriginType.Drop, OriginType.Negotiate, OriginType.Transmute], `A skill card for ${this.name}`,
            `Grants 1 ${SkillCardType[SkillCardType.Main]} Persona the ${this.name} skill`, SkillCardType.Main);
        this.mainCardId = mainSkillCard.id;
        skillCardList.push(allySkillCard);
        skillCardList.push(mainSkillCard);
    }

    getSkillElement(): string {
        return getElementString(this.element);
    }

    formatCost(): string {
        if (this.element === Element.Physical || this.element === Element.Gun) {
            return `${this.cost}% HP`;
        } else if (this.element === Element.Passive) {
            return `-`;
        } else {
            return `${this.cost} SP`;
        }
    }

    getAoE(): string {
        if (this.aoe === -1) {
            return '-';
        }
        if (this.aoe === 0) {
            return 'Self';
        }
        return `AoE=${this.aoe}`;
    }

    isEqual(other: FlatSkill): boolean {
        return (this.id === other.id && this.name === other.name && this.cost === other.cost && this.element === other.element &&
            this.minLevel === other.minLevel && this.aoe === other.aoe && this.description === other.description &&
            this.allyCardId === other.allyCardId && this.mainCardId === other.mainCardId);
    }
}

export class FullSkill {
    skill: FlatSkill;
    personaSources: PersonaReference[] = [];
    skillClass: string;

    constructor(skill: FlatSkill, personaSources: PersonaReference[], skillClass: string) {
        this.skill = skill;
        this.personaSources = personaSources;
        this.skillClass = skillClass;
    }

    static copyConstructor(source: FullSkill): FullSkill {
        let realSkill: FlatSkill;
        switch(source.skillClass) {
          case 'FlatDamageSkill':
            realSkill = FlatDamageSkill.copyConstructor(<FlatDamageSkill> source.skill);
            break;
          case 'FlatDamageAilmentSkill':
            realSkill = FlatDamageAilmentSkill.copyConstructor(<FlatDamageAilmentSkill> source.skill);
            break;
          case 'FlatSupportSkill':
            realSkill = FlatSupportSkill.copyConstructor(<FlatSupportSkill> source.skill);
            break;
          case 'FlatAilmentSkill':
            realSkill = FlatAilmentSkill.copyConstructor(<FlatAilmentSkill> source.skill);
            break;
          case 'FlatPassiveSkill':
            realSkill = FlatPassiveSkill.copyConstructor(<FlatPassiveSkill> source.skill);
            break;
        }
        let sourceArray: PersonaReference[] = [];
        source.personaSources.forEach(personaSource => sourceArray.push(PersonaReference.copyConstructor(personaSource)));
        return new FullSkill(realSkill, sourceArray, source.skillClass);
    }

    isEqual(other: FullSkill): boolean {
        return this.skill.isEqual(other.skill);
    }

    formatCost(): string {
        if (this.skill.element === Element.Physical || this.skill.element === Element.Gun) {
            return `${this.skill.cost}% HP`;
        } else if (this.skill.element === Element.Passive) {
            return `-`;
        } else {
            return `${this.skill.cost} SP`;
        }
    }

    getSkillElement(): string {
        return getElementString(this.skill.element);
    }

    getAllyCardName(): String {
        return `${this.skill.name} Ally`;
    }

    geMainCardName(): String {
        return `${this.skill.name} Main`;
    }

    getDescription(): string {
        return this.skill.description;
    }
}

export class FlatDamageSkill extends FlatSkill {
    readonly maxDamageDice: number;
    readonly multiplier: DamageMultiplier;
    readonly damageBonus: number;
    readonly damageDie: number;

    constructor(id: number, name: string, cost: number, element: Element, description: string, allyCardId: number, mainCardId: number, 
        aoe: number, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number, damageDie: number, damageBonus: number, createSkillCards = false) {
            super(id, name, cost, element, description, allyCardId, mainCardId, aoe, minLevel, createSkillCards);
            this.maxDamageDice = maxDamageDice;
            this.multiplier = damageMultiplier;
            this.damageBonus = damageBonus;
            this.damageDie = damageDie;
    }

    static copyConstructor(source: FlatDamageSkill): FlatDamageSkill {
        return new FlatDamageSkill(source.id, source.name, source.cost, source.element, source.description, source.allyCardId, source.mainCardId,
            source.aoe, source.minLevel, source.multiplier, source.maxDamageDice, source.damageDie, source.damageBonus, false);
    }

    isEqual(other: FlatDamageSkill): boolean {
        if(super.isEqual(other)){
            return (this.maxDamageDice === other.maxDamageDice && this.multiplier === other.multiplier && this.damageBonus === other.damageBonus &&
                this.damageDie === other.damageDie);
        }
        return false;
    }

    getDamageMultiplierString(): string {
        return getDamageMultiplierString(this.multiplier);
    }
}

export class FlatDamageAilmentSkill extends FlatDamageSkill {
    ailmentType: AilmentType;
    ailmentFailValue: number;

    constructor(id: number, name: string, cost: number, element: Element, description: string, allyCardId: number, mainCardId: number, aoe: number, minLevel: number,
        damageMultiplier: DamageMultiplier, maxDamageDice: number, damageDie: number, damageBonus: number, ailmentType: AilmentType, ailmentFailValue: number) {
            super(id, name, cost, element, description, allyCardId, mainCardId, aoe, minLevel, damageMultiplier, maxDamageDice, damageDie, damageBonus);
            this.ailmentType = ailmentType;
            this.ailmentFailValue = ailmentFailValue;
    }

    static copyConstructor(source: FlatDamageAilmentSkill): FlatDamageAilmentSkill {
        return new FlatDamageAilmentSkill(source.id, source.name, source.cost, source.element, source.description, source.allyCardId, source.mainCardId,
            source.aoe, source.minLevel, source.multiplier, source.maxDamageDice, source.damageDie, source.damageBonus, source.ailmentType,
            source.ailmentFailValue);
    }

    isEqual(other: FlatDamageAilmentSkill): boolean {
        if(super.isEqual(other)) {
            return (this.ailmentType === other.ailmentType && this.ailmentFailValue === other.ailmentFailValue);
        }
        return false;
    }
}

export class FlatSupportSkill extends FlatSkill {
    supportType: SupportType;
    supportValue: number;

    constructor(id: number, name: string, cost: number, element: Element, description: string, allyCardId: number, mainCardId: number, aoe: number, minLevel: number, supportType: SupportType, supportValue: number) {
        super(id, name, cost, element, description, allyCardId, mainCardId, aoe, minLevel, false);
        this.supportType = supportType;
        this.supportValue =supportValue;
    }

    static copyConstructor(source: FlatSupportSkill): FlatSupportSkill {
        return new FlatSupportSkill(source.id, source.name, source.cost, source.element, source.description, source.allyCardId, source.mainCardId,
            source.aoe, source.minLevel, source.supportType, source.supportValue);
    }

    isEqual(other: FlatSupportSkill): boolean {
        if (super.isEqual(other)) {
            return (this.supportType === other.supportType && this.supportValue === other.supportValue);
        }
        return false;
    }
}

export class FlatAilmentSkill extends FlatSkill {
    ailmentType: AilmentType;
    ailmentFailValue: number;

    constructor(id: number, name: string, cost: number, element: Element, description: string, allyCardId: number, mainCardId: number, aoe: number, minLevel: number, ailmentType: AilmentType, ailmentFailValue: number) {
        super(id, name, cost, element, description, allyCardId, mainCardId, aoe, minLevel, false);
        this.ailmentType = ailmentType;
        this.ailmentFailValue = ailmentFailValue;
    }

    static copyConstructor(source: FlatAilmentSkill): FlatAilmentSkill {
        return new FlatAilmentSkill(source.id, source.name, source.cost, source.element, source.description, source.allyCardId, source.mainCardId,
            source.aoe, source.minLevel, source.ailmentType, source.ailmentFailValue);
    }
}

export class FlatPassiveSkill extends FlatSkill {
    passiveType: PassiveType;
    type: number;
    value: number;
    secondValue: number;

    constructor(id: number, name: string, cost: number, element: Element, description: string, allyCardId: number, mainCardId: number, aoe: number, minLevel: number, passiveType: PassiveType, type: number, value: number, secondValue: number) {
        super(id, name, cost, element, description, allyCardId, mainCardId, aoe, minLevel, false);
        this.passiveType = passiveType;
        this.type = type;
        this.value = value;
        this.secondValue = secondValue;
    }

    static copyConstructor(source: FlatPassiveSkill): FlatPassiveSkill {
        return new FlatPassiveSkill(source.id, source.name, source.cost, source.element, source.description, source.allyCardId, source.mainCardId,
            source.aoe, source.minLevel, source.passiveType, source.type, source.value, source.secondValue);
    }
}

abstract class HPSkill extends FlatDamageSkill {
    constructor(name: string, cost: number, element: Element, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageDie: number, damageBonus: number, aoe: number, description: string, createSkillCards: boolean) {
        super(-1, name, cost, element, description, -1, -1, aoe, minLevel, damageMultiplier, maxDamageDice, damageDie, damageBonus, createSkillCards);
    }

    formatCost(): string {
        return `${this.cost}% HP`;
    }
}

abstract class CombatMagic extends FlatDamageSkill {
    constructor(name: string, cost: number, element: Element, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageDie: number, damageBonus: number, aoe: number, description: string, createSkillCards: boolean) {
        super(-1, name, cost, element, description, -1, -1, aoe, minLevel, damageMultiplier, maxDamageDice, damageDie, damageBonus, createSkillCards);
    }

    formatCost(): string {
        return `${this.cost} SP`;
    }
}

export class PhysSkill extends HPSkill implements UnflattenSkill {
    personaSources: PersonaReference[] = [];

    constructor(name: string, cost: number, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageBonus: number, aoe = -1, description = '', damageDie = 6, createSkillCards = true) {
        super(name, cost, Element.Physical, minLevel, damageMultiplier, maxDamageDice,
            damageDie, damageBonus, aoe, description, createSkillCards);
    }

    getDamageCalculation(): string {
        if (this.multiplier === DamageMultiplier.Medium) {
            return `Deals (STR Bonus)d${this.damageDie} + PAB + ${this.damageBonus}; Max ${this.maxDamageDice}d${this.damageDie}; `;
        }
        return `Deals ${this.multiplier}*((STR Bonus)d${this.damageDie} + PAB + ${this.damageBonus}); Max ${this.maxDamageDice}d${this.damageDie}; `;
    }
}

export class PhysAilmentSkill extends PhysSkill implements UnflattenSkill {
    readonly ailmentType: AilmentType;
    readonly ailmentFailValue: number;

    constructor(name: string, cost: number, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageBonus: number, ailmentType: AilmentType, ailmentFV: number, aoe = -1, description = '', damageDie = 6, createSkillCards = true) {
        super(name, cost, minLevel, damageMultiplier, maxDamageDice, damageBonus, aoe, description, damageDie, createSkillCards);
        this.ailmentType = ailmentType;
        this.ailmentFailValue = ailmentFV;
    }

    getAilment(): string {
        return getAilmentString(this.ailmentType) + ` FV=${this.ailmentFailValue}; `;
    }

    getDescription(): string {
            let desc = this.getDamageCalculation() + this.getAilment() + this.getAoE() + this.description;
            desc = desc.trim();
            if (desc.endsWith(';')) {
                desc = desc.substr(0, desc.length - 1);
            }
            return desc
    }
}

export class GunSkill extends HPSkill implements UnflattenSkill{
    personaSources: PersonaReference[];
    constructor(name: string, cost: number, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageDie: number, damageBonus: number, description = '', aoe = -1, createSkillCards = true) {
            super(name, cost, Element.Gun, minLevel, damageMultiplier, maxDamageDice, damageDie, damageBonus, aoe, description, createSkillCards);
    }

    getDamageCalculation(): string {
        if (this.multiplier === DamageMultiplier.None) {
            return '';
        }
         if (this.multiplier === DamageMultiplier.Medium) {
            return `Deals ${this.maxDamageDice}d${this.damageDie} + ${this.damageBonus}; `;
        }
        return `Deals ${this.multiplier}*(${this.maxDamageDice}d${this.damageDie} + ${this.damageBonus}); `;
    }
}

/**
 * ElementalMagic is the class for all elemental magic attacks,
 * that use the traditional damage calculation
 */
export class ElementalMagic extends CombatMagic implements UnflattenSkill {
    personaSources: PersonaReference[];
    ailmentType: AilmentType;
    ailmentFailValue: number;
    constructor(name: string, cost: number, element: Element, minLevel: number, damageMultiplier: DamageMultiplier, aoe = -1, createSkillCards = true) {
        super(name, cost, element, minLevel, damageMultiplier, 20, 6, 10, aoe, '', createSkillCards);
        if (this.element === Element.Fire) {
            this.ailmentType = AilmentType.Burn;
            this.ailmentFailValue  = AilmentFV.Rare;
        } else if (this.element === Element.Ice) {
            this.ailmentType = AilmentType.Freeze;
            this.ailmentFailValue  = AilmentFV.Rare;
        } else if (this.element === Element.Elec) {
            this.ailmentType = AilmentType.Shock;
            this.ailmentFailValue  = AilmentFV.Rare;
        }
    }

    getDamageCalculation(): string {
        let retVal = 'Deals ';
        let ailmentRider = '';
        if (this.element === Element.Fire) {
            ailmentRider = `Burn FV=${AilmentFV.Rare}; `;
        } else if (this.element === Element.Ice) {
            ailmentRider = `Freeze FV=${AilmentFV.Rare}; `;
        } else if (this.element === Element.Elec) {
            ailmentRider = `Shock FV=${AilmentFV.Rare}; `;
        }
        if (this.multiplier === DamageMultiplier.Medium) {
            retVal += `(MAG Bonus)d${this.damageDie} + ${this.damageBonus} + (MAG Bonus)`;
        } else {
            retVal += `${this.multiplier}*((MAG Bonus)d${this.damageDie} + ${this.damageBonus} + (MAG Bonus))`;
        }
        retVal += `; Max ${this.maxDamageDice}d${this.damageDie}; ` + ailmentRider;
        return retVal;
    }

}

/**
 * DivineMagic is the class for Bless, Curse, and Almighty
 * magic attacks, using the modified damage formula
 */
abstract class DivineMagic extends CombatMagic {
    constructor(name: string, cost: number, element: Element, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageDie: number, damageBonus: number, aoe: number, description: string, createSkillCards: boolean) {
        super(name, cost, element, minLevel, damageMultiplier, maxDamageDice, damageDie, damageBonus, aoe, description, createSkillCards);
    }
}

export class DivineDamageMagic extends DivineMagic implements UnflattenSkill {
    personaSources: PersonaReference[];
    constructor(name: string, cost: number, element: Element, minLevel: number, damageMultiplier: DamageMultiplier, aoe = -1,  createSkillCards = true) {
        super(name, cost, element, minLevel, damageMultiplier, 20, 6, 0, aoe, '', createSkillCards);
    }

    getDamageCalculation(): string {
        let retVal = 'Deals ';
        if (this.multiplier === DamageMultiplier.Medium) {
            retVal += `(MAG Bonus)d${this.damageDie} + 2*(MAG Bonus)`;
        } else {
            retVal += `${this.multiplier}*((MAG Bonus)d${this.damageDie} + 2*(MAG Bonus))`;
        }
        retVal += `; Max ${this.maxDamageDice}d${this.damageDie}; `;
        return retVal;
    }

}

export class DivineKillMagic extends DivineMagic implements UnflattenSkill {
    personaSources: PersonaReference[];
    ailment = AilmentType.Instakill;
    ailmentFailValue: number;
    constructor(name: string, cost: number, element: Element, minLevel: number, killFV: number, aoe = -1,  createSkillCards = true) {
        super(name, cost, element, minLevel, DamageMultiplier.None, 0, 0, 0, aoe, '', createSkillCards);
        this.ailmentFailValue  = killFV;
    }

    getDamageCalculation(): string {
        // These spells do no damage so this just returns the kill values
        return `Instakill FV=${this.ailmentFailValue }; `;
    }

}

export class DivineSpecialMagic extends DivineMagic implements UnflattenSkill {
    personaSources: PersonaReference[];
    constructor(name: string, cost: number, element: Element, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageDie: number, aoe = -1, description = '', createSkillCards = true) {
        super(name, cost, element, minLevel, damageMultiplier, maxDamageDice, damageDie, 0, aoe, description, createSkillCards);
    }

    getDamageCalculation(): string {
        // These spells are irregular some will use a standard-ish equations the rest are just descriptions
        if (this.multiplier === DamageMultiplier.None) {
            return '';
        } else {
            return `Deals ${-1*this.maxDamageDice}d${-1*this.damageDie}; `;
        }
    }

}

export class HealingMagic extends CombatMagic implements UnflattenSkill {
    personaSources: PersonaReference[];
    constructor(name: string, cost: number, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number, damageDie: number,
        damageBonus: number, aoe = -1, description = '', createSkillCards = true) {
        super(name, cost, Element.Healing, minLevel, damageMultiplier, maxDamageDice, damageDie, damageBonus, aoe, description, createSkillCards);
    }

    getDamageCalculation(): string {
        if (this.multiplier === DamageMultiplier.None) {
            return '';
        }
        let retVal = 'Heals ';
        if (this.multiplier === DamageMultiplier.Light) {
            retVal += `(MAG Bonus)d${this.damageDie} + 2*(MAG Bonus) + ${this.damageBonus}`;
        } else {
            retVal += `${2 * this.multiplier}*((MAG Bonus)d${this.damageDie} + 2*(MAG Bonus) + ${this.damageBonus})`;
        }
        retVal += `; Max ${this.maxDamageDice}d${this.damageDie}; `;
        return retVal;
    }
}

abstract class SupportMagic extends FlatSkill {
    supportType: SupportType;
    constructor(name: string, cost: number, minLevel: number, supportType: SupportType, aoe: number, description: string, createSkillCards: boolean) {
        super(-1, name, cost, Element.Support, description, -1, -1, aoe, minLevel, createSkillCards);
        this.supportType = supportType;
    }

    abstract getSupportDescription(): string;

    getDescription(): string {
            let desc = this.getSupportDescription() + this.description + (this.description.length > 0 ? "; " : "") + this.getAoE();
            desc = desc.trim();
            if (desc.endsWith(';')) {
                desc = desc.substr(0, desc.length - 1);
            }
            return desc;
    }
}

export class BuffMagic extends SupportMagic implements UnflattenSkill {
    personaSources: PersonaReference[];
    supportValue: BuffType;
    constructor(name: string, cost: number, minLevel: number, supportType: SupportType, buffStat: BuffType,
        aoe = -1, description = '', createSkillCards = true) {
            super(name, cost, minLevel, supportType, aoe, description, createSkillCards);
            this.supportValue = buffStat;
    }

    getSupportDescription(): string {
        if (this.supportType !== SupportType.SpecialBuff) {
            return `${SupportType[this.supportType]} ${getBuffString(this.supportValue)} by 1/3 for 3 turns; `;
        }
        return '';
    }
}

export class WallMagic extends SupportMagic implements  UnflattenSkill {
    personaSources: PersonaReference[];
    supportValue: Element;
    constructor(name: string, cost: number, minLevel: number, wallElement: Element, aoe = -1, description = '', createSkillCards = true) {
        super(name, cost, minLevel, SupportType.Wall, aoe, description, createSkillCards);
        this.supportValue = wallElement;
    }

    getSupportDescription(): string {
        if (this.supportValue === Element.Support) {
            // This wall is in some way weird or special just use the description
            return '';
        }
        return `Immunity to ${getElementString(this.supportValue)} for 3 turns; `;
    }
}

export class BreakMagic extends SupportMagic implements UnflattenSkill {
    personaSources: PersonaReference[];
    supportValue: Element;
    constructor(name: string, cost: number, minLevel: number, breakElement: Element, aoe = -1, description = '', createSkillCards = true) {
        super(name, cost, minLevel, SupportType.Break, aoe, description, createSkillCards);
        this.supportValue = breakElement;
    }

    getSupportDescription(): string {
        if (this.supportValue === Element.Support) {
            // This break is in some way weird or special just use the description
            return '';
        }
        return `Removes all ${getElementString(this.supportValue)} resistances, except ${getElementString(this.supportValue)} Wall, for 3 turns; `;
    }
}

export class AilmentMagic extends FlatSkill {
    ailmentType: AilmentType;
    ailmentFailValue: number;
    constructor(name: string, cost: number, minLevel: number, ailmentType: AilmentType, ailmentFV: number,
        aoe = -1, description = '', createSkillCards = true) {
            super(-1, name, cost, Element.Ailment, description, -1, -1, aoe, minLevel, createSkillCards);
            this.ailmentType = ailmentType;
            this.ailmentFailValue = ailmentFV;
    }

    getAilmentDescription(): string {
        return `${getAilmentString(this.ailmentType)} FV=${this.ailmentFailValue}; `;
    }

     getDescription(): string {
            let desc = this.getAilmentDescription() + this.description + (this.description.length > 0 ? "; " : "") + this.getAoE();
            desc = desc.trim();
            if (desc.endsWith(';')) {
                desc = desc.substr(0, desc.length - 1);
            }
            return desc;
    }
}


abstract class PassiveSkill extends FlatSkill implements UnflattenSkill {
    personaSources: PersonaReference[];
    passiveType: PassiveType;
    constructor(name: string, cost: number, minLevel: number, description: string, createSkillCards: boolean) {
        super(-1, name, cost, Element.Passive, description, -1, -1, -1, minLevel, createSkillCards);
    }

    abstract passiveDescription(): string;

    getDescription(): string {
            let desc = this.passiveDescription() + this.description;
            desc = desc.trim();
            if (desc.endsWith(';')) {
                desc = desc.substr(0, desc.length - 1);
            }
            return desc;
    }
}

export class BoostSkill extends PassiveSkill {
    passiveType = PassiveType.Boost;
    value: Element | AilmentType;
    type: BoostType;
    constructor(name: string, boostElement: Element | AilmentType, minLevel: number, boostType: BoostType, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.value = boostElement;
        this.type = boostType;
    }

    passiveDescription(): string {
        if (this.type === BoostType.Boost || this.type === BoostType.Amp) {
            return `+${this.type}% to all ${getElementString(<Element>this.value)} damage; `;
        } else if (this.type === BoostType.Ailment) {
            return `Reduce FV for attacks that inflict ${getAilmentString(<AilmentType>this.value)} by ${this.type}; `;
        } else {
            return '';
        }
    }
}

export class ReductionSkill extends PassiveSkill {
    passiveType = PassiveType.Reduction;
    value: Element | AilmentType;
    type: ReductionType;
    constructor(name: string, reductionElement: Element | AilmentType, minLevel: number, reductionType: ReductionType,
        description = '', createSkillCards = true) {
            super(name, 0, minLevel, description, createSkillCards);
            this.value = reductionElement;
            this.type = reductionType;
    }

    passiveDescription(): string {
        if (this.type === ReductionType.ResistElement) {
            return `Halve all ${getElementString(<Element>this.value)}; `;
        } else if (this.type === ReductionType.ResistAilment) {
            return `When you would be afflicted with ${getAilmentString(<AilmentType>this.value)}, roll a d20 on an 11+ it misses instead; `;
        } else if (this.type === ReductionType.NullElement) {
            return `Nullify all ${getElementString(<Element>this.value)} attacks; `;
        } else if (this.type === ReductionType.NullAilment) {
            return `Nullify ${getAilmentString(<AilmentType>this.value)}; `;
        } else {
            const cbRider = this.value === Element.Bless || this.value === Element.Curse ? 'Instakill attacks are nullified; ' : '';
            if (this.type === ReductionType.Repel) {
                return `Reflect all ${getElementString(<Element>this.value)} damage back to attacker; ` + cbRider;
            } else if (this.type === ReductionType.Absorb) {
                return `All ${getElementString(<Element>this.value)} damage is treated as healing; ` + cbRider;
            } else {
                return '';
            }
        }
    }
}

export class DodgeSkill extends PassiveSkill {
    passiveType = PassiveType.Dodge;
    value: Element;
    type: DodgeBonus;
    constructor(name: string, dodgeElement: Element, minLevel: number, dodgeBonus: DodgeBonus, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.value = dodgeElement;
        this.type = dodgeBonus;
    }

    passiveDescription(): string {
        if (this.type !== DodgeBonus.Speical) {
            return `When targeted by ${getElementString(this.value)} attacks, roll d20, on a ${this.type} or higher you dodge the attack`;
        } else {
            return '';
        }
    }
}

export class CounterSkill extends PassiveSkill {
    passiveType = PassiveType.Counter;
    type: number = 1;
    value: number;
    constructor(name: string, minLevel: number, repelRoll: number, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.value = repelRoll;
    }

    passiveDescription(): string {
        return `Every time you are hit with a Physical or Gun attack, roll d20, on a ${this.value}-20 repel the attack`;
    }
}

export class RecoverySkill extends PassiveSkill {
    type: RecoveryType;
    value: number;
    secondValue: number = -1;
    constructor(name: string, minLevel: number, recoveryType: RecoveryType, recoveryValues: number[], description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.type = recoveryType;
        this.value = recoveryValues[0];
        this.passiveType = PassiveType.Recover;
        if(recoveryValues.length == 2)
            this.secondValue = recoveryValues[1];
    }

    passiveDescription(): string {
        if (this.type === RecoveryType.Ailment) {
            return `${getRecoveryString(this.type)} ${this.value} turns`;
        }
        let recString = '';
        if (this.type === RecoveryType.HPSP) {
            recString = `${this.value}${getRecoveryString(RecoveryType.HP)} & ${this.secondValue}${getRecoveryString(RecoveryType.SP)}`;
        } else {
            recString = `${this.value}${getRecoveryString(this.type)}`;
        }
        return `Heal ${recString} a turn`;
    }
}

export class MasterSkill extends PassiveSkill {
    passiveType = PassiveType.Master;
    type: MasterType;
    value: MasteryLevel;
    constructor(name: string, minLevel: number, masterType: MasterType, masteryLevel: MasteryLevel, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.type = masterType;
        this.value = masteryLevel;
    }

    passiveDescription(): string {
        if (this.type % 2 === 0) {
            return `Grants ${MasterType[this.type]} ${this.value === MasteryLevel.God ? 'to all allies ' : ''}at the outbreak of combat`;
        } else {
            return `Reduces skill ${MasterType[this.type]} cost by ${this.value === MasteryLevel.God ? 'half' : 'a quarter'}`;
        }
    }
}

export class KillSkill extends RecoverySkill {
    
    constructor(name: string, minLevel: number, recoveryType: RecoveryType, recoveryValues: number[], description = '', createSkillCards = true) {
        super(name, 0, recoveryType, recoveryValues, description, createSkillCards);
        this.passiveType = PassiveType.Kill;
    }

    passiveDescription(): string {
        let recString = '';
        if (this.type === RecoveryType.HPSP) {
            recString = `${this.value}${getRecoveryString(RecoveryType.HP)} & ${this.secondValue}${getRecoveryString(RecoveryType.SP)}`;
        } else {
            recString = `${this.value}${getRecoveryString(this.type)}`;
        }
        return `Heal ${recString} when you kill an enemy`;
    }
}

export class PostCombatSkill extends RecoverySkill {
    
    constructor(name: string, minLevel: number, recoveryType: RecoveryType, recoveryValues: number[], description = '', createSkillCards = true) {
        super(name, 0, recoveryType, recoveryValues, description, createSkillCards);
        this.passiveType = PassiveType.Post;
    }

    passiveDescription(): string {
        let recString = '';
        if (this.type === RecoveryType.HPSP) {
            if (this.value === -1) {
                recString = `Fully restore HP & SP`;
            } else {
                recString = `Gain ${this.value}${getRecoveryString(RecoveryType.HP)} & ${this.secondValue}${getRecoveryString(RecoveryType.SP)}`;
            }
        } else {
            recString = `Gain ${this.value}${getRecoveryString(this.type)}`;
        }
        return `${recString} after combat if you did not die`;
    }
}

export class GrowthSkill extends PassiveSkill {
    passiveType = PassiveType.Growth;
    type: number = 1;
    value: number;
    constructor(name: string, minLevel: number, growth: number, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.value = growth;
    }

    passiveDescription(): string {
        return `Allows ${this.value} active ally skill${this.value > 1 ? 's' : ''} at no cost`;
    }
}

export class ChainSkill extends MasterSkill {
    passiveType = PassiveType.Chain;
    constructor(name: string, minLevel: number, masterType: MasterType, masteryLevel: MasteryLevel, description = '', createSkillCards = true) {
        super(name, minLevel, masterType, masteryLevel, description, createSkillCards);
    }

    passiveDescription(): string {
        if (this.type % 2 === 0) {
            return `Grants ${MasterType[this.type]} ${this.value === MasteryLevel.God ? 'to all allies ' : ''}after a baton pass`;
        } else {
            return `Restores ${this.value === MasteryLevel.God ? '4' : '2'}% ${MasterType[this.type]} after a baton pass`;
        }
    }
}

export class IrregularPassive extends PassiveSkill {
    passiveType = PassiveType.Irregular;
    type: number;
    value: number;
    constructor(name: string, minLevel: number, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.type = 0;
        this.value = 0;
    }

    passiveDescription(): string {
        return '';
    }
}

export class OldPersonaSkill {
    readonly level: number;
    readonly skill: UnflattenSkill;
    constructor(skill: UnflattenSkill, level: number) {
        this.skill = skill;
        this.level = level;
    }
}

export class PersonaSkill {
    readonly personaid: number;
    readonly skillid: number;
    readonly level: number;
    constructor(personaid: number, skillid: number, level: number) {
        this.personaid = personaid;
        this.skillid = skillid;
        this.level = level;
    }
}

export class LeveledSkill extends FlatSkill{
    level: number;
    constructor(id: number, name: string, cost: number, element: Element, description: string, minLevel: number, level: number) {
        super(id, name, cost, element, description, -1, -1, -1, minLevel, false);
        this.level = level;
    }
}


export abstract class Skill extends FlatSkill implements OldUnflatten {
    personaSources: PersonaReference[] = [];
    allySkillCard: SkillCard;
    mainSkillCard: SkillCard;

    constructor(name: string, cost: number, element: Element, description: string, minLevel = 0, createSkillCards = true) {
        super(-1, name, cost, element, description, -1, -1, -1, minLevel, createSkillCards);
        this.allySkillCard = skillCardList.find(sc => sc.id === this.allyCardId);
        this.mainSkillCard = skillCardList.find(sc => sc.id === this.mainCardId);
    }
}