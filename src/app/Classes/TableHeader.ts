import { FilterType } from '../Enums/FilterType';

export class TableHeader {
    readonly columnSpan: number;
    readonly rowSpan: number;
    readonly name: string;
    readonly filterType: FilterType;
    readonly fieldName: string;
    readonly sortable: boolean;
    readonly visibilityClass: string;

    constructor(columnSpan: number, rowSpan: number, name: string, filterType: FilterType, fieldName: string, visibilityClass: string, sortable: boolean) {
        this.columnSpan = columnSpan;
        this.rowSpan = rowSpan;
        this.name = name;
        this.filterType = filterType;
        this.fieldName = fieldName;
        this.visibilityClass = visibilityClass;
        this.sortable = sortable;
    }
}

export class SingleRowTableHeader extends TableHeader {
    readonly inputType: string;

    constructor(name: string, fieldName: string, inputType: string) {
        super(1, 1, name, FilterType.NoFilter, fieldName, '', false);
        this.inputType = inputType;
    }
}

export class EditTableHeader extends SingleRowTableHeader {
    readonly editable: boolean;

    constructor(name: string, fieldName: string, inputType: string, editable: boolean) {
        super(name, fieldName, inputType);
        this.editable = editable;
    }
}
