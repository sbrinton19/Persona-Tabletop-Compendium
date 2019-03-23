import { DamageMultiplier, getDamageMultiplierName } from '../Enums/DamageMultiplier';
import { PersonaReference } from './PersonaReference';
import { Element, getElementName } from '../Enums/Element';
import { AilmentType, getAilmentName } from '../Enums/AilmentType';
import { SupportType, getSupportTypeDisplayName } from '../Enums/SupportType';
import { PassiveType, getPassiveTypeName } from '../Enums/PassiveType';
import { getBuffTypeName } from '../Enums/BuffType';
import { getBoostTypeName, BoostType } from '../Enums/BoostType';
import { getReductionTypeName, ReductionType } from '../Enums/ReductionType';
import { getRecoveryTypeName, RecoveryType } from '../Enums/RecoveryType';
import { getMasterTypeName } from '../Enums/MasterType';

export class FlatSkill {
    readonly id: number;
    readonly name: string;
    readonly cost: number;
    readonly element: Element;
    readonly aoe: number;
    readonly minLevel: number;
    readonly description: string;
    readonly allyCardId: number;
    readonly mainCardId: number;

    public constructor(id: number, name: string, cost: number, element: Element, aoe: number, minLevel: number, description: string,
        allyCardId: number, mainCardId: number) {
            this.id = id;
            this.name = name;
            this.cost = cost;
            this.element = element;
            this.aoe = aoe;
            this.minLevel = minLevel;
            this.description = description;
            this.allyCardId = allyCardId;
            this.mainCardId = mainCardId;
    }

    public static emptyConstructor(): FlatSkill {
        return new FlatSkill(-1, 'Blank Skill', -1, Element.AllDamage, -1, -1, '', -1, -1);
    }

    public static copyConstructor(source: FlatSkill): FlatSkill {
        return new FlatSkill(source.id, source.name, source.cost, source.element, source.aoe, source.minLevel, source.description,
            source.allyCardId, source.mainCardId);
    }

    public getFieldByName(fieldName: string, asDisplay = false): any {
        let val: any;
        val = this[fieldName];
        if (asDisplay) {
            if (fieldName === 'cost') {
                return this.getFormattedCost();
            } else if (fieldName === 'element') {
                return this.getSkillElement();
            }
        }
        return val;
    }

    public getFieldStyle(fieldName: string): string {
        return '';
    }

    public clone(): FlatSkill {
        return FlatSkill.copyConstructor(this);
    }

    public getFormattedCost(): string {
        if (this.element === Element.Physical || this.element === Element.Gun) {
            return `${this.cost}% HP`;
        } else if (this.element === Element.Passive) {
            return `-`;
        } else {
            return `${this.cost} SP`;
        }
    }

    public getSkillElement(): string {
        return getElementName(this.element);
    }

    public getFormattedAoE(): string {
        if (this.aoe === -1) {
            return '-';
        }
        if (this.aoe === 0) {
            return 'Self';
        }
        return `AoE=${this.aoe}`;
    }

    public getAllyCardName(): string {
        return `${this.name} Ally`;
    }

    public geMainCardName(): string {
        return `${this.name} Main`;
    }

    public isEqual(other: FlatSkill): boolean {
        if (!other) {
            return false;
        }
        return (this.id === other.id && this.name === other.name && this.cost === other.cost && this.element === other.element &&
            this.minLevel === other.minLevel && this.aoe === other.aoe && this.description === other.description &&
            this.allyCardId === other.allyCardId && this.mainCardId === other.mainCardId);
    }
}

export class FlatDamageSkill extends FlatSkill {
    readonly multiplier: DamageMultiplier;
    readonly maxDamageDice: number;
    readonly damageDie: number;
    readonly damageBonus: number;
    minDamage: number;
    avgDamage: number;
    maxDamage: number;

    public constructor(id: number, name: string, cost: number, element: Element, aoe: number, minLevel: number, description: string,
        allyCardId: number, mainCardId: number, damageMultiplier: DamageMultiplier, maxDamageDice: number, damageDie: number, damageBonus: number) {
            super(id, name, cost, element, aoe, minLevel, description, allyCardId, mainCardId);
            this.multiplier = damageMultiplier;
            this.maxDamageDice = maxDamageDice;
            this.damageDie = damageDie;
            this.damageBonus = damageBonus;

            if (this.element === Element.Healing) {
                return;
            }
            minLevel = minLevel > 80 ? 80 : minLevel;
            const dmgBonus = this.element === Element.Gun ? 0 :
                (this.element === Element.Physical || this.element === Element.Curse || this.element === Element.Bless ? 10 * (minLevel + 20) / 20 :
                10 * (minLevel + 20) / 40);
            this.minDamage = this.multiplier * (this.maxDamageDice + dmgBonus + this.damageBonus);
            this.avgDamage = this.multiplier * ((this.maxDamageDice + this.maxDamageDice * this.damageDie) / 2 + dmgBonus + this.damageBonus);
            this.maxDamage = this.multiplier * (this.maxDamageDice * this.damageDie + dmgBonus + this.damageBonus);
    }

