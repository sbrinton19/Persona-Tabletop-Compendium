export class Drop {
    readonly itemid: number;
    readonly personaid: number;
    readonly isDrop: boolean;
    readonly low: number;
    readonly high: number;

    public constructor(itemid: number, personaid: number, low: number, high: number, isDrop: boolean) {
        this.itemid = itemid;
        this.personaid = personaid;
        this.low = low;
        this.high = high;
        this.isDrop = isDrop;
    }

    public static copyConstructor(source: Drop): Drop {
        return new Drop(source.itemid, source.personaid, source.low, source.high, source.isDrop);
    }

    public isEqual(other: Drop): boolean {
        if (!other) {
            return false;
        }
        return (this.itemid === other.itemid && this.personaid === other.personaid && this.isDrop === other.isDrop && this.low === other.low &&
            this.high === other.high);
    }
}
