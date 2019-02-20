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

export function getAsStatName(masterType: MasterType) {
    switch (masterType) {
        case MasterType.Tarukaja:
            return 'Strength';
        case MasterType.Rakukaja:
            return 'Endurance';
        case MasterType.Sukukaja:
            return 'Agility';
        case MasterType.HP:
        case MasterType.SP:
        default:
            return MasterType[masterType];
    }
}
