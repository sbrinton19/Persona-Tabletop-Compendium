import { skillCardList } from '../Data/ItemData';
import { SkillCard, OriginType, SkillCardType } from './Item';
import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser/src/dom/debug/ng_probe';

export enum Element {
    Physical = 'Physical',
    Gun = 'Gun',
    Fire = 'Fire',
    Ice = 'Ice',
    Elec = 'Electric',
    Wind = 'Wind',
    Psy = 'Psy',
    Nuke = 'Nuclear',
    Bless = 'Bless',
    Curse = 'Curse',
    Almighty = 'Almighty',
    Healing = 'Healing',
    Support = 'Support',
    Ailment = 'Ailment',
    Passive = 'Passive',
    Magic = 'Magic',
    AllDamage = 'any damage'
}

export enum DamageMultiplier {
    None = 0,
    Light = 0.5,
    Medium = 1,
    Heavy = 2,
    Severe = 3,
    Collosal = 4
}

export enum KillFV {
    Low = 18,
    Med = 15,
    High = 12,
}

export enum AilmentType {
    Sleep = 'Sleep',
    Forget = 'Forget',
    Dizzy = 'Dizzy',
    Hunger = 'Hunger',
    Physical = 'Dizzy, Forget, Sleep, & Hunger',
    Confuse = 'Confuse',
    Brainwash = 'Brainwash',
    Rage = 'Rage',
    Fear = 'Fear',
    Despair = 'Despair',
    Mental = 'Confuse, Fear, Rage, Despair, & Brainwash',
    Burn = 'Burn',
    Freeze = 'Freeze',
    Shock = 'Shock',
    Elemental = 'Burn, Freeze, & Shock',
    All = 'any non-special ailment',
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

export enum BuffStats {
    Attack = 'Damage',
    Defense = 'Damage Reduction',
    Agility = 'AGI Bonus',
    CritMod = 'Crit Mod',
    CritBonus = 'Crit Bonus',
    Crit = 'Crit Mod & Bonus',
    AllStat = 'Damage, Damage Reduction, & AGI Bonus'
}

export enum BoostType {
    Boost = 25,
    Amp = 50,
    Ailment = 2,
    Special
}

export enum ReductionType {
    ResistElement,
    ResistAilment,
    NullElement,
    NullAilment,
    Repel,
    Absorb,
    Special
}

export enum DodgeBonus {
    Dodge = 16,
    Evade = 12,
    HighEvade = 10,
    Speical
}

export enum RecoveryType {
    HP = '% max health',
    SP = 'SP',
    HPSP = '',
    Ailment = 'Ailments last'
}

export enum MasterType {
    Tarukaja = 2,
    Rakukaja = 4,
    Sukukaja = 6,
    HP = 1,
    SP = 3,
}

export enum MasteryLevel {
    Master,
    God
}

export abstract class Skill {
    private static idSource = 0;
    protected compiledDescription = false;
    readonly id: number;
    readonly name: string;
    readonly cost: number;
    readonly element: Element;
    readonly minLevel: number;
    protected description: string;
    personaSources: string[] = [];

    constructor(name: string, cost: number, element: Element, description: string, minLevel = 0, createSkillCards = true) {
        this.id = Skill.idSource++;
        this.name = name;
        this.cost = cost;
        this.element = element;
        this.minLevel = minLevel;
        if (description !== '') {
            description += '; ';
        }
        this.description = description;
        if (createSkillCards) {
            this.createSkillCards();
        }
    }

    getDescription(): string {
        return this.description;
    }

    createSkillCards(): void {
        skillCardList.push(
            new SkillCard(this.id, this.name, 1, [OriginType.Drop, OriginType.Transmute], `A skill card for ${this.name}`,
            `Grants 1 ${SkillCardType[SkillCardType.Ally]} Persona the ${this.name} skill`, SkillCardType.Ally));
        skillCardList.push(
            new SkillCard(this.id, this.name, 1, [OriginType.Drop, OriginType.Transmute], `A skill card for ${this.name}`,
            `Grants 1 ${SkillCardType[SkillCardType.Main]} Persona the ${this.name} skill`, SkillCardType.Main));
    }

