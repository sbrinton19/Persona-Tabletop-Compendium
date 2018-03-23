import { Component, OnInit } from '@angular/core';
import { Item } from '../Classes/Item';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {
  accessoriesList: Item[];
  displayList: Item[];
  sortOrder = false;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getAccessories();
  }

  getAccessories(): void {
    this.itemService.getAccessoryList().subscribe(accessories => this.accessoriesList = accessories);
    this.displayList = this.accessoriesList;
  }

  orderBy(field: string, idx = 0): void {
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.accessoriesList, field, this.sortOrder, idx);
  }

  filterStr(filter: string): void {
    if (filter === '' && this.displayList.length !== this.accessoriesList.length) {
       this.displayList = this.accessoriesList;
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.accessoriesList, filter);
  }

  getSourceHtml(source: string) {
    const split = source.split('|');
    return `<a href='/persona/${split[1]}'>${split[0]}</a><br>`;
  }

}
