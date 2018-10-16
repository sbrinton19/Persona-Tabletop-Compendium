export class ItemReference {
    readonly id: number;
    readonly name: String;

    public constructor(id: number, name: String) {
        this.id = id;
        this.name = name;
    }

    public static copyConstructor(source: ItemReference): ItemReference {
        return new ItemReference(source.id, source.name);
    }

    public isEqual(other: ItemReference) {
        if (!other) {
            return false;
        }
        return (this.id === other.id && this.name === other.name);
    }
}

export class DropReference extends ItemReference {
    readonly low: number;
    readonly high: number;

    public constructor(id: number, name: String, low: number, high: number) {
        super(id, name);
        this.low = low;
        this.high = high;
    }

    public static copyConstructor(source: DropReference): DropReference {
        return new DropReference(source.id, source.name, source.low, source.high);
    }

    public getRollWinDisplay(): String {
        if (this.id !== 0) {
            if (this.low === this.high) {
                return `${this.high}`;
            } else {
                return `${this.low}-${this.high}`;
            }
        } else {
            return 'All';
        }
    }

    public isEqual(other: DropReference) {
        if (!other) {
            return false;
        }
        return (super.isEqual(other) && this.low ===  other.low && this.high === other.high);
    }
}