    getSkillElement(): string {
        return this.element;
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
}

abstract class ActiveSkill extends Skill {
    protected readonly aoe: number;
    constructor(name: string, cost: number, element: Element, aoe: number,
        minLevel: number, description: string, createSkillCards: boolean) {
            super(name, cost, element, description, minLevel, createSkillCards);
            this.aoe = aoe;
    }
    getAoE(): string {
        if (this.aoe === -1) {
            return '';
        }
        if (this.aoe === 0) {
            return 'Self; ';
        }
        return `AoE=${this.aoe}; `;
    }
}

abstract class DamageSkill extends ActiveSkill {
    protected readonly maxDamageDice: number;
    protected readonly multiplier: DamageMultiplier;
    protected readonly damageBonus: number;
    protected readonly damageDie: number;

    constructor(name: string, cost: number, element: Element, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageDie: number, damageBonus: number, aoe: number, minLevel: number, description: string, createSkillCards: boolean) {
            super(name, cost, element, aoe, minLevel, description, createSkillCards);
            this.maxDamageDice = maxDamageDice;
            this.multiplier = damageMultiplier;
            this.damageBonus = damageBonus;
            this.damageDie = damageDie;
    }

    abstract getDamageCalculation(): string;

    getDescription(): string {
        if (!this.compiledDescription) {
            let desc = this.getDamageCalculation() + this.description + this.getAoE();
            desc = desc.trim();
            if (desc.endsWith(';')) {
                desc = desc.substr(0, desc.length - 1);
            }
            this.description = desc;
            this.compiledDescription = true;
        }
        return this.description;
    }
}

abstract class HPSkill extends DamageSkill {
    constructor(name: string, cost: number, element: Element, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageDie: number, damageBonus: number, aoe: number, description: string, createSkillCards: boolean) {
        super(name, cost, element, damageMultiplier, maxDamageDice, damageDie, damageBonus, aoe, minLevel, description, createSkillCards);
    }

    formatCost(): string {
        return `${this.cost}% HP`;
    }
}

abstract class CombatMagic extends DamageSkill {
    constructor(name: string, cost: number, element: Element, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageDie: number, damageBonus: number, aoe: number, description: string, createSkillCards: boolean) {
        super(name, cost, element, damageMultiplier, maxDamageDice, damageDie, damageBonus, aoe, minLevel, description, createSkillCards);
    }

    formatCost(): string {
        return `${this.cost} SP`;
    }
}

export class PhysSkill extends HPSkill {
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

export class PhysAilmentSkill extends PhysSkill {
    private readonly ailment: AilmentType;
    private readonly ailmentFV: number;

    constructor(name: string, cost: number, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageBonus: number, ailment: AilmentType, ailmentFV: number, aoe = -1, description = '', damageDie = 6, createSkillCards = true) {
        super(name, cost, minLevel, damageMultiplier, maxDamageDice, damageBonus, aoe, description, damageDie, createSkillCards);
        this.ailment = ailment;
        this.ailmentFV = ailmentFV;
    }

    getAilment(): string {
        return this.ailment + ` FV=${this.ailmentFV}; `;
    }

    getDescription(): string {
        if (!this.compiledDescription) {
            let desc = this.getDamageCalculation() + this.getAilment() + this.getAoE() + this.description;
            desc = desc.trim();
            if (desc.endsWith(';')) {
                this.description = desc.substr(0, desc.length - 1);
            } else {
                this.description = desc;
            }
            this.compiledDescription = true;
        }
        return this.description;
    }
}

export class GunSkill extends HPSkill {
    constructor(name: string, cost: number, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageDie: number, damageBonus: number, description = '', aoe = -1, createSkillCards = true) {
            super(name, cost, Element.Gun, minLevel, damageMultiplier, maxDamageDice, damageDie, damageBonus, aoe, description, createSkillCards);
    }

