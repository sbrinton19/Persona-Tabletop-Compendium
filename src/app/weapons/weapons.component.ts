import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatWeapon, FlatRangedWeapon } from '../Classes/FlatItem';
import { ItemService } from '../Services/item.service';
import { SubscriptionLike } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { TableHeader } from '../Classes/TableHeader';
import { FilterType } from '../Enums/FilterType';
import { getDisplayOriginTypes, getOriginName } from '../Enums/OriginType';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<FlatWeapon> = new MatTableDataSource([]);
  tableHeaders: TableHeader[] = [
    new TableHeader(1, 1, 'Name', FilterType.StringFilter, 'name', '', true),
    new TableHeader(1, 1, 'Origins', FilterType.FlagSelectFilter, 'origins', 'mobile-hidden-3', true),
    new TableHeader(1, 2, 'Schedule', FilterType.NoFilter, 'schedule', 'mobile-hidden-3', true),
    new TableHeader(1, 2, 'Base Damage', FilterType.NoFilter, 'baseDamage', '', true),
    new TableHeader(1, 2, 'Max Dice', FilterType.NoFilter, 'maxDamageDice', '', true),
    new TableHeader(1, 2, 'Damage Die', FilterType.NoFilter, 'damageDie', '', true),
    new TableHeader(1, 2, 'Range', FilterType.NoFilter, 'range', 'mobile-hidden-1', false),
    new TableHeader(1, 2, 'Fail Value', FilterType.NoFilter, 'failValue', 'mobile-hidden-2', true),
    new TableHeader(1, 2, 'Mag Size', FilterType.NoFilter, 'magSize', '', true),
    new TableHeader(1, 2, 'Mag Count', FilterType.NoFilter, 'magCount', 'mobile-hidden-1', true),
    new TableHeader(1, 2, 'Special', FilterType.NoFilter, 'special', 'mobile-hidden-1', true),
  ];
  selectOptions: Map<string, [string, any][]> = new Map<string, [string, any][]>();
  private subscriptions: SubscriptionLike[] = [];
  private flatWeapons: FlatWeapon[] = [];
  private flatRangedWeapons: FlatRangedWeapon[] = [];

  constructor(private itemService: ItemService) {
    const originsMap: [string, any][] = [['Any Origin', -1]];
    getDisplayOriginTypes().forEach(origin => originsMap.push([getOriginName(origin), origin]));
    this.selectOptions.set('origins', originsMap);
  }

  ngOnInit() {
    this.getFlatWeapons();
    this.getFlatRangedWeapons();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  getFlatWeapons(): void {
    this.subscriptions.push(
      this.itemService.getFlatWeaponList().subscribe(flatWeapons => {
        this.flatWeapons = flatWeapons;
        this.dataSource.data = this.flatWeapons.concat(this.flatRangedWeapons);
      })
    );
  }

  getFlatRangedWeapons(): void {
    this.subscriptions.push(
      this.itemService.getFlatRangedWeaponList().subscribe(flatRangedWeapons => {
        this.flatRangedWeapons = flatRangedWeapons;
        this.dataSource.data = this.flatWeapons.concat(this.flatRangedWeapons);
      })
    );
  }
}
