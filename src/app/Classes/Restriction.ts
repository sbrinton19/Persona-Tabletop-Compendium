import { RestrictionType } from '../Enums/RestrictionType';
import { getWeatherName } from '../Enums/Weather';
import { getAvailableWeekDayName } from '../Enums/AvailableWeekDay';
import { getArcanaName } from '../Enums/Arcana';
import { getTraitName } from '../Enums/Trait';

export class Restriction {
    id: number;
    type: RestrictionType;
    value: number;
    secondValue: number;
    negate: boolean;
    bonus: boolean;
    description: string;

    public constructor(id: number, type: RestrictionType, value = -1, secondValue = -1, negate = false, bonus = false, description = '') {
        this.id = id;
        this.type = type;
        this.value = value;
        this.secondValue = secondValue;
        this.negate = negate;
        this.bonus = bonus;
        this.description = description;
    }

    public static copyConstructor(source: Restriction): Restriction {
        return new Restriction(source.id, source.type, source.value, source.secondValue, source.negate, source.bonus, source.description);
    }

    public clone(): Restriction {
        return Restriction.copyConstructor(this);
    }

    public getComposedRestriction(): string {
        let retVal = '';
        if (this.negate) {
            retVal += 'Not available ';
        } else {
            if (this.bonus) {
                retVal += this.description;
            } else {
                retVal += 'Available ';
            }
        }
        switch (this.type) {
            case RestrictionType.Date:
                if (this.value === 0 || this.value === -1) {
                    const month = Math.floor(this.secondValue / 100);
                    const day = this.secondValue % 100;
                    retVal += `before ${month}/${day}`;
                } else if (this.secondValue === 0 || this.secondValue === -1) {
                    const month = Math.floor(this.value / 100);
                    const day = this.value % 100;
                    retVal += `after ${month}/${day}`;
                } else if (this.value === this.secondValue) {
                    const month = Math.floor(this.value / 100);
                    const day = this.value % 100;
                    retVal += `on ${month}/${day}`;
                } else {
                    const month1 = Math.floor(this.value / 100);
                    const day1 = this.value % 100;
                    const month2 = Math.floor(this.secondValue / 100);
                    const day2 = this.secondValue % 100;
                    retVal += `during ${month1}/${day1}-${month2}/${day2}`;
                }
                break;
            case RestrictionType.WeekDay:
                retVal += ` on ${getAvailableWeekDayName(this.value)}`;
                break;
            case RestrictionType.Weather:
                retVal += ` on ${getWeatherName(this.value)} days`;
                break;
            case RestrictionType.Confidant:
                retVal += ` with ${getArcanaName(this.value)} rank ${this.secondValue}`;
                break;
            case RestrictionType.Trait:
                retVal += ` with ${getTraitName(this.value)} rank ${this.secondValue}`;
                break;
        }
        return retVal;
    }

    public isEqual(other: Restriction) {
        if (!other) {
            return false;
        }
        return (this.id === other.id && this.type === other.type && this.value === other.value && this.secondValue === other.secondValue &&
            this.negate === other.negate && this.bonus === other.bonus && this.description === other.description);
    }
}
