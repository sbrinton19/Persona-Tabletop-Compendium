export enum BoostType {
    Boost = 25,
    Amp = 50,
    Ailment = 2,
    Special = 0
}

export function getBoostTypeName(boostType: BoostType) {
    switch (boostType) {
        case BoostType.Boost:
        case BoostType.Amp:
        case BoostType.Ailment:
        default:
            return BoostType[boostType];
    }
}