    public static copyConstructor(source: FlatDamageSkill): FlatDamageSkill {
        return new FlatDamageSkill(source.id, source.name, source.cost, source.element, source.aoe, source.minLevel, source.description,
            source.allyCardId, source.mainCardId, source.multiplier, source.maxDamageDice, source.damageDie, source.damageBonus);
    }

    public clone(): FlatDamageSkill {
        return FlatDamageSkill.copyConstructor(this);
    }

    public getDamageMultiplierString(): string {
        return getDamageMultiplierName(this.multiplier);
    }

    public isEqual(other: FlatDamageSkill): boolean {
        if (!other) {
            return false;
        }
        return (super.isEqual(other) && this.maxDamageDice === other.maxDamageDice && this.multiplier === other.multiplier &&
            this.damageBonus === other.damageBonus && this.damageDie === other.damageDie);
    }
}

export class FlatDamageAilmentSkill extends FlatDamageSkill {
    readonly ailmentType: AilmentType;
    readonly ailmentFailValue: number;

    public constructor(id: number, name: string, cost: number, element: Element, aoe: number, minLevel: number, description: string,
        allyCardId: number, mainCardId: number, damageMultiplier: DamageMultiplier, maxDamageDice: number, damageDie: number, damageBonus: number,
        ailmentType: AilmentType, ailmentFailValue: number) {
            super(id, name, cost, element, aoe, minLevel, description, allyCardId, mainCardId, damageMultiplier, maxDamageDice, damageDie, damageBonus);
            this.ailmentType = ailmentType;
            this.ailmentFailValue = ailmentFailValue;
    }

    public static copyConstructor(source: FlatDamageAilmentSkill): FlatDamageAilmentSkill {
        return new FlatDamageAilmentSkill(source.id, source.name, source.cost, source.element, source.aoe, source.minLevel, source.description,
            source.allyCardId, source.mainCardId, source.multiplier, source.maxDamageDice, source.damageDie, source.damageBonus, source.ailmentType,
            source.ailmentFailValue);
    }

    public clone(): FlatDamageAilmentSkill {
        return FlatDamageAilmentSkill.copyConstructor(this);
    }

    public getAilmentName(): string {
        return getAilmentName(this.ailmentType);
    }

    public isEqual(other: FlatDamageAilmentSkill): boolean {
        if (!other) {
            return false;
        }
        return (super.isEqual(other) && this.ailmentType === other.ailmentType && this.ailmentFailValue === other.ailmentFailValue);
    }
}

export class FlatSupportSkill extends FlatSkill {
    readonly supportType: SupportType;
    readonly supportValue: number;

    public constructor(id: number, name: string, cost: number, element: Element, aoe: number, minLevel: number, description: string,
        allyCardId: number, mainCardId: number, supportType: SupportType, supportValue: number) {
        super(id, name, cost, element, aoe, minLevel, description, allyCardId, mainCardId);
        this.supportType = supportType;
        this.supportValue = supportValue;
    }

    public static copyConstructor(source: FlatSupportSkill): FlatSupportSkill {
        return new FlatSupportSkill(source.id, source.name, source.cost, source.element, source.aoe, source.minLevel, source.description,
            source.allyCardId, source.mainCardId, source.supportType, source.supportValue);
    }

    public clone(): FlatSupportSkill {
        return FlatSupportSkill.copyConstructor(this);
    }

    public getSupportTypeName(): string {
        return getSupportTypeDisplayName(this.supportType);
    }

    public getFormattedSupportValue(): string {
        switch (this.supportType) {
            case SupportType.Lower:
            case SupportType.Increase:
                return getBuffTypeName(this.supportValue);
            case SupportType.SpecialBuff:
                return '-';
            case SupportType.Wall:
            case SupportType.Break:
                return getElementName(this.supportValue);
            default:
                return '-';
        }
    }

    public isEqual(other: FlatSupportSkill): boolean {
        if (!other) {
            return false;
        }
        return (super.isEqual(other) && this.supportType === other.supportType && this.supportValue === other.supportValue);
    }
}

