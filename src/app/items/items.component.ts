import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { SubscriptionLike } from 'rxjs';
import { FlatItem } from '../Classes/FlatItem';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {
  private displayList: Array<[FlatItem, boolean]> = [];
  private subscriptions: SubscriptionLike[] = [];
  private sortOrder = false;
  private readonly orderByPipe = new OrderByPipe();

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getFlatConsumables();
    this.getFlatLoots();
    this.getFlatTraitBoostItems();
    this.getFlatStatBoostItems();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  getFlatLoots(): void {
    this.subscriptions.push(
      this.itemService.getFlatLootList().subscribe(flatLoot => {
        flatLoot.forEach(loot => this.displayList.push([loot, true]));
      })
    );
  }

  getFlatConsumables(): void {
    this.subscriptions.push(
      this.itemService.getFlatConsumableList().subscribe(flatConsumable => {
        flatConsumable.forEach(consumable => this.displayList.push([consumable, true]));
      })
    );
  }

  getFlatTraitBoostItems(): void {
    this.subscriptions.push(
      this.itemService.getFlatTraitBoostItemList().subscribe(flatTraitBoostItem => {
        flatTraitBoostItem.forEach(tBoost => this.displayList.push([tBoost, true]));
      })
    );
  }

  getFlatStatBoostItems(): void {
    this.subscriptions.push(
      this.itemService.getFlatStatBoostItemList().subscribe(flatStatBoostItem => {
        flatStatBoostItem.forEach(sBoost => this.displayList.push([sBoost, true]));
      })
    );
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform(this.displayList, field, this.sortOrder, idx, true);
  }

  onFiltered(filteredData: [string, Array<[FlatItem, boolean]>]): void {
    this.displayList = filteredData[1];
  }
}
