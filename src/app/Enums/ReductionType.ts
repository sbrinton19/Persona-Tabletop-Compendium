export enum ReductionType {
    Special = 0,
    ResistElement = 1,
    ResistAilment,
    NullElement,
    NullAilment,
    Repel,
    Absorb
}

export function getReductionTypeName(reductionType: ReductionType) {
    switch (reductionType) {
        case ReductionType.ResistElement:
            return 'Resist Element';
        case ReductionType.ResistAilment:
            return 'Resist Ailment';
        case ReductionType.NullElement:
            return 'Null Element';
        case ReductionType.NullAilment:
            return 'Null Ailment';
        case ReductionType.Repel:
            return 'Repel';
        case ReductionType.ResistElement:
            return 'Absorb';
        case ReductionType.Special:
        default:
            return ReductionType[reductionType];
    }
}
