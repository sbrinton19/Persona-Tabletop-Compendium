import { BoundType } from '../Enums/BoundType';

export class BoundRestriction {
    readonly restrictionId: number;
    readonly boundId: number;
    readonly type: BoundType;

    public constructor(restrictionid: number, boundid: number, type: BoundType) {
        this.restrictionId = restrictionid;
        this.boundId = boundid;
        this.type = type;
    }

    public static copyConstructor(source: BoundRestriction): BoundRestriction {
        return new BoundRestriction(source.restrictionId, source.boundId, source.type);
    }

    public isEqual(other: BoundRestriction): boolean {
        if (!other) {
            return false;
        }
        return (this.restrictionId === other.restrictionId && this.boundId === other.boundId &&
            this.type === other.type);
    }
}
