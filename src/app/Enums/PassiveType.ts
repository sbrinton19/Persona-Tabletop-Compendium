export enum PassiveType {
    Boost = 0,
    Reduction,
    Dodge,
    Counter,
    Recover,
    Master,
    Kill,
    Post,
    Growth,
    Chain,
    Irregular
}

export function getPassiveTypeName(passiveType: PassiveType) {
    switch (passiveType) {
        case PassiveType.Boost:
        case PassiveType.Reduction:
        case PassiveType.Dodge:
        case PassiveType.Counter:
        case PassiveType.Recover:
        case PassiveType.Master:
        case PassiveType.Kill:
        case PassiveType.Post:
        case PassiveType.Growth:
        case PassiveType.Chain:
        case PassiveType.Irregular:
        default:
            return PassiveType[passiveType];
    }
}
