import { FilterType } from '../Enums/FilterType';

export class TableHeader {
    readonly columnSpan: number;
    readonly rowSpan: number;
    readonly name: string;
    readonly filterType: FilterType;
    readonly fieldName: string;

    constructor(columnSpan: number, rowSpan: number, name: string, filterType: FilterType, fieldName: string) {
        this.columnSpan = columnSpan;
        this.rowSpan = rowSpan;
        this.name = name;
        this.filterType = filterType;
        this.fieldName = fieldName;
    }
}
