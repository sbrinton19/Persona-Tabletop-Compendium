import { Restriction } from './Restriction';

export class ItemReference {
    readonly id: number;
    readonly name: string;

    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public static copyConstructor(source: ItemReference): ItemReference {
        return new ItemReference(source.id, source.name);
    }

    public clone(): ItemReference {
        return ItemReference.copyConstructor(this);
    }

    public isEqual(other: ItemReference) {
        if (!other) {
            return false;
        }
        return (this.id === other.id && this.name === other.name);
    }
}

export class VendorItemReference extends ItemReference {
    // VendorItemReference is unique in that id & name
    // could be for a vendor or an item depending on what
    // is the owner of the reference
    readonly cost: number;
    restrictions: Restriction[];

    public constructor(id: number, name: string, cost: number, restrictions: Restriction[]) {
        super(id, name);
        this.cost = cost;
        this.restrictions = restrictions;
    }

    public static copyConstructor(source: VendorItemReference): VendorItemReference {
        const realRestrict: Restriction[] = [];
        source.restrictions.forEach(rest => realRestrict.push(Restriction.copyConstructor(rest)));

        return new VendorItemReference(source.id, source.name, source.cost, realRestrict);
    }

    public clone(): VendorItemReference {
        return VendorItemReference.copyConstructor(this);
    }

    public isEqual(other: VendorItemReference) {
        if (!other) {
            return false;
        }

        if (this.restrictions.length !== other.restrictions.length) {
            return false;
        }
        const sourcesMatch = this.restrictions.every(source => {
            const matcher = other.restrictions.find(otherSource => source.isEqual(otherSource));
            return matcher !== undefined;
        });
        if (!sourcesMatch) {
            return false;
        }

        return (super.isEqual(other) && this.cost === other.cost);
    }
}

export class DropReference extends ItemReference {
    readonly low: number;
    readonly high: number;

    public constructor(id: number, name: string, low: number, high: number) {
        super(id, name);
        this.low = low;
        this.high = high;
    }

    public static copyConstructor(source: DropReference): DropReference {
        return new DropReference(source.id, source.name, source.low, source.high);
    }

    public getFieldByName(fieldName: string, asDisplay = false): any {
        let val: any;
        val = this[fieldName];
        if (asDisplay) {
            if (fieldName === 'roll') {
                return this.getRollWinDisplay();
            }
        }
        return val;
    }

    public getFieldStyle(fieldName: string) {
        return '';
    }

    public clone(): DropReference {
        return DropReference.copyConstructor(this);
    }

    public getRollWinDisplay(): string {
        if (this.id === 0 || this.high === 0 && this.low === 0) {
            return 'All';
        } else {
            if (this.low === this.high) {
                return `${this.high}`;
            } else {
                return `${this.low}-${this.high}`;
            }
        }
    }

    public isEqual(other: DropReference) {
        if (!other) {
            return false;
        }
        return (super.isEqual(other) && this.low ===  other.low && this.high === other.high);
    }
}
