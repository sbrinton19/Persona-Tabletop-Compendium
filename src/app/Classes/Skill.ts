import { skillCardList } from '../Data/ItemData';
import { SkillCard, OriginType, SkillCardType } from './Item';

export enum Element {
    Physical = 1,
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
    Passive
}

export enum DamageMultiplier {
    Light = 0,
    Medium,
    Heavy,
    Severe,
    Collosal
}

export enum AilmentType {
    Sleep,
    Forget,
    Confuse,
    Brainwash,
    Rage,
    Fear,
    Despair,
    Dizzy
}

export class Skill {
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
        this.minLevel = minLevel
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

    getSkillElement() : string {
        return Element[this.element];
    }

    formatCost() : string {
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
    constructor(name: string, cost: number, element: Element, description: string, minLevel: number, aoe: number, createSkillCards: boolean) {
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
    
    constructor(name: string, cost: number, element: Element, minLevel: number, maxDamageDice: number, damageMultiplier: DamageMultiplier,
        damageBonus: number, aoe: number, description: string, damageDie: number, createSkillCards: boolean) {
            super(name, cost, element, description, minLevel, aoe, createSkillCards);
            this.maxDamageDice = maxDamageDice;
            this.multiplier = damageMultiplier;
            this.damageBonus = damageBonus;
            this.damageDie = damageDie;
    }
    abstract getDamageCalculation(): string;
    getDescription(): string {
        if (!this.compiledDescription) {
            let desc = this.getDamageCalculation() + this.getAoE() + this.description
            desc = desc.trim();
            if (desc.endsWith(';')) {
                this.description = desc.substr(0, desc.length -1);
            }
            else {
                this.description = desc;
            }
            this.compiledDescription = true;
        }
        return this.description;
    }
}

export class PhysSkill extends DamageSkill {
    constructor(name: string, cost: number, minLevel: number, maxDamageDice:number, damageMultiplier: DamageMultiplier,
        damageBonus:number, aoe = -1, description = '', damageDie = 6, createSkillCards = true) {
        super(name, cost, Element.Physical, minLevel, maxDamageDice, damageMultiplier, damageBonus, aoe, description, damageDie, createSkillCards)
    }

    getDamageCalculation(): string {
        let coeff = 0.0;
        if (this.multiplier === DamageMultiplier.Medium) {
            return `Deals (STR Bonus)d${this.damageDie} + PAB + ${this.damageBonus}; Max ${this.maxDamageDice}d${this.damageDie}; `;
        }
        if (this.multiplier === DamageMultiplier.Light) {
            coeff = .5;
        }
        else {
            coeff = this.multiplier;
        }
        return `Deals ${coeff}*((STR Bonus)d${this.damageDie} + PAB + ${this.damageBonus}); Max ${this.maxDamageDice}d${this.damageDie}; `;
    }
}

export class PhysAilmentSkill extends PhysSkill {
    private readonly ailment: AilmentType;
    private readonly ailmentFV: number;
    constructor(name: string, cost: number, minLevel: number, maxDamageDice:number, damageMultiplier: DamageMultiplier,
        damageBonus:number, ailment: AilmentType, ailmentFV: number, aoe = -1, description = '', damageDie = 6, createSkillCards = true) {
        super(name, cost, minLevel, maxDamageDice, damageMultiplier, damageBonus, aoe, description, damageDie, createSkillCards)
        this.ailment = ailment;
        this.ailmentFV = ailmentFV;
    }

    getAilment(): string {
        return this.getSkillAilment() + ` FV=${this.ailmentFV}; `;
    }

    getSkillAilment() : string {
        return AilmentType[this.ailment];
    }

    getDescription(): string {
        if (!this.compiledDescription) {
            let desc = this.getDamageCalculation() + this.getAilment() + this.getAoE() + this.description;
            desc = desc.trim();
            if (desc.endsWith(';')) {
                this.description = desc.substr(0, desc.length -1);
            }
            else {
                this.description = desc;
            }
            this.compiledDescription = true;
        }
        return this.description;
    }
}

export class GunSkill extends DamageSkill {
    constructor(name: string, cost: number, minLevel: number, maxDamageDice:number, damageMultiplier: DamageMultiplier,
        damageBonus:number, damageDie: number, description = '', aoe = -1, createSkillCards = true) {
            super(name, cost, Element.Gun, minLevel, maxDamageDice, damageMultiplier, damageBonus, aoe, description, damageDie, createSkillCards)
    }

    getDamageCalculation(): string {
        if (this.damageDie === -1) {
            return '';
        }
        let coeff = 0.0;
        if (this.multiplier === DamageMultiplier.Medium) {
            return `Deals ${this.maxDamageDice}d${this.damageDie} + ${this.damageBonus}; `;
        }
        if (this.multiplier === DamageMultiplier.Light) {
            coeff = .5;
        }
        else {
            coeff = this.multiplier;
        }
        return `Deals ${coeff}*(${this.maxDamageDice}d${this.damageDie} + ${this.damageBonus}); `;
    }
}

/**
 * ElementalMagic is the class for all elemental magic attacks,
 * that use the traditional damage calculation
 */
export class ElementalMagic extends DamageSkill {
    getDamageCalculation(): string {
        throw new Error("Method not implemented.");
    }

}

/**
 * DivineMagic is the class for Bless, Curse, and Almighty
 * magic attacks, using the modified damage formula
 */
export class DivineMagic extends DamageSkill {
    getDamageCalculation(): string {
        throw new Error("Method not implemented.");
    }

}

export class HealingMagic extends DamageSkill {
    getAoE(): string {
        throw new Error("Method not implemented.");
    }
    getDamageCalculation(): string {
        throw new Error("Method not implemented.");
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
