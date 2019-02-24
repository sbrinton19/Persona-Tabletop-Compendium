import { PersonaReference } from './PersonaReference';
export class Recipe {
    readonly sources: PersonaReference[];
    readonly result: PersonaReference;
    readonly cost: number;

    public constructor(sources: PersonaReference[], result: PersonaReference, cost: number) {
        this.sources = sources;
        this.result = result;
        this.cost = cost;
    }

    public static copyConstructor(source: Recipe): Recipe {
        const newSources: PersonaReference[] = [];
        source.sources.forEach(pSource => newSources.push(PersonaReference.copyConstructor(pSource)));
        return new Recipe(newSources, PersonaReference.copyConstructor(source.result), source.cost);
    }

    public clone(): Recipe {
        return Recipe.copyConstructor(this);
    }

    public isEqual(other: Recipe) {
        if (!other) {
            return false;
        }

        if (this.sources.length !== other.sources.length) {
            return false;
        }
        const sourcesMatch = this.sources.every(source => {
            const matcher = other.sources.find(otherSource => source.isEqual(otherSource));
            return matcher !== undefined;
        });
        if (!sourcesMatch) {
            return false;
        }

        return (this.result.isEqual(other.result) && this.cost === other.cost);
    }
}
