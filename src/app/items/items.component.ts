import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item, FlatLoot, Loot, FlatConsumable, FlatAccessory, getOrigins, SkillCard, FlatSkillCard, SkillCardType, FlatItem } from '../Classes/Item';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';
import { SubscriptionLike as ISubscription } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {
  displayList: FlatItem[];
  flatConsumableList: FlatConsumable[] = [];
  flatLootList: FlatLoot[] = [];
  private subscriptions: ISubscription[] = [];
  sortOrder = false;
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
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.flatConsumableList.concat(this.flatLootList), field, this.sortOrder, idx);
  }

  filterStr(filter: string): void {
    if (filter === '' && this.displayList.length !== this.flatConsumableList.length + this.flatLootList.length) {
       this.displayList = this.flatConsumableList.concat(this.flatLootList);
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.flatConsumableList, filter);
    this.displayList = this.displayList.concat(pipe.transform(this.flatLootList, filter))
  }

  getSourceHtml(source: number) {
    return `<a href='/persona/${source}'>${source}</a><br>`;
  }

}
