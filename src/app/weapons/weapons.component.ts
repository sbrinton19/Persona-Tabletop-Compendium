import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item, RangedWeapon, FlatRangedWeapon, FlatWeapon, Weapon, FlatItem } from '../Classes/Item';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';
import { SubscriptionLike as ISubscription } from 'rxjs';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit, OnDestroy {
  weaponsList: Item[];
  flatWeaponList: FlatWeapon[] = [];
  flatRangedWeaponList: FlatRangedWeapon[] = [];
  displayList: FlatWeapon[];
  private subscriptions: ISubscription[] = [];
  sortOrder = false;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getWeapons();
    this.getFlatWeapons();
    this.getFlatRangedWeapons();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  getWeapons(): void {
    this.subscriptions.push(
      this.itemService.getWeaponList().subscribe(weapons => {
        this.weaponsList = weapons;
      })
    );
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
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.flatWeaponList.concat(this.flatRangedWeaponList), field, this.sortOrder, idx);
  }

  filterStr(filter: string): void {
    if (filter === '' && this.displayList.length !== this.flatWeaponList.length + this.flatRangedWeaponList.length) {
      this.displayList = this.flatWeaponList.concat(this.flatRangedWeaponList);
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.flatWeaponList, filter);
    this.displayList = this.displayList.concat(pipe.transform(this.flatRangedWeaponList, filter));
  }

  getSourceHtml(source: number) {
    return `<a href='/persona/${source}'>${source}</a><br>`;
  }

}
