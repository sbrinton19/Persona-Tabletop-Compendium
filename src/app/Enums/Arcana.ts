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

const DisplayArcana = [Arcana.Fool, Arcana.Magician, Arcana.Priestess, Arcana.Empress, Arcana.Emperor,
    Arcana.Hierophant, Arcana.Lovers, Arcana.Chariot, Arcana.Strength, Arcana.Hermit, Arcana.Fortune,
    Arcana.Judgement, Arcana.Hanged, Arcana.Death, Arcana.Temperance, Arcana.Devil, Arcana.Tower,
    Arcana.Star, Arcana.Moon, Arcana.Sun, Arcana.Judgement];

export function getDisplayArcana(): Arcana[] {
    return DisplayArcana;
}

export function getArcanaName(arcana: Arcana): string {
    switch (arcana) {
        case Arcana.Priestess:
            return 'High Priestess';
        case Arcana.Hanged:
            return 'Hanged Man';
        case Arcana.Fortune:
            return 'Wheel of Fortune';
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
        default:
            return Arcana[arcana];
    }
}
