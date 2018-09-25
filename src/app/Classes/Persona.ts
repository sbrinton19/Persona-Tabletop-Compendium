import { PersonaSkill } from './Skill';
import { Drop, Item, Loot, NegotiateDrop, OriginType, SkillCard } from './Item';

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
    negotiates: NegotiateDrop[] = [];
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
        elems: ElemResist[], skills: PersonaSkill[], transmutes: Item[], negotiates: NegotiateDrop[],
        drops: Drop[], special: boolean, max: boolean, dlc: boolean, rare: boolean, note: string) {
            this.id = Persona.idSource++;
            this.name = name;
            this.arcana = arcana;
            this.level = level;
            this.stats = stats;
            this.elems = elems;
            this.skills = skills;
            this.skills.forEach(skill => {
                skill.skill.personaSources.push(this);
                const temp = skill.level === 0 ? this.level : skill.level;
                if (skill.skill.minLevel > temp) {
                    console.warn(`The persona ${this.name} learns the skill ${skill.skill.name} before its recommended minimum level`);
                }
                if (skill.skill.minLevel + 20 < temp && skill.skill.minLevel !== 0) {
                    console.warn(`The persona ${this.name} learns the skill ${skill.skill.name} after its recommended maximum level`);
                }
            });
            this.transmutes = transmutes;
            negotiates.forEach(negot => {
                this.negotiates.push(new NegotiateDrop(negot.item, negot.low, negot.high));
            });
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
            let drop = this.drops[0];
            drop.warning();
            if (drop.item.id !== 0) {
                if (drop.low === drop.high) {
                    drop.rollWinDisplay = `${drop.high}`;
                } else {
                    drop.rollWinDisplay = `${drop.low}-${drop.high}`;
                }
                drop.item.personaSources.add(this);
            } else {
                drop.rollWinDisplay = 'All';
            }
            return;
        }
        this.drops.forEach(drop => {
            drop.warning();
            if (drop.item instanceof Loot) {
                if (!drop.item.arcanaSources.includes(this.arcana)) {
                    console.warn(`${drop.item.name} was assigned to ${this.name} which is the wrong drop for this Arcana`);
                }
            }
            if (drop.low === drop.high) {
                drop.rollWinDisplay = `${drop.high}`;
            } else {
                drop.rollWinDisplay = `${drop.low}-${drop.high}`;
            }
            drop.item.personaSources.add(this);
         });
    }

    private processNegotiates(): void {
        if (this.negotiates.length === 1) {
            let negot = this.negotiates[0];
            negot.warning();
            if (this.negotiates[0].item.id !== 0) {
                if (negot.low === negot.high) {
                    negot.rollWinDisplay = `${negot.high}`;
                } else {
                    negot.rollWinDisplay = `${negot.low}-${negot.high}`;
                }
                this.negotiates[0].item.personaSources.add(this);
            } else {
                negot.rollWinDisplay = 'All';
            }
            return;
        }
        this.negotiates.forEach(negot => {
            negot.warning();
            if (negot.low === negot.high) {
                negot.rollWinDisplay = `${negot.high}`;
            } else {
                negot.rollWinDisplay = `${negot.low}-${negot.high}`;
            }
           negot.item.personaSources.add(this);
        });
    }

    private processTransumtes(): void {
        this.transmutes.forEach(transmute => {
            if (!(transmute.origins & OriginType.Transmute)) {
                console.warn(`${transmute.name} is available as a transmutation, but does not have the transmutation OriginType`);
            }
            transmute.transmute = this;
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

    getSkillLevel(skill: number): number {
        const level = this.skills.find(s => s.skill.id == skill).level;
        return level == 0 ? this.level : level;
    }

    getSkillCardSource(item: SkillCard) : string {
        let find = this.drops.find(d => d.item === item);
        let find2 = this.negotiates.find(n => n.item === item);
        let find3 = this.transmutes.find(t => t === item);
        if (find && find2 && find3) {
            return 'Drop, Negotiation, & Transmutation';
        } else if (find && (find2 || find3)) {
            return 'Drop & ' + (find2 ? 'Negotiation' : 'Transmuation');
        } else if (find) {
            return 'Drop';
        } else if (find2) {
            return 'Negotiation' + (find3 ? ' & Transmutation': '');
        } else {
            return 'Transmutation';
        }
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
