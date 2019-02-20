export enum RecoveryType {
    HP = 1,
    SP = 2,
    HPSP = 3,
    Ailment = 4
}

export function getRecoveryTypeName(recoveryType: RecoveryType): string {
    switch (recoveryType) {
        case RecoveryType.HPSP:
            return 'HP & SP';
        case RecoveryType.HP:
        case RecoveryType.SP:
        case RecoveryType.Ailment:
            return RecoveryType[recoveryType];
    }
}

export function getRecoveryTypeFormatstring(recoveryType: RecoveryType): string {
    switch (recoveryType) {
        case RecoveryType.HP:
            return '% max health';
        case RecoveryType.SP:
            return 'SP';
        case RecoveryType.HPSP:
            return '';
        case RecoveryType.Ailment:
            return 'Ailments last';
    }
}
