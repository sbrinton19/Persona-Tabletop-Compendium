import { Component, OnInit } from '@angular/core';
import { Item } from '../Classes/Item';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {
  weaponsList: Item[];
  displayList: Item[];
  sortOrder = false;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getWeapons();
  }

  getWeapons(): void {
    this.itemService.getWeaponList().subscribe(weapons => this.weaponsList = weapons);
    this.displayList = this.weaponsList;
  }

  orderBy(field: string, idx = 0): void {
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.weaponsList, field, this.sortOrder, idx);
  }

  filterStr(filter: string): void {
    if (filter === '' && this.displayList.length !== this.weaponsList.length) {
       this.displayList = this.weaponsList;
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.weaponsList, filter);
  }

  getSourceHtml(source: string) {
    const split = source.split('|');
    return `<a href='/persona/${split[1]}'>${split[0]}</a><br>`;
  }

}
