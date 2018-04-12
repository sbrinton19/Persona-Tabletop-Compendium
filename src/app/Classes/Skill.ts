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

export class Skill {
    private static idSource = 0;

    readonly id: number;
    readonly name: string;
    readonly cost: number;
    readonly element: Element;
    readonly minLevel: number;
    readonly description: string;
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

    createSkillCards() {
        skillCardList.push(
            new SkillCard(this.id, this.name, 1, [OriginType.Drop, OriginType.Transmute], `A skill card for ${this.name}`,
            `Grants 1 ${SkillCardType[SkillCardType.Ally]} Persona the ${this.name} skill`, SkillCardType.Ally));
        skillCardList.push(
            new SkillCard(this.id, this.name, 1, [OriginType.Drop, OriginType.Transmute], `A skill card for ${this.name}`,
            `Grants 1 ${SkillCardType[SkillCardType.Main]} Persona the ${this.name} skill`, SkillCardType.Main));
    }

    getSkillElement() {
        return Element[this.element];
    }

    formatCost() {
        if (this.element === Element.Physical || this.element === Element.Gun) {
            return `${this.cost}% HP`;
        } else if (this.element === Element.Passive) {
            return `-`;
        } else {
            return `${this.cost} SP`;
        }
    }
}

export class PhysGunSkill extends Skill {
    readonly magSize: number;
    readonly magCount: number;
    constructor(name: string, cost: number, element: Element, minLevel: number, description: string, createSkillCards = true) {
        if (!(element === Element.Physical || element === Element.Gun)) {
            console.warn(`A physical/gun skill object was made from a different element skill: ${name}`);
        }
        super(name, cost, element, description, minLevel, createSkillCards);
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
