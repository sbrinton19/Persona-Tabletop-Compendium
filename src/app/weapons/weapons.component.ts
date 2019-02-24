import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatRangedWeapon, FlatWeapon } from '../Classes/FlatItem';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit, OnDestroy {
  private displayList: Array<[FlatWeapon, boolean]> = [];
  private subscriptions: SubscriptionLike[] = [];
  private sortOrder = false;
  private orderByPipe = new OrderByPipe();

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getFlatWeapons();
    this.getFlatRangedWeapons();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  getFlatWeapons(): void {
    this.subscriptions.push(
      this.itemService.getFlatWeaponList().subscribe(weapons => {
        weapons.forEach(weapon => this.displayList.push([weapon, true]));
      })
    );
  }

  getFlatRangedWeapons(): void {
    this.subscriptions.push(
      this.itemService.getFlatRangedWeaponList().subscribe(weapons => {
        weapons.forEach(weapon => this.displayList.push([weapon, true]));
      })
    );
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform(this.displayList, field, this.sortOrder, idx, true);
  }

  onFiltered(filteredData: [string, Array<[FlatWeapon, boolean]>]): void {
    this.displayList = filteredData[1];
  }
}
