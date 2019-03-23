import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SingleRowTableHeader } from '../Classes/TableHeader';

@Component({
  selector: 'app-splitable-single-row-table',
  templateUrl: './splitable-single-row-table.component.html',
  styleUrls: ['./splitable-single-row-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SplitableSingleRowTableComponent<T> implements OnInit {

  @Input() tableId = '';
  @Input() tableHeaders: SingleRowTableHeader[] = [];
  @Input() isSplitable = true;
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource([]);
  @Input() boundArray: any[];
  @Input() isEdit = false;
  @Input() mobileVisibility = '';
  @Input() desktopVisibility = '';
  @Input() selectOptions: any[] = [];
  @Input() selectFormatFunction: (input: any) => string;

  headerNames: string[] = [];

  constructor() { }

  ngOnInit() {
    this.tableHeaders.forEach(header => this.headerNames.push(header.fieldName));
  }

  getHalfLength(): number {
    return Math.ceil(this.tableHeaders.length/2);
  }

  getFullContext() {
    let ctx = 
    {
      tableId: `full${this.tableId}Table`,
      visibility: this.desktopVisibility,
      start: 0,
      finish: this.tableHeaders.length
    };
    return ctx;
  }

  getSplit1Context() {
    let ctx = 
    {
      tableId: `split${this.tableId}1`,
      visibility: this.mobileVisibility,
      start: 0,
      finish: this.getHalfLength()
    };
    return ctx;
  }

  getSplit2Context() {
    let ctx = 
    {
      tableId: `split${this.tableId}2`,
      visibility: this.mobileVisibility,
      start: this.getHalfLength(),
      finish: this.tableHeaders.length
    };
    return ctx;
  }
}