export class FlatAilmentSkill extends FlatSkill {
    readonly ailmentType: AilmentType;
    readonly ailmentFailValue: number;

    public constructor(id: number, name: string, cost: number, element: Element, aoe: number, minLevel: number, description: string,
        allyCardId: number, mainCardId: number, ailmentType: AilmentType, ailmentFailValue: number) {
            super(id, name, cost, element, aoe, minLevel, description, allyCardId, mainCardId);
            this.ailmentType = ailmentType;
            this.ailmentFailValue = ailmentFailValue;
    }

    public static copyConstructor(source: FlatAilmentSkill): FlatAilmentSkill {
        return new FlatAilmentSkill(source.id, source.name, source.cost, source.element, source.aoe, source.minLevel, source.description,
            source.allyCardId, source.mainCardId, source.ailmentType, source.ailmentFailValue);
    }

    public clone(): FlatAilmentSkill {
        return FlatAilmentSkill.copyConstructor(this);
    }

    public getAilmentName(): string {
        return getAilmentName(this.ailmentType);
    }

    public isEqual(other: FlatAilmentSkill) {
        if (!other) {
            return false;
        }
        return (super.isEqual(other) && this.ailmentType === other.ailmentType && this.ailmentFailValue === other.ailmentFailValue);
    }
}

export class FlatPassiveSkill extends FlatSkill {
    readonly passiveType: PassiveType;
    readonly type: number;
    readonly value: number;
    readonly secondValue: number;

    public constructor(id: number, name: string, cost: number, element: Element, aoe: number, minLevel: number, description: string,
        allyCardId: number, mainCardId: number, passiveType: PassiveType, type: number, value: number, secondValue: number) {
            super(id, name, cost, element, aoe, minLevel, description, allyCardId, mainCardId);
            this.passiveType = passiveType;
            this.type = type;
            this.value = value;
            this.secondValue = secondValue;
    }

    public static copyConstructor(source: FlatPassiveSkill): FlatPassiveSkill {
        return new FlatPassiveSkill(source.id, source.name, source.cost, source.element, source.aoe, source.minLevel, source.description,
            source.allyCardId, source.mainCardId, source.passiveType, source.type, source.value, source.secondValue);
    }

    public clone(): FlatPassiveSkill {
        return FlatPassiveSkill.copyConstructor(this);
    }

    public getPassiveTypeName(): string {
        return getPassiveTypeName(this.passiveType);
    }

    public getPassiveSkillTypeName(): string {
        switch (this.passiveType) {
            case PassiveType.Boost:
                return getBoostTypeName(this.type);
            case PassiveType.Reduction:
                return getReductionTypeName(this.type);
            case PassiveType.Dodge:
            case PassiveType.Counter:
                return this.type.toString();
            case PassiveType.Master:
            case PassiveType.Chain:
                return getMasterTypeName(this.type);
            case PassiveType.Post:
            case PassiveType.Kill:
            case PassiveType.Recover:
                return getRecoveryTypeName(this.type);
            case PassiveType.Growth:
            case PassiveType.Irregular:
                return '-';
        }
    }

    public getFormattedPrimaryValue(): string {
        if (this.passiveType === PassiveType.Boost) {
            if (this.type === BoostType.Ailment) {
                return getAilmentName(this.value);
            } else {
                return getElementName(this.value);
            }
        } else if (this.passiveType === PassiveType.Reduction) {
            if (this.type === ReductionType.NullAilment || this.type === ReductionType.ResistAilment) {
                return getAilmentName(this.value);
            } else {
                return getElementName(this.value);
            }
        } else if (this.passiveType === PassiveType.Dodge) {
            return getElementName(this.value);
        } else {
            return this.value.toString();
        }
    }

    public getFormattedSecondaryValue(): string {
        if (this.passiveType === PassiveType.Recover || this.passiveType === PassiveType.Post || this.passiveType === PassiveType.Kill) {
            if (this.type === RecoveryType.HPSP) {
                return this.secondValue.toString();
            }
        }
        return '-';
    }

    public isEqual(other: FlatPassiveSkill): boolean {
        if (!other) {
            return false;
        }
        return (super.isEqual(other) && this.passiveType === other.passiveType && this.type === other.type &&
            this.value === other.value && this.secondValue === other.secondValue);
    }
}

export class PersonaSkill {
    readonly sourceId: number;
    readonly skillId: number;
    readonly level: number;
    readonly isPersona: boolean;

