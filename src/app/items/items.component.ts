import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatLoot, FlatConsumable, FlatItem, FlatStatBoostItem, FlatTraitBoostItem } from '../Classes/FlatItem';
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
  private flatStatBoostList: FlatStatBoostItem[] = [];
  private flatTraitBoostList: FlatTraitBoostItem[] = [];
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
        this.flatLootList = flatLoot;
        this.displayList = this.flatConsumableList.concat(this.flatLootList).concat(this.flatTraitBoostList).concat(this.flatStatBoostList);
      })
    );
  }

  getFlatConsumables(): void {
    this.subscriptions.push(
      this.itemService.getFlatConsumableList().subscribe(flatConsumable => {
        this.flatConsumableList = flatConsumable;
        this.displayList = this.flatConsumableList.concat(this.flatLootList).concat(this.flatTraitBoostList).concat(this.flatStatBoostList);
      })
    );
  }

  getFlatTraitBoostItems(): void {
    this.subscriptions.push(
      this.itemService.getFlatTraitBoostItemList().subscribe(flatTraitBoostItem => {
        this.flatTraitBoostList = flatTraitBoostItem;
        this.displayList = this.flatConsumableList.concat(this.flatLootList).concat(this.flatTraitBoostList).concat(this.flatStatBoostList);
      })
    );
  }

  getFlatStatBoostItems(): void {
    this.subscriptions.push(
      this.itemService.getFlatStatBoostItemList().subscribe(flatStatBoostItem => {
        this.flatStatBoostList = flatStatBoostItem;
        this.displayList = this.flatConsumableList.concat(this.flatLootList).concat(this.flatTraitBoostList).concat(this.flatStatBoostList);
      })
    );
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform
      (this.flatConsumableList.concat(this.flatLootList).concat(this.flatTraitBoostList).concat(this.flatStatBoostList), field, this.sortOrder, idx);
  }

  onFiltered(filteredData: FlatItem[]): void {
    this.displayList = filteredData;
  }
}