    getDamageCalculation(): string {
        if (this.damageDie === -1) {
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
export class ElementalMagic extends CombatMagic {
    constructor(name: string, cost: number, element: Element, minLevel: number, damageMultiplier: DamageMultiplier, aoe = -1, createSkillCards = true) {
        super(name, cost, element, minLevel, damageMultiplier, 20, 6, 10, aoe, '', createSkillCards);
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

export class DivineDamageMagic extends DivineMagic {
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

export class DivineKillMagic extends DivineMagic {
    private killFV: number;
    constructor(name: string, cost: number, element: Element, minLevel: number, killFV: number, aoe = -1,  createSkillCards = true) {
        super(name, cost, element, minLevel, DamageMultiplier.None, -1, -1, 0, aoe, '', createSkillCards);
        this.killFV = killFV;
    }

    getDamageCalculation(): string {
        // These spells do no damage so this just returns the kill values
        return `Instakill FV=${this.killFV}; `;
    }

}

export class DivineSpecialMagic extends DivineMagic {
    constructor(name: string, cost: number, element: Element, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number,
        damageDie: number, aoe = -1, description = '', createSkillCards = true) {
        super(name, cost, element, minLevel, damageMultiplier, maxDamageDice, damageDie, 0, aoe, description, createSkillCards);
    }

    getDamageCalculation(): string {
        // These spells are irregular some will use a standard-ish equations the rest are just descriptions
        if (this.maxDamageDice === -1) {
            return '';
        } else {
            return `Deals ${this.maxDamageDice}d${this.damageDie}; `;
        }
    }

}

export class HealingMagic extends CombatMagic {
    constructor(name: string, cost: number, minLevel: number, damageMultiplier: DamageMultiplier, maxDamageDice: number, damageDie: number,
        damageBonus: number, aoe = -1, description = '', createSkillCards = true) {
        super(name, cost, Element.Healing, minLevel, damageMultiplier, maxDamageDice, damageDie, damageBonus, aoe, description, createSkillCards);
    }

    getDamageCalculation(): string {
        if (this.damageDie === -1) {
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

abstract class SupportMagic extends ActiveSkill {
    protected supportType: SupportType;
    constructor(name: string, cost: number, minLevel: number, supportType: SupportType, aoe: number, description: string, createSkillCards: boolean) {
        super(name, cost, Element.Support, aoe, minLevel, description, createSkillCards);
        this.supportType = supportType;
    }

    abstract getSupportDescription(): string;

    getDescription(): string {
        if (!this.compiledDescription) {
            let desc = this.getSupportDescription() + this.description + this.getAoE();
            desc = desc.trim();
            if (desc.endsWith(';')) {
                desc = desc.substr(0, desc.length - 1);
            }
            this.description = desc;
            this.compiledDescription = true;
        }
        return this.description;
    }
}

export class BuffMagic extends SupportMagic {
    private buffStat: BuffStats;
    constructor(name: string, cost: number, minLevel: number, supportType: SupportType, buffStat: BuffStats,
        aoe = -1, description = '', createSkillCards = true) {
            super(name, cost, minLevel, supportType, aoe, description, createSkillCards);
            this.buffStat = buffStat;
    }

    getSupportDescription(): string {
        if (this.supportType !== SupportType.SpecialBuff) {
            return `${SupportType[this.supportType]} ${this.buffStat} by 1/3 for 3 turns; `;
        }
        return '';
    }
}

export class WallMagic extends SupportMagic {
    private wallElement: Element;
    constructor(name: string, cost: number, minLevel: number, wallElement: Element, aoe = -1, description = '', createSkillCards = true) {
        super(name, cost, minLevel, SupportType.Wall, aoe, description, createSkillCards);
        this.wallElement = wallElement;
    }

    getSupportDescription(): string {
        if (this.wallElement === Element.Support) {
            // This wall is in some way weird or special just use the description
            return '';
        }
        return `Immunity to ${this.wallElement} for 3 turns; `;
    }
}

export class BreakMagic extends SupportMagic {
    private breakElement: Element;
    constructor(name: string, cost: number, minLevel: number, breakElement: Element, aoe = -1, description = '', createSkillCards = true) {
        super(name, cost, minLevel, SupportType.Break, aoe, description, createSkillCards);
        this.breakElement = breakElement;
    }

    getSupportDescription(): string {
        if (this.breakElement === Element.Support) {
            // This break is in some way weird or special just use the description
            return '';
        }
        return `Removes all ${this.breakElement} resistances, except ${this.breakElement} Wall, for 3 turns; `;
    }
}

export class AilmentMagic extends ActiveSkill {
    private ailmentType: AilmentType;
    private ailmentFV: number;
    constructor(name: string, cost: number, minLevel: number, ailmentType: AilmentType, ailmentFV: number,
        aoe = -1, description = '', createSkillCards = true) {
            super(name, cost, Element.Ailment, aoe, minLevel, description, createSkillCards);
            this.ailmentType = ailmentType;
            this.ailmentFV = ailmentFV;
    }

    getAilmentDescription(): string {
        return `${this.ailmentType} FV=${this.ailmentFV}; `;
    }

    getDescription(): string {
        if (!this.compiledDescription) {
            let desc = this.getAilmentDescription() + this.description + this.getAoE();
            desc = desc.trim();
            if (desc.endsWith(';')) {
                desc = desc.substr(0, desc.length - 1);
            }
            this.description = desc;
            this.compiledDescription = true;
        }
        return this.description;
    }
}


abstract class PassiveSkill extends Skill {
    constructor(name: string, cost: number, minLevel: number, description: string, createSkillCards: boolean) {
        super(name, cost, Element.Passive, description, minLevel, createSkillCards);
    }

    abstract passiveDescription(): string;

    getDescription(): string {
        if (!this.compiledDescription) {
            let desc = this.passiveDescription() + this.description;
            desc = desc.trim();
            if (desc.endsWith(';')) {
                desc = desc.substr(0, desc.length - 1);
            }
            this.description = desc;
            this.compiledDescription = true;
        }
        return this.description;
    }
}

export class BoostSkill extends PassiveSkill {
    private boostElement: Element | AilmentType;
    private boostType: BoostType;
    constructor(name: string, boostElement: Element | AilmentType, minLevel: number, boostType: BoostType, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.boostElement = boostElement;
        this.boostType = boostType;
    }

    passiveDescription(): string {
        if (this.boostType === BoostType.Boost || this.boostType === BoostType.Amp) {
            return `+${this.boostType}% to all ${this.boostElement} damage; `;
        } else if (this.boostType === BoostType.Ailment) {
            return `Reduce FV for attacks that inflict ${this.boostElement} by ${this.boostType}; `;
        } else {
            return '';
        }
    }
}

export class ReductionSkill extends PassiveSkill {
    private reductionElement: Element | AilmentType;
    private reductionType: ReductionType;
    constructor(name: string, reductionElement: Element | AilmentType, minLevel: number, reductionType: ReductionType,
        description = '', createSkillCards = true) {
            super(name, 0, minLevel, description, createSkillCards);
            this.reductionElement = reductionElement;
            this.reductionType = reductionType;
    }

    passiveDescription(): string {
        if (this.reductionType === ReductionType.ResistElement) {
            return `Halve all ${this.reductionElement}; `;
        } else if (this.reductionType === ReductionType.ResistAilment) {
            return `When you would be afflicted with ${this.reductionElement}, roll a d20 on an 11+ it misses instead; `;
        } else if (this.reductionType === ReductionType.NullElement) {
            return `Nullify all ${this.reductionElement} attacks; `;
        } else if (this.reductionType === ReductionType.NullAilment) {
            return `Nullify ${this.reductionElement}; `;
        } else {
            const cbRider = this.reductionElement === Element.Bless || this.reductionElement === Element.Curse ? 'Insta-kill attacks are nullifed; ' : '';
            if (this.reductionType === ReductionType.Repel) {
                return `Reflect all ${this.reductionElement} damage back to attacker; ` + cbRider;
            } else if (this.reductionType === ReductionType.Absorb) {
                return `All ${this.reductionElement} damage is treated as healing; ` + cbRider;
            } else {
                return '';
            }
        }
    }
}

export class DodgeSkill extends PassiveSkill {
    private dodgeElement: Element;
    private dodgeBonus: DodgeBonus;
    constructor(name: string, dodgeElement: Element, minLevel: number, dodgeBonus: DodgeBonus, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.dodgeElement = dodgeElement;
        this.dodgeBonus = dodgeBonus;
    }

    passiveDescription(): string {
        if (this.dodgeBonus !== DodgeBonus.Speical) {
            return `When targeted by ${this.dodgeElement} attacks, roll d20, on a ${this.dodgeBonus} or higher you dodge the attack`;
        } else {
            return '';
        }
    }
}

export class CounterSkill extends PassiveSkill {
    private repelRoll: number;
    constructor(name: string, minLevel: number, repelRoll: number, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.repelRoll = repelRoll;
    }

    passiveDescription(): string {
        return `Every time you are hit with a Phyical or Gun attack, roll d20, on a ${this.repelRoll}-20 repel the attack`;
    }
}

export class RecoverySkill extends PassiveSkill {
    protected recoveryType: RecoveryType;
    protected recoveryValues: number[];
    constructor(name: string, minLevel: number, recoveryType: RecoveryType, recoveryValues: number[], description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.recoveryType = recoveryType;
        this.recoveryValues = recoveryValues;
    }

    passiveDescription(): string {
        if (this.recoveryType === RecoveryType.Ailment) {
            return `${this.recoveryType} ${this.recoveryValues[0]} turns`;
        }
        let recString = '';
        if (this.recoveryType === RecoveryType.HPSP) {
            recString = `${this.recoveryValues[0]}${RecoveryType.HP} & ${this.recoveryValues[1]}${RecoveryType.SP}`;
        } else {
            recString = `${this.recoveryValues[0]}${this.recoveryType}`;
        }
        return `Heal ${recString} a turn`;
    }
}

export class MasterSkill extends PassiveSkill {
    protected masterType: MasterType;
    protected level: MasteryLevel;
    constructor(name: string, minLevel: number, masterType: MasterType, masteryLevel: MasteryLevel, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.masterType = masterType;
        this.level = masteryLevel;
    }

    passiveDescription(): string {
        if (this.masterType % 2 === 0) {
            return `Grants ${MasterType[this.masterType]} ${this.level === MasteryLevel.God ? 'to all allies ' : ''}at battle's start`;
        } else {
            return `Reduces skill ${MasterType[this.masterType]} cost by ${this.level === MasteryLevel.God ? 'half' : 'a quarter'}`;
        }
    }
}

export class KillSkill extends RecoverySkill {
    constructor(name: string, minLevel: number, recoveryType: RecoveryType, recoveryValues: number[], description = '', createSkillCards = true) {
        super(name, 0, recoveryType, recoveryValues, description, createSkillCards);
    }

    passiveDescription(): string {
        let recString = '';
        if (this.recoveryType === RecoveryType.HPSP) {
            recString = `${this.recoveryValues[0]}${RecoveryType.HP} & ${this.recoveryValues[1]}${RecoveryType.SP}`;
        } else {
            recString = `${this.recoveryValues[0]}${this.recoveryType}`;
        }
        return `Heal ${recString} when you kill an enemy`;
    }
}

export class PostCombatSkill extends RecoverySkill {
    constructor(name: string, minLevel: number, recoveryType: RecoveryType, recoveryValues: number[], description = '', createSkillCards = true) {
        super(name, 0, recoveryType, recoveryValues, description, createSkillCards);
    }

    passiveDescription(): string {
        let recString = '';
        if (this.recoveryType === RecoveryType.HPSP) {
            if (this.recoveryValues[0] === -1) {
                recString = `Fully restore HP & SP`;
            }
            recString = `Gain ${this.recoveryValues[0]}${RecoveryType.HP} & ${RecoveryType.SP}`;
        } else {
            recString = `Gain ${this.recoveryValues[0]}${this.recoveryType}`;
        }
        return `${recString} after combat if you did not die`;
    }
}

export class GrowthSkill extends PassiveSkill {
    private growth: number;
    constructor(name: string, minLevel: number, growth: number, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
        this.growth = growth;
    }

    passiveDescription(): string {
        return `Allows ${this.growth} acitve ally skill at no`;
    }
}

export class ChainSkill extends MasterSkill {
    constructor(name: string, minLevel: number, masterType: MasterType, masteryLevel: MasteryLevel, description = '', createSkillCards = true) {
        super(name, minLevel, masterType, masteryLevel, description, createSkillCards);
    }

    passiveDescription(): string {
        if (this.masterType % 2 === 0) {
            return `Grants ${MasterType[this.masterType]} ${this.level === MasteryLevel.God ? 'to all allies ' : ''}after a baton pass`;
        } else {
            return `Restores ${this.level === MasteryLevel.God ? '4' : '2'}% ${MasterType[this.masterType]} after a baton pass`;
        }
    }
}

export class IrregularPassive extends PassiveSkill {
    constructor(name: string, minLevel: number, description = '', createSkillCards = true) {
        super(name, 0, minLevel, description, createSkillCards);
    }

    passiveDescription(): string {
        return '';
    }
}

export class PersonaSkill {
    readonly level: number;
    readonly skill: Skill;
    constructor(skill: Skill, level: number) {
        this.skill = skill;
        this.level = level;
    }
}
