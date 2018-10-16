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
