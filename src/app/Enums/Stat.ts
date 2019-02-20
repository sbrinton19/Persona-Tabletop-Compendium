export enum Stat {
    HP,
    SP,
    Strength,
    Magic,
    Endurance,
    Agility,
    Luck,
    Any
}

export function getStatName(stat: Stat) {
    switch (stat) {
        case Stat.HP:
        case Stat.SP:
        case Stat.Strength:
        case Stat.Magic:
        case Stat.Endurance:
        case Stat.Agility:
        case Stat.Luck:
        default:
            return Stat[stat];
    }
}
