import { Component, OnInit, Input, ContentChild, TemplateRef, QueryList, ContentChildren, ViewChildren } from '@angular/core';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';
import { FilterType } from '../Enums/FilterType';
import { TableHeader } from '../Classes/TableHeader';
import { StringFilterComponent } from '../string-filter/string-filter.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent<T> implements OnInit {
  @ViewChildren(StringFilterComponent) filters: QueryList<StringFilterComponent<[T, boolean]>>;
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() perPage = 20;
  @Input() header = '';
  @Input() sortField = '';
  @Input() tableId = '';
  @Input() tableHeader: TableHeader[];

  private _activeData: Array<[T, boolean]> = [];

  @Input()
  set activeData(activeData: Array<T>) {
    if (this.sortField) {
      activeData = this.orderBy.transform(activeData, this.sortField, false);
    }
    activeData.forEach(data => this._activeData.push([data, true]));
  }

  displayData: Array<T> = [];

  // If the paginator contains objects that have an owner
  // e.g., a Recipe, it may need its name for filtering
  readonly FilterType = FilterType;
  private currPage = 1;
  private maxPage: number;
  private readonly orderBy = new OrderByPipe();
  private readonly filter = new FilterPipe();
  headerPart: string[];

  constructor() { }

  ngOnInit() {
    this.headerPart = this.header.split('|');
    this.maxPage = Math.ceil(this._activeData.length / this.perPage);
    this.getCurrentPage();
  }

  getFirstPage(): void {
    this.getPageNumber(1);
  }

  getPrevPage(): void {
    if (this.currPage === 1) {
      return;
    }
    this.currPage--;
    this.getCurrentPage();
  }

  getNextPage(): void {
    if (this.currPage === this.maxPage) {
      return;
    }
    this.currPage++;
    this.getCurrentPage();
  }

  getLastPage(): void {
    this.getPageNumber(this.maxPage);
  }

  getPageNumber(pageNumber: number): void {
    if (pageNumber < 1 || pageNumber > this.maxPage) {
      return;
    }
    this.currPage = pageNumber;
    this.getCurrentPage();
  }

  onFiltered(filteredData: [string, Array<[T, boolean]>]): void {
    if (this.filters.length > 1) {
      this.filters.forEach(filter => {
        if (filteredData[0] !== filter.fieldInfo) {
          const filter2 = filter.getNewResult();
          for (let i = 0; i < filter2.length; i++) {
            filteredData[1][i][1] = filteredData[1][i][1] && filter2[i][1];
          }
        }
      });
    }
    this._activeData = filteredData[1];
    this.getMaxPage();
    this.getCurrentPage();
  }

  getCurrentPage(): void {
    this.displayData = [];
    const temp = [];
    this._activeData.forEach(tuple => tuple[1] ? temp.push(tuple[0]) : temp);
    this.displayData = temp.slice((this.currPage - 1) * this.perPage,
    (this.currPage * this.perPage));
  }

  getMaxPage(): void {
    this.maxPage = Math.ceil(this.getVisibleCount() / this.perPage);
    if (this.maxPage === 0) {
      this.maxPage = 1;
    }
    if (this.currPage > this.maxPage) {
      this.currPage = this.maxPage;
    }
  }

  getVisibleCount(): number {
    let visible = 0;
    this._activeData.forEach(data => data[1] ? visible++ : visible);
    return visible;
  }
}
