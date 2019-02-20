import { BoundType } from '../Enums/BoundType';

export class BoundRestriction {
    readonly restrictionid: number;
    readonly boundid: number;
    readonly type: BoundType;

    public constructor(restrictionid: number, boundid: number, type: BoundType) {
        this.restrictionid = restrictionid;
        this.boundid = boundid;
        this.type = type;
    }

    public static copyConstructor(source: BoundRestriction): BoundRestriction {
        return new BoundRestriction(source.restrictionid, source.boundid, source.type);
    }

    public isEqual(other: BoundRestriction): boolean {
        if (!other) {
            return false;
        }
        return (this.restrictionid === other.restrictionid && this.boundid === other.boundid &&
            this.type === other.type);
    }
}
