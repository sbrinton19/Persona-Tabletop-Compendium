import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatAccessory } from '../Classes/FlatItem';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit, OnDestroy {
  private flatAccessoriesList: FlatAccessory[];
  private displayList: FlatAccessory[];
  private subscription: SubscriptionLike;
  private sortOrder = false;
  private readonly orderByPipe: OrderByPipe = new OrderByPipe();

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getFlatAccessories();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getFlatAccessories(): void {
    this.subscription = this.itemService.getFlatAccessoryList().subscribe(accessories => {
      this.flatAccessoriesList = accessories;
      this.displayList = this.flatAccessoriesList;
    });
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform(this.flatAccessoriesList, field, this.sortOrder, idx);
  }

  onFiltered(filteredData: FlatAccessory[]): void {
    this.displayList = filteredData;
  }
}
