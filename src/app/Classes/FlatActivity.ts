import { ActivityType, getActivityTypeName } from '../Enums/ActivityType';
import { FullVendor } from './FlatVendor';
import { Restriction } from './Restriction';
import { AvailableTime, getAvailableTimes, getAvailableTimeName } from '../Enums/AvailableTime';
import { getAvailableWeekDays, AvailableWeekDay, getAvailableWeekDayName } from '../Enums/AvailableWeekDay';
import { Trait, getTraitName } from '../Enums/Trait';
import { getArcanaName } from '../Enums/Arcana';
import { Stat, getStatName } from '../Enums/Stat';

export class FlatActivity {
    id: number;
    activityName: string;
    locationName: string;
    availableTimes: number;
    availableWeekDays: number;
    type: ActivityType;
    value: number;
    secondValue: number;
    description: string;

    public constructor(id: number, activityName: string, locationName: string, availableTimes: number, availableDays: number, type: ActivityType,
        value = -1, secondValue = -1, description = '') {
        this.id = id;
        this.activityName = activityName;
        this.locationName = locationName;
        this.availableTimes = availableTimes;
        this.availableWeekDays = availableDays;
        this.type = type;
        this.value = value;
        this.secondValue = secondValue;
        this.description = description;
    }

    public static copyConstructor(source: FlatActivity): FlatActivity {
        return new FlatActivity(source.id, source.activityName, source.locationName, source.availableTimes, source.availableWeekDays,
            source.type, source.value, source.secondValue, source.description);
    }

    public getTypeName(): string {
        return getActivityTypeName(this.type);
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

    public isShopping() {
        return this.type === ActivityType.Shopping;
    }

    public isJob() {
        return this.type === ActivityType.Job;
    }

    public getJobDescription() {
        return `Earn ${this.secondValue} Zenny${this.value === Trait.None ? '' : ` and +1 ${getTraitName(this.value)}`}`;
    }

    public isMinigame() {
        return this.type === ActivityType.Minigame;
    }

    public isTraitBoost() {
        return this.type === ActivityType.TraitBoost;
    }

    public getTraitBoost() {
        return this.secondValue === -1 ? this.description :
            (this.description ? `Gain +${this.secondValue} ${getTraitName(this.value)}; ${this.description}`
            : `Gain +1d${this.secondValue} ${getTraitName(this.value)}`);
    }

    public isConfidant() {
        return this.type === ActivityType.Confidant;
    }

    public getConfidantDescription() {
        return `Gain affinity with the ${getArcanaName(this.value)} Arcana`;
    }

    public isStatBoost() {
        return this.type === ActivityType.StatBoost;
    }

    public getStatBoost() {
        return this.value === Stat.Any ? `${this.description}` : `Gain +1 ${getStatName(this.value)}`;
    }

    public isEqual(other: FlatActivity): boolean {
        if (!other) {
            return false;
        }
        return (this.id === other.id && this.activityName === other.activityName && this.type === other.type &&
            this.availableTimes === other.availableTimes && this.availableWeekDays === other.availableWeekDays &&
            this.locationName === other.locationName && this.value === other.value && this.secondValue === other.secondValue &&
            this.description === other.description);
    }
}

export class FullActivity extends FlatActivity {
    restrictions: Restriction[];
    vendors: FullVendor[];
    public constructor(id: number, activityName: string, locationName: string, availableTimes: number, availableDays: number, type: ActivityType,
        value: number, secondValue: number, description: string, restrictions: Restriction[], vendorReferences: FullVendor[] = []) {
        super(id, activityName, locationName, availableTimes, availableDays, type, value, secondValue, description);
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
        return new FullActivity(source.id, source.activityName, source.locationName, source.availableTimes, source.availableWeekDays,
            source.type, source.value, source.secondValue, source.description, realRestrictions, vendorReferences);
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
