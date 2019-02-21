import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FilterPipe } from '../Pipes/filter-pipe';

@Component({
  selector: 'app-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.css']
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

  private _reapply = false;

  @Input()
  set reapply(reapply: boolean) {
      // Using this property as a notifier
      this.getFiltered(this.filterString, false);
  }

  get reapply(): boolean { return this._reapply; }

  @Output() filtered: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();

  private readonly filterPipe: FilterPipe = new FilterPipe;
  private filterString = '';
  constructor() { }

  ngOnInit() {
  }

  getFiltered(filter: string, ignoreFilter = true): void {
    if (ignoreFilter && this.filterString === filter) {
      // We haven't changed the filter and we aren't doing a reapply so ignore it
      return;
    }
    this.filterString = filter;
    if (filter === '' && this.displayList.length !== this.masterList.length) {
      if (this.masterList.length) {
        this.filtered.emit(this.masterList);
        return;
      }
    }
    // Filters stack
    // this.filtered.emit(this.filterPipe.transform(this.displayList, filter));
    // Filters do not stack
    if (!this._fieldInfo) {
      this.filtered.emit(this.filterPipe.transform(this.masterList, filter));
    } else if (this.masterList.length) {
      this.filtered.emit(this.filterPipe.transform(this.masterList, filter, this._fieldInfo));
    } else {
      this.filtered.emit(this.filterPipe.transform(this.displayList, filter, this._fieldInfo, true));
    }
  }

}
