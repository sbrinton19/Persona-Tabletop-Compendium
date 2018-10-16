import { getArcanaName } from '../Enums/Arcana';
export class PersonaReference {
    readonly personaId: number;
    readonly personaName: string;
    readonly level: number;
    readonly originArcana: number;
    constructor(id: number, name: string, level: number, originArcana: number) {
        this.personaId = id;
        this.personaName = name;
        this.level = level;
        this.originArcana = originArcana;
    }

    public static copyConstructor(source: PersonaReference): PersonaReference {
        return new PersonaReference(source.personaId, source.personaName, source.level, source.originArcana);
    }

    public getArcanaName(): string {
        return getArcanaName(this.originArcana);
    }

    public isEqual(other: PersonaReference): boolean {
        if (!other) {
            return false;
        }
        return (this.personaId === other.personaId && this.personaName === other.personaName && this.level === other.level &&
            this.originArcana === other.originArcana);
    }
}
