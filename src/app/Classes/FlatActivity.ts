import { ActivityType, getActivityTypeName } from '../Enums/ActivityType';
import { FullVendor } from './FlatVendor';
import { Restriction } from './Restriction';
import { AvailableTime, getAvailableTimes, getAvailableTimeName } from '../Enums/AvailableTime';
import { getAvailableWeekDays, AvailableWeekDay, getAvailableWeekDayName } from '../Enums/AvailableWeekDay';
import { Trait, getTraitName } from '../Enums/Trait';
import { getArcanaName } from '../Enums/Arcana';
import { Stat, getStatName } from '../Enums/Stat';
import { getLocationName, Location } from '../Enums/Location';

export class FlatActivity {
    id: number;
    name: string;
    location: Location;
    availableTimes: number;
    availableWeekDays: number;
    type: ActivityType;
    value: number;
    secondValue: number;
    description: string;

    public constructor(id: number, name: string, location: Location, availableTimes: number, availableDays: number, type: ActivityType,
        value = -1, secondValue = -1, description = '') {
        this.id = id;
        this.name = name;
        this.location = location;
        this.availableTimes = availableTimes;
        this.availableWeekDays = availableDays;
        this.type = type;
        this.value = value;
        this.secondValue = secondValue;
        this.description = description;
    }

    public static copyConstructor(source: FlatActivity): FlatActivity {
        return new FlatActivity(source.id, source.name, source.location, source.availableTimes, source.availableWeekDays,
            source.type, source.value, source.secondValue, source.description);
    }

    public clone(): FlatActivity {
        return FlatActivity.copyConstructor(this);
    }

    public getLocationName(): string {
        return getLocationName(this.location);
    }

    public getAvailableTimes(): AvailableTime[] {
        return getAvailableTimes(this.availableTimes);
    }

    public getAvailableTimeName(availableTime: AvailableTime): string {
        return getAvailableTimeName(availableTime);
    }

    public getAvailableTimesDisplayString(): string {
        let display = '';
        if (this.availableTimes === AvailableTime.AllDay) {
            return 'All Day';
        }
        const avails = this.getAvailableTimes();
        display += this.getAvailableTimeName(avails[0]);
        if (avails.length < 2) {
            return display;
        }
        for (let i = 1; i < avails.length - 1; i++) {
            display += ', ';
            display += this.getAvailableTimeName(avails[i]);
        }
        display += ', and ';
        display += this.getAvailableTimeName(avails[avails.length - 1]);
        return display;
    }

    public getAvailableWeekDays(): AvailableWeekDay[] {
        return getAvailableWeekDays(this.availableWeekDays);
    }

    public getAvailableWeekDayName(availableWeekDay: AvailableWeekDay): string {
        return getAvailableWeekDayName(availableWeekDay);
    }

    public getAvailableWeekDaysDisplayString(): string {
        let display = '';
        if (this.availableWeekDays === AvailableWeekDay.Any) {
            return 'All Week';
        }
        const avails = this.getAvailableWeekDays();
        display += this.getAvailableWeekDayName(avails[0]);
        if (avails.length < 2) {
            return display;
        }
        for (let i = 1; i < avails.length - 1; i++) {
            display += ', ';
            display += this.getAvailableWeekDayName(avails[i]);
        }
        display += ', and ';
        display += this.getAvailableWeekDayName(avails[avails.length - 1]);
        return display;
    }

    public getTypeName(): string {
        return getActivityTypeName(this.type);
    }

    public getJobDescription(): string {
        return `Earn ${this.secondValue} Zenny${this.value === Trait.None ? '' : ` and +1 ${getTraitName(this.value)}`}`;
    }

    public getTraitBoost(): string {
        return this.secondValue === -1 ? this.description :
            (this.description ? `Gain +${this.secondValue} ${getTraitName(this.value)}; ${this.description}`
            : `Gain +1d${this.secondValue} ${getTraitName(this.value)}`);
    }

    public getConfidantDescription(): string {
        return `Gain affinity with the ${getArcanaName(this.value)} Arcana`;
    }

    public getStatBoost(): string {
        return this.value === Stat.Any ? `${this.description}` : `Gain +1 ${getStatName(this.value)}`;
    }

    public isEqual(other: FlatActivity): boolean {
        if (!other) {
            return false;
        }
        return (this.id === other.id && this.name === other.name && this.type === other.type &&
            this.availableTimes === other.availableTimes && this.availableWeekDays === other.availableWeekDays &&
            this.location === other.location && this.value === other.value && this.secondValue === other.secondValue &&
            this.description === other.description);
    }
}

export class FullActivity extends FlatActivity {
    restrictions: Restriction[];
    vendors: FullVendor[];

    public constructor(id: number, name: string, location: Location, availableTimes: number, availableDays: number, type: ActivityType,
        value: number, secondValue: number, description: string, restrictions: Restriction[], vendorReferences: FullVendor[] = []) {
        super(id, name, location, availableTimes, availableDays, type, value, secondValue, description);
        this.restrictions = restrictions;
        this.vendors = vendorReferences;
    }

    public static copyConstructor(source: FullActivity): FullActivity {
        const realRestrictions: Restriction[] = [];
        source.restrictions.forEach(restriction => {
            realRestrictions.push(Restriction.copyConstructor(restriction));
        });

        const vendorReferences: FullVendor[] = [];
        source.vendors.forEach(vendorRef => vendorReferences.push(FullVendor.copyConstructor(vendorRef)));

        return new FullActivity(source.id, source.name, source.location, source.availableTimes, source.availableWeekDays,
            source.type, source.value, source.secondValue, source.description, realRestrictions, vendorReferences);
    }

    public clone(): FullActivity {
        return FullActivity.copyConstructor(this);
    }

    public isEqual(other: FullActivity): boolean {
        if (!other) {
            return false;
        }

        if (this.restrictions.length !== other.restrictions.length) {
            return false;
        }
        const restrictionsMatch = this.restrictions.every(restriction => {
            const matcher = other.restrictions.find(otherRestriction => restriction.isEqual(otherRestriction));
            return matcher !== undefined;
        });
        if (!restrictionsMatch) {
            return false;
        }

        if (this.vendors.length !== other.vendors.length) {
            return false;
        }
        const vendorsMatch = this.vendors.every(vendorRef => {
            const matcher = other.vendors.find(otherVendorRef => vendorRef.id === otherVendorRef.id);
            return vendorRef.isEqual(matcher);
        });
        if (!vendorsMatch) {
            return false;
        }
        return super.isEqual(other);
    }
}
