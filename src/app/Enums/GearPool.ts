export enum GearPool {
    Reveler = 1,
    Shouzoku,
    Prisoner,
    Uniform,
    Patient,
    Scrubs,
    Student,
    Gown,
    Servant,
    Tuxedo,
    Slave,
    Ancient,
    Spirit,
    Desecrated
}

export function getGearPoolName(gearPoolEnum: GearPool): string {
    switch (gearPoolEnum) {
        case GearPool.Reveler:
            return 'Reveler\'s Clothing';
        case GearPool.Shouzoku:
            return 'Burned Shozoku';
        case GearPool.Prisoner:
            return 'Prisoner\'s Jumpsuit';
        case GearPool.Uniform:
            return 'Grimy Guard Uniform';
        case GearPool.Patient:
            return 'Patient\'s Gown';
        case GearPool.Scrubs:
            return 'Bloodstained Scrubs';
        case GearPool.Student:
            return 'Student\'s Uniform';
        case GearPool.Gown:
            return 'Sticky Gown';
        case GearPool.Servant:
            return 'Servant\'s Clothes';
        case GearPool.Tuxedo:
            return 'Smokestained Tuxedo';
        case GearPool.Slave:
            return 'Slave\'s Rags';
        case GearPool.Ancient:
            return 'Ancient Armor';
        case GearPool.Spirit:
            return 'Spirit\'s Robe';
        case GearPool.Desecrated:
            return 'Desecrated Armor';
    }
}
