import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
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
export class EditableTableComponent<T, U> implements OnInit, OnDestroy {

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

  headerNames: string[] = [];
  masterSelector: FormControl = new FormControl();
  private subscription: SubscriptionLike;

  constructor() { }

  ngOnInit() {
    this.tableHeaders.forEach(header => this.headerNames.push(header.fieldName));
    this.subscription = this.masterSelector.valueChanges.subscribe(values => {
      this.boundArray = this.typeConversion(values, this.boundArray);
      this.dataSource.data = this.boundArray;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getFieldByName(data: U, fieldName: string, asDisplay: boolean) {
    return (data as any).getFieldByName(fieldName, asDisplay);
  }

  getPath(item: U): string {
    return `/${this.routerLinkClass}/${this.getFieldByName(item, this.routerLinkValue, false)}`;
  }
}
