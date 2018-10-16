import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent<T> implements OnInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() listData: Array<T>;
  @Input() perPage = 20;
  @Input() owner = '';
  @Input() header = '';
  // If the paginator contains objects that have an owner
  // e.g., a Recipe, it may need its name for filtering
  private activeData: Array<T>;
  displayData: Array<T>;
  private currPage = 1;
  private maxPage: number;
  private readonly orderBy = new OrderByPipe();
  private readonly filter = new FilterPipe();
  headerPart: string[];
  constructor() { }

  ngOnInit() {
    this.listData = this.orderBy.transform(this.listData, 'cost', false);
    this.activeData = this.listData;
    this.displayData = this.listData;
    this.headerPart = this.header.split('|');
    this.maxPage = Math.ceil(this.listData.length / this.perPage);
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

  onFiltered(filteredData: Array<T>): void {
    this.activeData = filteredData;
    this.getMaxPage();
    this.getCurrentPage();
  }

  getCurrentPage(): void {
    this.displayData = this.activeData
    .slice((this.currPage - 1) * this.perPage,
    (this.currPage * this.perPage));
  }

  getMaxPage(): void {
    this.maxPage = Math.ceil(this.activeData.length / this.perPage);
    if (this.maxPage === 0) {
      this.maxPage = 1;
    }
    if (this.currPage > this.maxPage) {
      this.currPage = this.maxPage;
    }
  }

}
