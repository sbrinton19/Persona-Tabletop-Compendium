export enum RestrictionType {
    Date = 1,
    WeekDay = 2,
    Weather = 4,
    Confidant = 8,
    Trait = 16,
}

export function getRestrictionTypeName(restrictionType: RestrictionType): string {
    switch (restrictionType) {
        case RestrictionType.Date:
        case RestrictionType.WeekDay:
        case RestrictionType.Weather:
        case RestrictionType.Confidant:
        case RestrictionType.Trait:
            return RestrictionType[restrictionType];
    }
}
