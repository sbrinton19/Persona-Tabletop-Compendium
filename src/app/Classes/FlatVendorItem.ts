export class FlatVendorItem {
    readonly id: number;
    readonly vendorId: number;
    readonly itemId: number;
    readonly cost: number;

    public constructor(id: number, vendorId: number, itemId: number, cost: number) {
        this.id = id;
        this.vendorId = vendorId;
        this.itemId = itemId;
        this.cost = cost;
    }

    public static copyConstructor(source: FlatVendorItem): FlatVendorItem {
        return new FlatVendorItem(source.id, source.vendorId, source.itemId, source.cost);
    }

    public isEqual(other: FlatVendorItem) {
        if (!other) {
            return false;
        }
        return (this.id === other.id && this.vendorId === other.vendorId && this.itemId === other.itemId && this.cost === other.cost);
    }
}
