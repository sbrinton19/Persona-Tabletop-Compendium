import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatLoot, FlatConsumable, FlatItem } from '../Classes/FlatItem';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {
  private displayList: FlatItem[];
  private flatConsumableList: FlatConsumable[] = [];
  private flatLootList: FlatLoot[] = [];
  private subscriptions: SubscriptionLike[] = [];
  private sortOrder = false;
  private readonly orderByPipe = new OrderByPipe();

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getFlatConsumables();
    this.getFlatLoots();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  getFlatLoots(): void {
    this.subscriptions.push(
      this.itemService.getFlatLootList().subscribe(flatLoot => {
        this.flatLootList = flatLoot;
        this.displayList = this.flatConsumableList.concat(this.flatLootList);
      })
    );
  }

  getFlatConsumables(): void {
    this.subscriptions.push(
      this.itemService.getFlatConsumableList().subscribe(flatConsumable => {
        this.flatConsumableList = flatConsumable;
        this.displayList = this.flatConsumableList.concat(this.flatLootList);
      })
    );
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform(this.flatConsumableList.concat(this.flatLootList), field, this.sortOrder, idx);
  }

  onFiltered(filteredData: FlatItem[]): void {
    this.displayList = filteredData;
  }
}
