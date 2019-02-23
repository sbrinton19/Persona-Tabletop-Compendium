import { getArcanaName } from '../Enums/Arcana';
export class PersonaReference {
    readonly id: number;
    readonly name: string;
    readonly level: number;
    readonly arcana: number;
    constructor(id: number, name: string, level: number, originArcana: number) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.arcana = originArcana;
    }

    public static copyConstructor(source: PersonaReference): PersonaReference {
        if (!source) {
            return null;
        }
        return new PersonaReference(source.id, source.name, source.level, source.arcana);
    }

    public getArcanaName(): string {
        return getArcanaName(this.arcana);
    }

    public isEqual(other: PersonaReference): boolean {
        if (!other) {
            return false;
        }
        return (this.id === other.id && this.name === other.name && this.level === other.level &&
            this.arcana === other.arcana);
    }
}
