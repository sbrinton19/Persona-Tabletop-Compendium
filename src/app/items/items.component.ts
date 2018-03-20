import { Component, OnInit } from '@angular/core';
import { Item } from '../Classes/Item';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  itemList: Item[];
  displayList: Item[];
  sortOrder = false;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItemList().subscribe(items => this.itemList = items);
    this.displayList = this.itemList;
  }

  orderBy(field: string, idx = 0): void {
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.itemList, field, this.sortOrder, idx);
  }

  filterStr(filter: string): void {
    if (filter === '' && this.displayList.length !== this.itemList.length) {
       this.displayList = this.itemList;
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.itemList, filter);
  }

  getSourceHtml(source: string) {
    const split = source.split('|');
    return `<a href='/persona/${split[1]}'>${split[0]}</a><br>`;
  }

}
