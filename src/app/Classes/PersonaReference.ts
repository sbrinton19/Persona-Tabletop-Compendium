import { getArcanaName } from './Arcana';
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
    static copyConstructor(source: PersonaReference): PersonaReference {
        return new PersonaReference(source.personaId, source.personaName, source.level, source.originArcana);
    }
    getArcanaName(): string {
        return getArcanaName(this.originArcana);
    }
}