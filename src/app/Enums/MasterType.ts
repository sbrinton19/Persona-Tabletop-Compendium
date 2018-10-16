export enum MasterType {
    Tarukaja = 2,
    Rakukaja = 4,
    Sukukaja = 6,
    HP = 1,
    SP = 3
}

export function getMasterTypeName(masterType: MasterType) {
    switch (masterType) {
        case MasterType.Tarukaja:
        case MasterType.Rakukaja:
        case MasterType.Sukukaja:
        case MasterType.HP:
        case MasterType.SP:
        default:
            return MasterType[masterType];
    }
}
