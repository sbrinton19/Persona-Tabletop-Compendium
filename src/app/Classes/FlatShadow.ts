import { LeveledSkill, PersonaSkill, FlatSkill } from './FlatSkill';
import { ItemReference, DropReference } from './ItemReference';
import { Arcana, getArcanaName } from '../Enums/Arcana';
import { ElemResist, getElemShort, getElemFull } from '../Enums/ElemResist';

/**
 * This class is a reference-less shadow with the data for the list view display
 */
export class FlatShadow {
    public static STATNAMES: string[] =  ['HP', 'SP', 'Strength', 'Magic', 'Endurance', 'Agility', 'Luck'];
    public static ELEMNAMES: string[] = ['Phys', 'Gun', 'Fire', 'Ice', 'Elec', 'Wind', 'Psy', 'Nuke', 'Bless', 'Curse'];

    readonly id: number;
    personaId: number;
    name: string;
    arcana: Arcana;
    level: number;
    stats: number[];
    elems: ElemResist[];
    note: string;

    public constructor(id: number, personaId: number, name: string, arcana: Arcana, level: number, stats: number[], elems: ElemResist[], note: string) {
        this.id = id;
        this.personaId = personaId;
        this.name = name;
        this.arcana = arcana;
        this.level = level;
        this.stats = stats;
        this.elems = elems;
        this.note = note;
    }

    public static copyConstructor(source: FlatShadow): FlatShadow {
        return new FlatShadow(source.id, source.personaId, source.name, source.arcana, source.level, source.stats, source.elems, source.note);
    }

    public clone(): FlatShadow {
        return FlatShadow.copyConstructor(this);
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

    public isEqual(other: FlatShadow): boolean {
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

        return (this.id === other.id && this.personaId === other.personaId && this.name === other.name && this.arcana === other.arcana &&
            this.level === other.level && this.note === other.note);
    }
}

/**
 * A complete Shadow with all its references
 */
export class FullShadow extends FlatShadow {
    shadowSkills: FlatSkill[];
    public constructor(id: number, personaId: number, name: string, arcana: Arcana, level: number, stats: number[], elems: ElemResist[], note: string,
        shadowSkills: FlatSkill[]) {
        super(id, personaId, name, arcana, level, stats, elems, note);
        this.shadowSkills = shadowSkills;
    }

    public static emptyConstructor() {
        const stats: number[] = [];
        FlatShadow.STATNAMES.forEach(name => stats.push(0));
        const resists: ElemResist[] = [];
        FlatShadow.ELEMNAMES.forEach(name => resists.push(ElemResist.Neutral));
        return new FullShadow(-1, -1, 'New Shadow', Arcana.Fool, 0, stats, resists, '', []);
    }

    public static copyConstructor(source: FullShadow): FullShadow {
        const skills: FlatSkill[] = [];
        source.shadowSkills.forEach(skill => {
            skills.push(FlatSkill.copyConstructor(skill));
        });
        /*
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
        });*/

        return new FullShadow(source.id, source.personaId, source.name, source.arcana, source.level, source.stats, source.elems, source.note, skills);
    }

    public clone(): FullShadow {
        return FullShadow.copyConstructor(this);
    }

    public isEqual(other: FullShadow) {
        if (!other) {
            return false;
        }

        if (this.shadowSkills.length !== other.shadowSkills.length) {
            return false;
        }
        const skillMatch = this.shadowSkills.every(skill => {
            const matcher = other.shadowSkills.find(otherSkill => skill.isEqual(otherSkill));
            return matcher !== undefined;
        });
        if (!skillMatch) {
            return false;
        }

        /*if (this.drops.length !== other.drops.length) {
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
        }*/

        return super.isEqual(other);
    }
}
