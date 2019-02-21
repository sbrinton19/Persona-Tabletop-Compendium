export enum ActivityType {
    Shopping = 1,
    Job = 2,
    Minigame = 4,
    TraitBoost = 8,
    Confidant = 16,
    StatBoost = 32,
}

const DisplayActivityTypes = [ActivityType.Shopping, ActivityType.Job, ActivityType.Minigame,
    ActivityType.TraitBoost, ActivityType.Confidant, ActivityType.StatBoost];

export function getDisplayActivityTypes(): ActivityType[] {
    return DisplayActivityTypes;
}

export function getActivityTypeName(activityType: ActivityType): string {
    switch (activityType) {
        case ActivityType.TraitBoost:
            return 'Trait Boost';
        case ActivityType.StatBoost:
            return 'Stat Boost';
        case ActivityType.Shopping:
        case ActivityType.Job:
        case ActivityType.Minigame:
        case ActivityType.Confidant:
            return ActivityType[activityType];
    }
}
