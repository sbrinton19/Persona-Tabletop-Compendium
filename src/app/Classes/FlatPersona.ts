import { LeveledSkill } from './FlatSkill';
import { ItemReference, DropReference } from './ItemReference';
import { Arcana, getArcanaName } from '../Enums/Arcana';
import { ElemResist, getElemShort, getElemFull } from '../Enums/ElemResist';
import { Recipe } from './Recipe';

/**
 * This class is a reference-less persona with the data for the list view display
 */
export class FlatPersona {
    public static STATNAMES: string[] =  ['HP', 'SP', 'Strength', 'Magic', 'Endurance', 'Agility', 'Luck'];
    public static ELEMNAMES: string[] = ['Phys', 'Gun', 'Fire', 'Ice', 'Elec', 'Wind', 'Psy', 'Nuke', 'Bless', 'Curse'];

    readonly id: number;
    readonly name: string;
    readonly arcana: Arcana;
    readonly level: number;
    readonly stats: number[];
    readonly elems: ElemResist[];
    readonly note: string;
    readonly special: boolean;
    readonly max: boolean;
    readonly dlc: boolean;
    readonly rare: boolean;

    public constructor(id: number, name: string, arcana: Arcana, level: number, stats: number[], elems: ElemResist[], special: boolean,
        max: boolean, dlc: boolean, rare: boolean, note: string) {
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
        return new FlatPersona(source.id, source.name, source.arcana, source.level, source.stats, source.elems, source.special, source.max, source.dlc,
            source.rare, source.note);
    }

    public getElemShort(elem: ElemResist): string {
        return getElemShort(elem);
    }

    public getElemFull(elem: ElemResist): string {
        return getElemFull(elem);
    }

    public getArcanaName(): string {
        return getArcanaName(this.arcana);
    }

    public isEqual(other: FlatPersona): boolean {
        if (!other) {
            return false;
        }

        if (this.stats.length !== other.stats.length) {
            return false;
        }
        for (let i = 0; i < this.stats.length; i++) {
            if (this.stats[i] !== other.stats[i]) {
                return false;
            }
        }

        if (this.elems.length !== other.elems.length) {
            return false;
        }
        for (let i = 0; i < this.elems.length; i++) {
            if (this.elems[i] !== other.elems[i]) {
                return false;
            }
        }

        return (this.id === other.id && this.name === other.name && this.arcana === other.arcana && this.level === other.level &&
            this.special === other.special && this.max === other.max && this.dlc === other.dlc && this.rare === other.rare &&
            this.note === other.note);
    }
}

/**
 * A complete Persona with all its references
 */
export class FullPersona extends FlatPersona {
    readonly skills: LeveledSkill[];
    readonly drops: DropReference[];
    readonly negotiates: DropReference[];
    readonly transmutes: ItemReference[];
    readonly toRecipes: Recipe[];
    readonly fromRecipes: Recipe[];

    public constructor(id: number, name: string, arcana: Arcana, level: number, stats: number[], elems: ElemResist[], special: boolean,
        max: boolean, dlc: boolean, rare: boolean, note: string, skills: LeveledSkill[], drops: DropReference[], negotiates: DropReference[],
        transmutes: ItemReference[], toRecipes: Recipe[], fromRecipes: Recipe[]) {
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
            skills.push(LeveledSkill.copyConstructor(skill));
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
        return new FullPersona(source.id, source.name, source.arcana, source.level, source.stats, source.elems, source.special, source.max, source.dlc,
            source.rare, source.note, skills, drops, negotiates, transmutes, toRecipes, fromRecipes);
    }

    public isEqual(other: FullPersona) {
        if (!other) {
            return false;
        }

        if (this.skills.length !== other.skills.length) {
            return false;
        }
        const skillMatch = this.skills.every(skill => {
            const matcher = other.skills.find(otherSkill => skill.isEqual(otherSkill));
            return matcher !== undefined;
        });
        if (!skillMatch) {
            return false;
        }

        if (this.drops.length !== other.drops.length) {
            return false;
        }
        const dropMatch = this.drops.every(drop => {
            const matcher = other.drops.find(otherDrop => drop.isEqual(otherDrop));
            return matcher !== undefined;
        });
        if (!dropMatch) {
            return false;
        }

        if (this.negotiates.length !== other.negotiates.length) {
            return false;
        }
        const negotiatesMatch = this.negotiates.every(negotiate => {
            const matcher = other.negotiates.find(otherNegotiate => negotiate.isEqual(otherNegotiate));
            return matcher !== undefined;
        });
        if (!negotiatesMatch) {
            return false;
        }

        if (this.transmutes.length !== other.transmutes.length) {
            return false;
        }
        const transmutesMatch = this.transmutes.every(transmute => {
            const matcher = other.transmutes.find(otherTransmute => transmute.isEqual(otherTransmute));
            return matcher !== undefined;
        });
        if (!transmutesMatch) {
            return false;
        }

        if (this.toRecipes.length !== other.toRecipes.length) {
            return false;
        }
        const toRecipesMatch = this.toRecipes.every(toRecipe => {
            const matcher = other.toRecipes.find(otherToRecipe => toRecipe.isEqual(otherToRecipe));
            return matcher !== undefined;
        });
        if (!toRecipesMatch) {
            return false;
        }

        if (this.fromRecipes.length !== other.fromRecipes.length) {
            return false;
        }
        const fromRecipesMatch = this.fromRecipes.every(fromRecipe => {
            const matcher = other.fromRecipes.find(otherFromRecipe => fromRecipe.isEqual(otherFromRecipe));
            return matcher !== undefined;
        });
        if (!fromRecipesMatch) {
            return false;
        }

        return super.isEqual(other);
    }
}
