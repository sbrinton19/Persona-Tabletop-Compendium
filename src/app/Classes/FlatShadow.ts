import { FlatSkill } from './FlatSkill';
import { DropReference } from './ItemReference';
import { Arcana, getArcanaName } from '../Enums/Arcana';
import { ElemResist, getElemShort, getElemFull } from '../Enums/ElemResist';
import { FullPersona } from './FlatPersona';

/**
 * This class is a reference-less shadow with the data for the list view display
 */
export class FlatShadow {
    public static STATNAMES: string[] =  ['HP', 'SP', 'Strength', 'Magic', 'Endurance', 'Agility', 'Luck'];
    public static ELEMNAMES: string[] = ['Phys', 'Gun', 'Fire', 'Ice', 'Elec', 'Wind', 'Psy', 'Nuke', 'Bless', 'Curse'];

    id: number;
    personaId: number;
    name: string;
    arcana: Arcana;
    level: number;
    stats: number[];
    elems: ElemResist[];
    maxDamageDice: number;
    damageDie: number;
    note: string;

    public constructor(id: number, personaId: number, name: string, arcana: Arcana, level: number, stats: number[], elems: ElemResist[],
        maxDamageDice: number, damageDie: number, note: string) {
        this.id = id;
        this.personaId = personaId;
        this.name = name;
        this.arcana = arcana;
        this.level = level;
        this.stats = stats;
        this.elems = elems;
        this.maxDamageDice = maxDamageDice;
        this.damageDie = damageDie
        this.note = note;
    }

    public static copyConstructor(source: FlatShadow): FlatShadow {
        return new FlatShadow(source.id, source.personaId, source.name, source.arcana, source.level, source.stats, source.elems,
            source.maxDamageDice, source.damageDie, source.note);
    }

    public validateFields(): boolean {
        if (!this.name) {
            return false;
          }
          if (!this.arcana && this.arcana !== 0) {
            return false;
          }
          if (this.level < 1) {
            return false;
          }
          if (this.stats.some(stat => stat < 1 || !stat)) {
            return false;
          }
          if (this.elems.some(elem => elem < 0 || !elem && elem !== 0)) {
            return false;
          }
          if (this.maxDamageDice < 1 || !this.maxDamageDice) {
            return false;
          }
          if (this.damageDie < 1 || !this.damageDie) {
              return false;
          }
          return true;
    }

    public getFieldByName(fieldName: string, asDisplay = false): any {
        let val: any;
        val = this[fieldName];
        if (val === undefined) {
            const split = fieldName.split('[');
            fieldName = split[0];
            const index = +split[1].charAt(0);
            val = this[fieldName][index];
        }
        if (asDisplay) {
            if (fieldName === 'arcana') {
                return getArcanaName(val);
            } else if (fieldName.indexOf('elem') !== -1) {
                return getElemShort(val);
            }
        }
        return val;
    }

    public getFieldStyle(fieldName: string): string {
        if (fieldName.indexOf('elem') !== -1) {
            const split = fieldName.split('[');
            fieldName = split[0];
            const index = +split[1].charAt(0);
            const val = this[fieldName][index];
            return getElemShort(val);
        }
        return '';
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
            this.level === other.level && this.maxDamageDice == other.maxDamageDice && this.damageDie === other.damageDie && this.note === other.note);
    }
}

/**
 * A complete Shadow with all its references
 */
export class FullShadow extends FlatShadow {
    shadowSkills: FlatSkill[];
    negotiates: DropReference[];
    drops: DropReference[];

    public constructor(id: number, personaId: number, name: string, arcana: Arcana, level: number, stats: number[], elems: ElemResist[],
        maxDamageDice: number, damageDie: number, note: string, shadowSkills: FlatSkill[], negotiates: DropReference[], drops: DropReference[]) {
        super(id, personaId, name, arcana, level, stats, elems, maxDamageDice, damageDie, note);
        this.shadowSkills = shadowSkills;
        this.negotiates = negotiates;
        this.drops = drops;
    }

    public static emptyConstructor() {
        const stats: number[] = [];
        FlatShadow.STATNAMES.forEach(name => stats.push(0));
        const resists: ElemResist[] = [];
        FlatShadow.ELEMNAMES.forEach(name => resists.push(ElemResist.Neutral));
        return new FullShadow(-1, -1, 'New Shadow', Arcana.Fool, 0, stats, resists, 0, 0, '', [], [], []);
    }

    public static copyConstructor(source: FullShadow): FullShadow {
        const skills: FlatSkill[] = [];
        source.shadowSkills.forEach(skill => {
            skills.push(FlatSkill.copyConstructor(skill));
        });

        const negotiates: DropReference[] = [];
        source.negotiates.forEach(negotiate => {
            negotiates.push(DropReference.copyConstructor(negotiate));
        });

        const drops: DropReference[] = [];
        source.drops.forEach(drop => {
            drops.push(DropReference.copyConstructor(drop));
        });

        const stats: number[] = [];
        source.stats.forEach(stat => {
            stats.push(stat);
        });

        const elems: ElemResist[] = [];
        source.elems.forEach(elem => {
            elems.push(elem);
        });

        return new FullShadow(source.id, source.personaId, source.name, source.arcana, source.level, stats, elems,
            source.maxDamageDice, source.damageDie, source.note, skills, negotiates, drops);
    }

    public static fromFullPersona(persona: FullPersona): FullShadow {
        const skills: FlatSkill[] = [];
        persona.skills.forEach(skill => {
            skills.push(FlatSkill.copyConstructor(skill));
        });

        const negotiates: DropReference[] = [];
        persona.negotiates.forEach(negotiate => {
            negotiates.push(DropReference.copyConstructor(negotiate));
        });

        const drops: DropReference[] = [];
        persona.drops.forEach(drop => {
            drops.push(DropReference.copyConstructor(drop));
        });

        return new FullShadow(-1, persona.id, persona.name, persona.arcana, persona.level, persona.stats, persona.elems,
            0, 0, persona.note, skills, negotiates, drops);
    }

    public validateFields(): boolean {
        if (!super.validateFields()) {
            return false;
        }
        if (this.negotiates.some(negot => negot.low < 0 || negot.high < 0 || !negot.low && negot.low !== 0 || !negot.high && negot.high !== 0)) {
            return false;
        }
        if (this.drops.some(drop => drop.low < 0 || drop.high < 0 || !drop.low && drop.low !== 0 || !drop.high && drop.high !== 0)) {
            return false;
        }
        return true;
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

        return super.isEqual(other);
    }
}
