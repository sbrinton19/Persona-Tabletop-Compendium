import { element } from "protractor";

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

    constructor(name: string, cost: number, element: Element, description: string) {
        this.id = Skill.idSource++;
        this.name = name;
        this.cost = cost;
        this.element = element;
        this.description = description;
    }

    getSkillElement() {
        return Element[this.element];
    }

    formatCost() {
        if (this.element === Element.Physical || this.element === Element.Gun) {
            return `${this.cost}% HP`;
        } else if (this.element === Element.Passive) {
            return `-`
        } else {
            return `${this.cost} SP`;
        }
    }
}

export class PersonaSkill extends Skill {
    readonly level: number;

    constructor(skill: Skill, level: number) {
        super(skill.name, skill.cost, skill.element, skill.description);
        this.level = level;
    }
}
