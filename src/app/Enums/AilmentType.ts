export enum AilmentType {
    Sleep = 0,
    Forget,
    Dizzy,
    Hunger,
    Physical,
    Confuse,
    Brainwash,
    Rage,
    Fear,
    Despair,
    Mental,
    Burn,
    Freeze,
    Shock,
    Elemental,
    AllNonSpecial,
    // Special ailments are greather than AllNonSpecial
    Instakill
}

export function getAilmentName(ailmentType: AilmentType): string {
    switch (ailmentType) {
        case AilmentType.Physical:
            return 'Dizzy, Forget, Sleep, & Hunger';
        case AilmentType.Mental:
            return 'Confuse, Fear, Rage, Despair, & Brainwash';
        case AilmentType.Elemental:
            return 'Burn, Freeze, & Shock';
        case AilmentType.AllNonSpecial:
            return 'any non-special ailment';
        case AilmentType.Sleep:
        case AilmentType.Forget:
        case AilmentType.Dizzy:
        case AilmentType.Hunger:
        case AilmentType.Confuse:
        case AilmentType.Brainwash:
        case AilmentType.Rage:
        case AilmentType.Fear:
        case AilmentType.Despair:
        case AilmentType.Burn:
        case AilmentType.Freeze:
        case AilmentType.Shock:
        default:
            return AilmentType[ailmentType];
    }
}
