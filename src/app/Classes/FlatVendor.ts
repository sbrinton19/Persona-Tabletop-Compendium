import { VendorItemReference } from './ItemReference';

export class FlatVendor {
    id: number;
    name: string;
    activityId: number;

    public constructor(id: number, name: string, activityId = 0) {
        this.id = id;
        this.name = name;
        this.activityId = activityId;
    }

    public static copyConstructor(source: FlatVendor): FlatVendor {
        return new FlatVendor(source.id, source.name, source.activityId);
    }

    public clone(): FlatVendor {
        return FlatVendor.copyConstructor(this);
    }

    public isEqual(other: FlatVendor): boolean {
        if (!other) {
            return false;
        }
        return (this.id === other.id && this.name === other.name && this.activityId === other.activityId);
    }
}

export class FullVendor extends FlatVendor {
    vendorItems: VendorItemReference[];

    public constructor(id: number, name: string, activityId = 0, vendorItems: VendorItemReference[] = []) {
        super(id, name, activityId);
        this.vendorItems = vendorItems;
    }

    public static copyConstructor(source: FullVendor): FullVendor {
        const realVendorItems: VendorItemReference[] = [];
        source.vendorItems.forEach(vendItem => realVendorItems.push(VendorItemReference.copyConstructor(vendItem)));

        return new FullVendor(source.id, source.name, source.activityId, realVendorItems);
    }

    public clone(): FullVendor {
        return FullVendor.copyConstructor(this);
    }

    public isEqual(other: FullVendor): boolean {
        if (!other) {
            return false;
        }

        if (this.vendorItems.length !== other.vendorItems.length) {
            return false;
        }
        const sourcesMatch = this.vendorItems.every(source => {
            const matcher = other.vendorItems.find(otherSource => source.id === otherSource.id);
            return source.isEqual(matcher);
        });
        if (!sourcesMatch) {
            return false;
        }

        return (super.isEqual(other));
    }
}
