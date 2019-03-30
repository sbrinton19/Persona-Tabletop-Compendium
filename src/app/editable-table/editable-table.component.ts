import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { EditTableHeader } from '../Classes/TableHeader';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableTableComponent<T, U> implements OnInit, OnDestroy, OnChanges {
  @Input() id = '';
  @Input() selectRows = false;
  @Input() displayField = 'name';
  @Input() routerLinkValue = '';
  @Input() routerLinkClass = '';
  @Input() masterList: T[] = [];
  @Input() tableHeaders: EditTableHeader[] = [];
  @Input() dataSource: MatTableDataSource<U> = new MatTableDataSource([]);
  @Input() selectOptions: Map<string, [string, any][]> = null;
  @Input() boundArray: U[] = [];
  @Input() typeConversion: (input: T[], oldValues: U[]) => U[];
  @Input() typeComparator: (tType: T, uType: U) => boolean;

  headerNames: string[] = [];
  masterSelector: FormControl = new FormControl();
  private subscription: SubscriptionLike;

  constructor() { }

  ngOnInit() {
    this.updateSelector();
    this.tableHeaders.forEach(header => this.headerNames.push(header.fieldName));
    this.subscription = this.masterSelector.valueChanges.subscribe(values => {
      const temp = this.typeConversion(values, this.boundArray);
      this.boundArray.splice(0);
      this.boundArray.push(...temp);
      this.dataSource.data = this.boundArray;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.boundArray || changes.selectRows) {
      this.updateSelector();
    }
  }

  getFieldByName(data: U, fieldName: string, asDisplay: boolean) {
    return (data as any).getFieldByName(fieldName, asDisplay);
  }

  getPath(item: U): string {
    return `/${this.routerLinkClass}/${this.getFieldByName(item, this.routerLinkValue, false)}`;
  }

  private updateSelector(): void {
    const values = [];
    this.boundArray.forEach(bound => {
      values.push(this.masterList.find(mItem => this.typeComparator(mItem, bound)));
    });
    this.masterSelector.setValue(values);
  }
}
