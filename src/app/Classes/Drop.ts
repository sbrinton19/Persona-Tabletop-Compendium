export class Drop {
    readonly itemId: number;
    readonly personaId: number;
    readonly low: number;
    readonly high: number;
    readonly isDrop: boolean;

    public constructor(itemid: number, personaid: number, low: number, high: number, isDrop: boolean) {
        this.itemId = itemid;
        this.personaId = personaid;
        this.low = low;
        this.high = high;
        this.isDrop = isDrop;
    }

    public static copyConstructor(source: Drop): Drop {
        return new Drop(source.itemId, source.personaId, source.low, source.high, source.isDrop);
    }

    public clone(): Drop {
        return Drop.copyConstructor(this);
    }

    public isEqual(other: Drop): boolean {
        if (!other) {
            return false;
        }
        return (this.itemId === other.itemId && this.personaId === other.personaId && this.isDrop === other.isDrop && this.low === other.low &&
            this.high === other.high);
    }
}
