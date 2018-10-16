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
  private flatWeaponList: FlatWeapon[] = [];
  private flatRangedWeaponList: FlatRangedWeapon[] = [];
  private displayList: FlatWeapon[];
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
        this.flatWeaponList = weapons;
        this.displayList = this.flatWeaponList.concat(this.flatRangedWeaponList);
      })
    );
  }

  getFlatRangedWeapons(): void {
    this.subscriptions.push(
      this.itemService.getFlatRangedWeaponList().subscribe(weapons => {
        this.flatRangedWeaponList = weapons;
        this.displayList = this.flatWeaponList.concat(this.flatRangedWeaponList);
      })
    );
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform(this.flatWeaponList.concat(this.flatRangedWeaponList), field, this.sortOrder, idx);
  }

  onFiltered(filteredData: FlatWeapon[]): void {
    this.displayList = filteredData;
  }

  getSourceHtml(source: number) {
    return `<a href='/persona/${source}'>${source}</a><br>`;
  }

}
