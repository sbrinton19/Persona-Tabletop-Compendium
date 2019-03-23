export class Drop {
    readonly itemId: number;
    readonly sourceId: number;
    readonly low: number;
    readonly high: number;
    readonly isDrop: boolean;
    readonly isPersona: boolean;

    public constructor(itemid: number, sourceId: number, low: number, high: number, isDrop: boolean, isPersona: boolean) {
        this.itemId = itemid;
        this.sourceId = sourceId;
        this.low = low;
        this.high = high;
        this.isDrop = isDrop;
        this.isPersona = isPersona;
    }

    public static copyConstructor(source: Drop): Drop {
        return new Drop(source.itemId, source.sourceId, source.low, source.high, source.isDrop, source.isPersona);
    }

    public clone(): Drop {
        return Drop.copyConstructor(this);
    }

    public isEqual(other: Drop): boolean {
        if (!other) {
            return false;
        }
        return (this.itemId === other.itemId && this.sourceId === other.sourceId && this.isDrop === other.isDrop && this.low === other.low &&
            this.high === other.high && this.isPersona === other.isPersona);
    }
}
