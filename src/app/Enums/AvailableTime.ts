export enum AvailableTime {
    None = 0,
    AllDay = 127,
    EarlyMorning = 1,
    Morning = 2,
    Midday = 4,
    Afternoon = 8,
    Evening = 16,
    Night = 32,
    LateNight = 64,
}

export function getAvailableTimes(avail: number): AvailableTime[] {
    const availTimes: AvailableTime[] = [];
    for (const available in AvailableTime) {
        if (Number(available)) {
            if ((avail & +available) === +available) {
                availTimes.push(+available);
                avail -= +available;
            }
        }
    }
    if (availTimes.length === 0) {
        availTimes.push(0);
    }
    return availTimes;
}

export function getAvailableTimeName(availableTime: AvailableTime): string {
    switch (availableTime) {
        case AvailableTime.AllDay:
            return 'All Day';
        case AvailableTime.EarlyMorning:
            return 'Early Morning';
        case AvailableTime.LateNight:
            return 'Late Night';
        case AvailableTime.Morning:
        case AvailableTime.Midday:
        case AvailableTime.Afternoon:
        case AvailableTime.Evening:
        case AvailableTime.Night:
            return AvailableTime[availableTime];
    }
}
