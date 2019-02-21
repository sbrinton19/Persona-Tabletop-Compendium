export enum AvailableWeekDay {
    None = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 4,
    Thursday = 8,
    Friday = 16,
    Saturday = 32,
    Sunday = 64,
    MonFri = 31,
    Any = 127,
}

const DisplayAvailableWeekDays = [AvailableWeekDay.Monday, AvailableWeekDay.Tuesday, AvailableWeekDay.Wednesday,
    AvailableWeekDay.Thursday, AvailableWeekDay.Friday, AvailableWeekDay.Saturday, AvailableWeekDay.Sunday];

export function getDisplayAvailableWeekDays(): AvailableWeekDay[] {
    return DisplayAvailableWeekDays;
}

export function getAvailableWeekDays(avail: number): AvailableWeekDay[] {
    const availableWeekDays: AvailableWeekDay[] = [];
    for (const available in AvailableWeekDay) {
        if (Number(available)) {
            if ((avail & +available) === +available) {
                availableWeekDays.push(+available);
                avail -= +available;
            }
        }
    }
    if (availableWeekDays.length === 0) {
        availableWeekDays.push(0);
    }
    return availableWeekDays;
}

export function getAvailableWeekDayName(availableWeekDay: AvailableWeekDay): string {
    switch (availableWeekDay) {
        case AvailableWeekDay.Monday:
        case AvailableWeekDay.Tuesday:
        case AvailableWeekDay.Wednesday:
        case AvailableWeekDay.Thursday:
        case AvailableWeekDay.Friday:
        case AvailableWeekDay.Saturday:
        case AvailableWeekDay.Sunday:
            return AvailableWeekDay[availableWeekDay];
    }
}
