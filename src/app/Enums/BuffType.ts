export enum BuffType {
    Attack = 0,
    Defense,
    Agility,
    TripleStat,
    CritMod,
    CritBonus,
    Crit
}

export function getBuffTypeName(buffType: BuffType): string {
    switch (buffType) {
        case BuffType.Attack:
            return 'Damage';
        case BuffType.Defense:
            return 'Damage Reduction';
        case BuffType.Agility:
            return 'AGI Bonus';
        case BuffType.TripleStat:
            return 'Damage, Damage Reduction, & AGI Bonus';
        case BuffType.CritMod:
            return 'Crit Mod';
        case BuffType.CritBonus:
            return 'Crit Bonus';
        case BuffType.Crit:
            return 'Crit Mod & Bonus';
    }
}
