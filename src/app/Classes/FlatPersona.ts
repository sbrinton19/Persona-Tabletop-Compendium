import { OldPersonaSkill, LeveledSkill } from './Skill';
import { PersonaReference } from "./PersonaReference";
import { OldDrop, Item, Loot, NegotiateDrop, OriginType, SkillCard, ItemReference, DropReference, Drop } from './Item';
import { Arcana, getArcanaName } from './Arcana';
import { ElemResist, getElemShort, getElemFull } from './ElemResist';

/**
 * This class is a reference-less version of persona with the list view display data for a persona
 */
export class FlatPersona {
    private static idSource = 0;
    public static get STATNAMES(): string[] { return ['HP', 'SP', 'Strength', 'Magic', 'Endurance', 'Agility', 'Luck']; }
    public static get ELEMNAMES(): string[] { return ['Phys', 'Gun', 'Fire', 'Ice', 'Elec', 'Wind', 'Psy', 'Nuke', 'Bless', 'Curse']; }

    id: number;
    name: string;
    arcana: Arcana;
    level: number;
    stats: number[];
    elems: ElemResist[];
    note: string;
    special: boolean;
    max: boolean;
    dlc: boolean;
    rare: boolean;

    constructor(id: number, name: string, arcana: Arcana, level: number, stats: number[], elems: ElemResist[],
        special: boolean, max: boolean, dlc: boolean, rare: boolean, note: string) {
        if(id === -1)
            this.id = Persona.idSource++;
        else
            this.id = id;
        this.name = name;
        this.arcana = arcana;
        this.level = level;
        this.stats = stats;
        this.elems = elems;
        this.special = special;
        this.max = max;
        this.dlc = dlc;
        this.rare = rare;
        this.note = note;
    }

    public static copyConstructor(source: FlatPersona): FlatPersona {
        return new FlatPersona(source.id, source.name, source.arcana, source.level, source.stats, source.elems, source.special, source.max,
            source.dlc, source.rare, source.note);
    }

    getElemShort(elem: ElemResist): string {
        return getElemShort(elem);
    }

    getElemFull(elem: ElemResist): string {
        return getElemFull(elem);
    }

    getArcanaName(): string {
        return getArcanaName(this.arcana);
    }
}

export class FullPersona extends FlatPersona {
    skills: LeveledSkill[] = [];
    drops: DropReference[] = [];
    negotiates: DropReference[] = [];
    transmutes: ItemReference[] = [];
    toRecipes: Recipe[] = [];
    fromRecipes: Recipe[] = [];

    constructor(id: number, name: string, arcana: Arcana, level: number, stats: number[],
        elems: ElemResist[], special: boolean, max: boolean, dlc: boolean, rare: boolean, note: string,
        skills: LeveledSkill[], drops: DropReference[], negotiates: DropReference[], transmutes: ItemReference[], toRecipes: Recipe[],
        fromRecipes: Recipe[]) {
            super(id, name, arcana, level, stats, elems, special, max, dlc, rare, note);
            this.skills = skills;
            this.drops = drops;
            this.negotiates = negotiates;
            this.transmutes = transmutes;
            this.toRecipes = toRecipes;
            this.fromRecipes = fromRecipes;
            
    }

    public static copyConstructor(source: FullPersona): FullPersona {
        const skills: LeveledSkill[] = [];
        source.skills.forEach(skill => {
            const temp = skill.level === 0 ? source.level : skill.level;
            if (skill.minLevel > temp) {
                console.warn(`The persona ${this.name} learns the skill ${skill.name} before its recommended minimum level`);
            }
            if (skill.minLevel + 20 < temp && skill.minLevel !== 0) {
                console.warn(`The persona ${this.name} learns the skill ${skill.name} after its recommended maximum level`);
            }
            skills.push(new LeveledSkill(skill.id, skill.name, skill.cost, skill.element, skill.description, skill.minLevel, skill.level));
        });
        const drops: DropReference[] = [];
        source.drops.forEach(drop => {
            drops.push(DropReference.copyConstructor(drop));
        });
        const negotiates: DropReference[] = [];
        source.negotiates.forEach(negotiate => {
            negotiates.push(DropReference.copyConstructor(negotiate));
        });
        const transmutes: ItemReference[] = [];
        source.transmutes.forEach(transmute => {
            transmutes.push(ItemReference.copyConstructor(transmute));
        });
        const toRecipes: Recipe[] = [];
        source.toRecipes.forEach(recipe => {
            toRecipes.push(Recipe.copyConstructor(recipe));
        });
        const fromRecipes: Recipe[] = [];
        source.fromRecipes.forEach(recipe => {
            fromRecipes.push(Recipe.copyConstructor(recipe));
        });
        return new FullPersona(source.id, source.name, source.arcana, source.level, source.stats, source.elems, source.special, source.max, source.dlc, source.rare,
            source.note, skills, drops, negotiates, transmutes, toRecipes, fromRecipes);
    }
}

/**
 * Complete Persona object with references for detail view page
 */
class Persona extends FlatPersona {
    skills: OldPersonaSkill[];
    transmutes: Item[];
    negotiates: NegotiateDrop[] = [];
    drops: OldDrop[];


    constructor(name: string, arcana: Arcana, level: number, stats: number[],
        elems: ElemResist[], skills: OldPersonaSkill[], transmutes: Item[], negotiates: NegotiateDrop[],
        drops: OldDrop[], special: boolean, max: boolean, dlc: boolean, rare: boolean, note: string) {
            super(-1, name, arcana, level, stats, elems, special, max, dlc, rare, note);
            this.skills = skills;
            this.transmutes = transmutes;
            negotiates.forEach(negot => {
                this.negotiates.push(new NegotiateDrop(negot.item, negot.low, negot.high));
            });
            this.drops = drops;
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
                drop.item.addPersonaSource(this.id, this.name, OriginType.Drop);
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
            drop.item.addPersonaSource(this.id, this.name, OriginType.Drop);
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
                this.negotiates[0].item.addPersonaSource(this.id, this.name, OriginType.Negotiate);
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
           negot.item.addPersonaSource(this.id, this.name, OriginType.Negotiate);;
        });
    }

    private processTransumtes(): void {
        this.transmutes.forEach(transmute => {
            if(transmute.name === "-")
                return;
            if (!(transmute.origins & OriginType.Transmute)) {
                console.warn(`${transmute.name} is available as a transmutation, but does not have the transmutation OriginType`);
            }
            if (transmute.transmuteId !== -1) {
                console.error(`${transmute.name} is available as a transmutation of ${transmute.transmuteId} and is also attempting to be used by ${this.name}`);
            }
            transmute.transmuteId = this.id;
            transmute.addPersonaSource(this.id, this.name, OriginType.Transmute);
        });
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
    sources: PersonaReference[];
    result: PersonaReference;
    cost: number;

    constructor(sources: PersonaReference[], result: PersonaReference, cost: number) {
        this.sources = sources;
        this.result = result;
        this.cost = cost;
    }

    static copyConstructor(source: Recipe): Recipe {
        let newSources: PersonaReference[] = [];
        source.sources.forEach(source => newSources.push(PersonaReference.copyConstructor(source)));
        return new Recipe(newSources, PersonaReference.copyConstructor(source.result), source.cost);
    }
}
