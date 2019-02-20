export enum Trait {
    None,
    Charm,
    Kindness,
    Knowledge,
    Guts,
    Skill,
    Any
}

export function getTraitName(trait: Trait): string {
    switch (trait) {
        case Trait.Any:
            return 'Any Trait';
        case Trait.None:
        case Trait.Charm:
        case Trait.Kindness:
        case Trait.Knowledge:
        case Trait.Guts:
        case Trait.Skill:
            return Trait[trait];
    }
}
