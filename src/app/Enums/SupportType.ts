export enum SupportType {
    Lower,
    Increase,
    Wall,
    Break,
    SpecialBuff
}

export function getSupportTypeDisplayName(supportType: SupportType) {
    switch (supportType) {
        case SupportType.Lower:
            return 'Debuff';
        case SupportType.Increase:
            return 'Buff';
        case SupportType.SpecialBuff:
            return 'Special';
        case SupportType.Wall:
        case SupportType.Break:
        default:
            return SupportType[supportType];
    }
}
