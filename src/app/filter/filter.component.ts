import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterPipe } from '../Pipes/filter-pipe';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent<T> implements OnInit {
  @Input() displayList: Array<T>;
  @Input() masterList: Array<T>;

  private _fieldInfo = '';

  @Input()
  set fieldInfo(fieldInfo: string) {
    this._fieldInfo = (fieldInfo && fieldInfo.trim()) || '';
  }

  get fieldInfo(): string { return this._fieldInfo; }

  @Output() filtered: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();

  private readonly filterPipe: FilterPipe = new FilterPipe;
  constructor() { }

  ngOnInit() {
  }

  getFiltered(filter: string): void {
    if (filter === '' && this.displayList.length !== this.masterList.length) {
       this.filtered.emit(this.masterList);
       return;
    }
    // Filters stack
    // this.filtered.emit(this.filterPipe.transform(this.displayList, filter));
    // Filters do not stack
    if (!this.fieldInfo) {
      this.filtered.emit(this.filterPipe.transform(this.masterList, filter));
    } else {
      this.filtered.emit(this.filterPipe.transform(this.masterList, filter, this.fieldInfo));
    }
  }

}