    public constructor(sourceId: number, skillid: number, level: number, isPersona: boolean) {
        this.sourceId = sourceId;
        this.skillId = skillid;
        this.level = level;
        this.isPersona = isPersona;
    }

    public static copyConstructor(source: PersonaSkill): PersonaSkill {
        return new PersonaSkill(source.sourceId, source.skillId, source.level, source.isPersona);
    }

    public clone(): PersonaSkill {
        return PersonaSkill.copyConstructor(this);
    }

    public isEqual(other: PersonaSkill) {
        if (!other) {
            return false;
        }
        return (this.sourceId === other.sourceId && this.skillId === other.skillId && this.level === other.level && this.isPersona === other.isPersona);
    }
}

export class LeveledSkill extends FlatSkill {
    readonly level: number;

    public constructor(id: number, name: string, cost: number, element: Element, aoe: number, minLevel: number, description: string,
        allyCardId: number, mainCardId: number, level: number) {
        super(id, name, cost, element, aoe, minLevel, description, allyCardId, mainCardId);
        this.level = level;
    }

    public static emptyConstructor(): LeveledSkill {
        return new LeveledSkill(-1, 'Blank Skill', -1, Element.AllDamage, -1, -1, '', -1, -1, -1);
    }

    public static copyConstructor(source: LeveledSkill): LeveledSkill {
        return new LeveledSkill(source.id, source.name, source.cost, source.element, source.aoe, source.minLevel, source.description,
            source.allyCardId, source.mainCardId, source.level);
    }

    public clone(): LeveledSkill {
        return LeveledSkill.copyConstructor(this);
    }

    public isEqual(other: LeveledSkill) {
        if (!other) {
            return false;
        }
        return (super.isEqual(other) && this.level === other.level);
    }
}

export class FullSkill {
    readonly skill: FlatSkill;
    readonly personaSources: PersonaReference[] = [];
    readonly skillClass: string;

    public constructor(skill: FlatSkill, personaSources: PersonaReference[], skillClass: string) {
        this.skill = skill;
        this.personaSources = personaSources;
        this.skillClass = skillClass;
    }

    public static copyConstructor(source: FullSkill): FullSkill {
        let realSkill: FlatSkill;
        switch (source.skillClass) {
            case 'FlatDamageSkill':
                realSkill = FlatDamageSkill.copyConstructor(source.skill as FlatDamageSkill);
                break;
            case 'FlatDamageAilmentSkill':
                realSkill = FlatDamageAilmentSkill.copyConstructor(source.skill as FlatDamageAilmentSkill);
                break;
            case 'FlatSupportSkill':
                realSkill = FlatSupportSkill.copyConstructor(source.skill as FlatSupportSkill);
                break;
            case 'FlatAilmentSkill':
                realSkill = FlatAilmentSkill.copyConstructor(source.skill as FlatAilmentSkill);
                break;
            case 'FlatPassiveSkill':
                realSkill = FlatPassiveSkill.copyConstructor(source.skill as FlatPassiveSkill);
                break;
            default:
                console.error(`Failed to reconstruct FlatSkill for FullSkill ${source.skill.name}`);
        }

        const sourceArray: PersonaReference[] = [];
        source.personaSources.forEach(personaSource => sourceArray.push(PersonaReference.copyConstructor(personaSource)));

        return new FullSkill(realSkill, sourceArray, source.skillClass);
    }

    public clone(): FullSkill {
        return FullSkill.copyConstructor(this);
    }

    public formatCost(): string {
        if (this.skill.element === Element.Physical || this.skill.element === Element.Gun) {
            return `${this.skill.cost}% HP`;
        } else if (this.skill.element === Element.Passive) {
            return `-`;
        } else {
            return `${this.skill.cost} SP`;
        }
    }

    public getSkillElement(): string {
        return getElementName(this.skill.element);
    }

    public getDescription(): string {
        return this.skill.description;
    }

    public getAllyCardName(): string {
        return `${this.skill.name} Ally`;
    }

    public geMainCardName(): string {
        return `${this.skill.name} Main`;
    }

    public isEqual(other: FullSkill): boolean {
        if (!other) {
            return false;
        }

        if (this.personaSources.length !== other.personaSources.length) {
            return false;
        }
        const sourcesMatch = this.personaSources.every(source => {
            const matcher = other.personaSources.find(otherSource => source.isEqual(otherSource));
            return matcher !== undefined;
        });
        if (!sourcesMatch) {
            return false;
        }

        return (this.skill.isEqual(other.skill) && this.skillClass === other.skillClass);
    }
}
