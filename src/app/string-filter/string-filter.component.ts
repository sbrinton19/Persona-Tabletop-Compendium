import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FilterPipe } from '../Pipes/filter-pipe';

@Component({
  selector: 'app-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.css']
})
export class StringFilterComponent<T> implements OnInit {

  @Input() displayList: Array<[T, boolean]>;

  private _fieldInfo: string;

  @Input()
  set fieldInfo(fieldInfo: string) {
    this._fieldInfo = (fieldInfo && fieldInfo.trim()) || '';
  }

  get fieldInfo(): string { return this._fieldInfo; }

  @Output() filtered: EventEmitter<[string, Array<[T, boolean]>]> = new EventEmitter<[string, Array<[T, boolean]>]>();

  private readonly filterPipe: FilterPipe = new FilterPipe;
  private filterString = '';
  constructor() { }

  ngOnInit() {
  }

  reapplyFilter(): void {
    this.getFiltered(this.filterString, false);
  }

  getFiltered(filter: string, ignoreFilter = true): void {
    if (ignoreFilter && this.filterString === filter) {
      // We haven't changed the filter and we aren't doing a reapply so ignore it
      return;
    }
    this.filterString = filter;
    // Filters stack
    // this.filtered.emit(this.filterPipe.transform(this.displayList, filter));
    // Filters do not stack
    this.filtered.emit([this.fieldInfo, this.filterPipe.transform(this.displayList, this.filterString, this.fieldInfo, true)]);
  }

  getNewResult(): Array<[T, boolean]> {
    const temp = [];
    this.displayList.forEach(elem => temp.push([(elem[0] as any).clone(), true]));
    return this.filterPipe.transform(temp, this.filterString, this.fieldInfo, true);
  }
}
