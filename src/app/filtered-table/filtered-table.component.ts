import { Component, OnInit, Input, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { TableHeader } from '../Classes/TableHeader';
import { FilterType } from '../Enums/FilterType';
import { FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-filtered-table',
  templateUrl: './filtered-table.component.html',
  styleUrls: ['./filtered-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilteredTableComponent<T> implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  @Input() tableId = '';
  @Input() tableHeaders: TableHeader[] = [];
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource([]);
  @Input() routerLinkName = '';
  @Input() routerLinkValue = '';
  @Input() routerLinkClass = '';
  @Input() selectOptions: Map<string, [string, any][]> = null;

  readonly FilterType = FilterType;
  filterControls: FormControl[] = [];
  headerNames: string[] = [];
  filterNames: string[] = [];
  subscriptions: SubscriptionLike[] = [];
  filterObject = {};

  constructor() { }

  ngOnInit() {
    this.tableHeaders.forEach((header, index) => {
      this.headerNames.push(header.fieldName);
      if (header.filterType !== FilterType.NoFilter) {
        this.filterNames.push(header.fieldName + 'Filter');
        if (header.filterType === FilterType.StringFilter) {
          this.filterControls[index] = new FormControl();
          this.subscriptions.push(
            this.filterControls[index].valueChanges.subscribe(string => {
              this.filterObject[this.headerNames[index]] = [string, header.filterType];
              this.dataSource.filter = JSON.stringify(this.filterObject);
            })
          );
        } else if (header.filterType === FilterType.SelectFilter || header.filterType === FilterType.FlagSelectFilter) {
          this.filterControls[index] = new FormControl(this.selectOptions.get(header.fieldName)[0][1]);
          this.filterControls[index].valueChanges.subscribe(val => {
            this.filterObject[this.headerNames[index]] = [val, header.filterType];
            this.dataSource.filter = JSON.stringify(this.filterObject);
          });
        }
      }
    });
    this.dataSource.filterPredicate = this.tableFilter;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.getFieldByName;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  tableFilter(data: T, filter: string): boolean {
    const filterObj = JSON.parse(filter);
    for (const field in filterObj) {
      const filterPair = filterObj[field];
      const filterValue = filterPair[0];
      const filterType: FilterType = filterPair[1];
      const value = (data as any).getFieldByName(field);
      if (filterType === FilterType.StringFilter) {
        if ((value as string).toLowerCase().indexOf(filterValue.toLowerCase()) === -1) {
          return false;
        }
      } else if (filterType === FilterType.SelectFilter) {
        if (value !== filterValue && filterValue !== -1) {
          return false;
        }
      } else if (filterType === FilterType.FlagSelectFilter) {
        if (filterValue !== -1 && ((value & filterValue) !== filterValue || (filterValue !== value && filterValue === 0))) {
          return false;
        }
      }
    }
    return true;
  }

  getPath(item: T): string {
    return `/${this.routerLinkClass}/${this.getFieldByName(item, this.routerLinkValue)}`;
  }

  getFieldByName(data: T, fieldName: string, asDisplay = false): any {
    return (data as any).getFieldByName(fieldName, asDisplay);
  }

  getFieldStyle(data: T, fieldName: string): string {
    return (data as any).getFieldStyle(fieldName);
  }
}
