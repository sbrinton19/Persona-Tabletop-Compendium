import { PersonaSkill } from './Skill';
import { Drop, Item } from './Item';

export enum ElemResist {
    Weak = 0,
    Neutral,
    Resist,
    Null,
    Repel,
    Absorb
}

export enum Arcana {
    Fool = 0,
    Magician,
    Priestess,
    Empress,
    Emperor,
    Hierophant,
    Lovers,
    Chariot,
    Strength,
    Hermit,
    Fortune,
    Justice,
    Hanged,
    Death,
    Temperance,
    Devil,
    Tower,
    Star,
    Moon,
    Sun,
    Judgement
}

export class Persona {
    private static idSource = 0;
    public static get STATNAMES(): string[] { return ['HP', 'SP', 'Strength', 'Magic', 'Endurance', 'Agility', 'Luck']; }
    public static get ELEMNAMES(): string[] { return ['Phys', 'Gun', 'Fire', 'Ice', 'Elec', 'Wind', 'Psy', 'Nuke', 'Bless', 'Curse']; }

    id: number;
    name: string;
    arcana: Arcana;
    level: number;
    stats: number[];
    elems: ElemResist[];
    skills: PersonaSkill[];
    transmutes: Item[];
    negotiates: Drop[];
    drops: Drop[];
    note: string;
    special: boolean;
    max: boolean;
    dlc: boolean;
    rare: boolean;

    static getElemShort(elem: ElemResist): string {
        switch (elem) {
            case ElemResist.Weak:
                return 'wk';
            case ElemResist.Neutral:
                return '-';
            case ElemResist.Resist:
                return 'rs';
            case ElemResist.Null:
                return 'nu';
            case ElemResist.Repel:
                return 'rp';
            case ElemResist.Absorb:
                return 'ab';
        }
    }

    static getElemFull(elem: ElemResist): string {
        switch (elem) {
            case ElemResist.Neutral:
                return '-';
            case ElemResist.Weak:
            case ElemResist.Resist:
            case ElemResist.Null:
            case ElemResist.Repel:
            case ElemResist.Absorb:
                return ElemResist[elem];
        }
    }

    static getArcanaName(arcana: Arcana): string {
        switch (arcana) {
            case Arcana.Fool:
            case Arcana.Magician:
            case Arcana.Empress:
            case Arcana.Emperor:
            case Arcana.Hierophant:
            case Arcana.Lovers:
            case Arcana.Chariot:
            case Arcana.Strength:
            case Arcana.Hermit:
            case Arcana.Justice:
            case Arcana.Death:
            case Arcana.Temperance:
            case Arcana.Devil:
            case Arcana.Tower:
            case Arcana.Star:
            case Arcana.Moon:
            case Arcana.Sun:
            case Arcana.Judgement:
                return Arcana[arcana];
            case Arcana.Priestess:
                return 'High Priestess';
            case Arcana.Hanged:
                return 'Hanged Man';
            case Arcana.Fortune:
                return 'Wheel of Fortune';
        }
    }

    constructor(name: string, arcana: Arcana, level: number, stats: number[],
        elems: ElemResist[], skills: PersonaSkill[], transmutes: Item[], negotiates: Drop[],
        drops: Drop[], special: boolean, max: boolean, dlc: boolean, rare: boolean, note: string) {
            this.id = Persona.idSource++;
            this.name = name;
            this.arcana = arcana;
            this.level = level;
            this.stats = stats;
            this.elems = elems;
            this.skills = skills;
            this.skills.forEach(skill => {
                skill.personaSources.push(`${this.name}-${this.id}`);
            });
            this.transmutes = transmutes;
            this.negotiates = negotiates;
            this.drops = drops;
            this.special = special;
            this.max = max;
            this.dlc = dlc;
            this.rare = rare;
            this.note = note;
            this.processDrops();
            this.processNegotiates();
            this.processTransumtes();
    }

    private processDrops(): void {
        if (this.drops.length === 1) {
            this.drops[0].rollWinDisplay = 'All';
            if (this.drops[0].item.id !== 0) {
                this.drops[0].item.personaSources.add(`${this.name}|${this.id}`);
            }
            return;
        }
        this.drops.forEach(drop => {
            if (drop.low === drop.high) {
                drop.rollWinDisplay = `${drop.high}`;
            } else {
                drop.rollWinDisplay = `${drop.low}-${drop.high}`;
            }
            drop.item.personaSources.add(`${this.name}|${this.id}`);
         });
    }

    private processNegotiates(): void {
        if (this.negotiates.length === 1) {
            this.negotiates[0].rollWinDisplay = 'All';
            if (this.negotiates[0].item.id !== 0) {
                this.negotiates[0].item.personaSources.add(`${this.name}|${this.id}`);
            }
            return;
        }
        this.negotiates.forEach(negot => {
            if (negot.low === negot.high) {
                negot.rollWinDisplay = `${negot.high}`;
            } else {
                negot.rollWinDisplay = `${negot.low}-${negot.high}`;
            }
           negot.item.personaSources.add(`${this.name}|${this.id}`);
        });
    }

    private processTransumtes(): void {
        this.transmutes.forEach(transmute => {
            transmute.transmute = `${this.name}|${this.id}`;
        });
    }

    getElemShort(elem: ElemResist): string {
        return Persona.getElemShort(elem);
    }

    getElemFull(elem: ElemResist): string {
        return Persona.getElemFull(elem);
    }

    getArcanaName(): string {
        return Persona.getArcanaName(this.arcana);
    }

}

export class Recipe {
    sources: Persona[];
    result: Persona;
    cost: number;

    constructor(sources: Persona[], result: Persona) {
        this.sources = sources;
        this.result = result;
        this.result = result;
        let cost = 0;
        sources.forEach(persona => {
            const level = persona.level;
            cost += (27 * level * level) + (126 * level) + 2147;
        });
        this.cost = cost;
    }
}
