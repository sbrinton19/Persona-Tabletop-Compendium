import { Component, OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { FlatAccessory } from '../Classes/FlatItem';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { SubscriptionLike } from 'rxjs';
import { StringFilterComponent } from '../string-filter/string-filter.component';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit, OnDestroy {
  @ViewChildren(StringFilterComponent) filter: QueryList<StringFilterComponent<FlatAccessory>>;
  private displayList: Array<[FlatAccessory, boolean]> = [];
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
      accessories.forEach(acc => this.displayList.push([acc, true]));
    });
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform(this.displayList, field, this.sortOrder, idx);
  }

  onFiltered(filteredData: [string, Array<[FlatAccessory, boolean]>]): void {
    this.displayList = filteredData[1];
  }
}
