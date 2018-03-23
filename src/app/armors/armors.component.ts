import { Component, OnInit } from '@angular/core';
import { Item } from '../Classes/Item';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';

@Component({
  selector: 'app-armors',
  templateUrl: './armors.component.html',
  styleUrls: ['./armors.component.css']
})
export class ArmorsComponent implements OnInit {
  armorsList: Item[];
  displayList: Item[];
  sortOrder = false;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getArmors();
  }

  getArmors(): void {
    this.itemService.getArmorList().subscribe(armors => this.armorsList = armors);
    this.displayList = this.armorsList;
  }

  orderBy(field: string, idx = 0): void {
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.armorsList, field, this.sortOrder, idx);
  }

  filterStr(filter: string): void {
    if (filter === '' && this.displayList.length !== this.armorsList.length) {
       this.displayList = this.armorsList;
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.armorsList, filter);
  }

  getSourceHtml(source: string) {
    const split = source.split('|');
    return `<a href='/persona/${split[1]}'>${split[0]}</a><br>`;
  }

}
