import { Component, OnInit } from '@angular/core';
import { FlatAccessory } from '../Classes/Item';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {
  private flatAccessoriesList: FlatAccessory[];
  private displayList: FlatAccessory[];
  private subscriptions: ISubscription[] = [];
  private sortOrder = false;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getFlatAccessories();
  }

  private getFlatAccessories(): void {
    this.subscriptions.push(this.itemService.getFlatAccessoryList().subscribe(accessories => {
      this.flatAccessoriesList = accessories;
      this.displayList = this.flatAccessoriesList;
    }));
  }

  orderBy(field: string, idx = 0): void {
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.flatAccessoriesList, field, this.sortOrder, idx);
  }

  filterStr(filter: string): void {
    if (filter === '' && this.displayList.length !== this.flatAccessoriesList.length) {
       this.displayList = this.flatAccessoriesList;
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.flatAccessoriesList, filter);
  }
}
