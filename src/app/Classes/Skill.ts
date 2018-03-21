import { skillCardList } from "../Data/ItemData";
import { SkillCard, OriginType, SkillCardType } from "./Item";

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
    private static idSource: number;

    readonly id: number;
    readonly name: string;
    readonly cost: number;
    readonly element: Element;
    readonly description: string;
    personaSources: string[] = [];

    constructor(name: string, cost: number, element: Element, description: string, createSkillCards = true) {
        this.id = Skill.idSource++;
        this.name = name;
        this.cost = cost;
        this.element = element;
        this.description = description;
        if (createSkillCards) {
            this.createSkillCards();
        }
    }

    createSkillCards() {
        skillCardList.push(
            new SkillCard(this.name, 1, [OriginType.Drop, OriginType.Transmute], `A skill card for ${this.name}`,
            `Grants 1 ${SkillCardType[SkillCardType.Ally]} Persona the ${this.name} skill`, SkillCardType.Ally));
            
            skillCardList.push(
                new SkillCard(this.name, 1, [OriginType.Drop, OriginType.Transmute], `A skill card for ${this.name}`,
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

export class PersonaSkill extends Skill {
    readonly level: number;

    constructor(skill: Skill, level: number) {
        super(skill.name, skill.cost, skill.element, skill.description, false);
        this.level = level;
    }
}
