import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../Services/item.service';
import { SubscriptionLike } from 'rxjs';
import { FlatItem, FlatConsumable, FlatLoot, FlatTraitBoostItem, FlatStatBoostItem } from '../Classes/FlatItem';
import { MatTableDataSource } from '@angular/material';
import { TableHeader } from '../Classes/TableHeader';
import { getDisplayOriginTypes, getOriginName } from '../Enums/OriginType';
import { FilterType } from '../Enums/FilterType';
import { getDisplayMiscItemTypes, getItemTypeName } from '../Enums/ItemType';
import { getConsumableTypeName, getDisplayConsumableTypes } from '../Enums/ConsumableType';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<FlatItem> = new MatTableDataSource([]);
  tableHeaders: TableHeader[] = [
    new TableHeader(1, 1, 'Name', FilterType.StringFilter, 'name', '', true),
    new TableHeader(1, 1, 'Item Type', FilterType.SelectFilter, 'type', 'mobile-hidden-1', true),
    new TableHeader(1, 1, 'Consumable Type', FilterType.SelectFilter, 'consumableType', 'mobile-hidden-2', true),
    new TableHeader(1, 1, 'Origins', FilterType.FlagSelectFilter, 'origins', 'mobile-hidden-1', true),
    new TableHeader(1, 2, 'Schedule', FilterType.NoFilter, 'schedule', 'mobile-hidden-3', true),
    new TableHeader(1, 2, 'Special', FilterType.NoFilter, 'special', '', true),
  ];
  selectOptions: Map<string, [string, any][]> = new Map<string, [string, any][]>();
  loading = 0;
  private flatConsumables: FlatConsumable[] = [];
  private flatLoots: FlatLoot[] = [];
  private flatTraitBoostItems: FlatTraitBoostItem[] = [];
  private flatStatBoostItems: FlatStatBoostItem[] = [];
  private subscriptions: SubscriptionLike[] = [];

  constructor(private itemService: ItemService) {
    const originsMap: [string, any][] = [['Any Origin', -1]];
    getDisplayOriginTypes().forEach(origin => originsMap.push([getOriginName(origin), origin]));
    this.selectOptions.set('origins', originsMap);
    const itemTypeMap: [string, any][] = [['Any Type', -1]];
    getDisplayMiscItemTypes().forEach(itemType => itemTypeMap.push([getItemTypeName(itemType), itemType]));
    this.selectOptions.set('type', itemTypeMap);
    const consumableTypeMap: [string, any][] = [['Any Type', -1]];
    getDisplayConsumableTypes().forEach(consumableType => consumableTypeMap.push([getConsumableTypeName(consumableType), consumableType]));
    this.selectOptions.set('consumableType', consumableTypeMap);
  }

  ngOnInit() {
    this.getFlatConsumables();
    this.getFlatLoots();
    this.getFlatTraitBoostItems();
    this.getFlatStatBoostItems();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  getFlatConsumables(): void {
    this.subscriptions.push(
      this.itemService.getFlatConsumableList().subscribe(flatConsumables => {
        this.flatConsumables = flatConsumables;
        this.reloadDataSource();
        this.loading += 25;
      })
    );
  }

  getFlatLoots(): void {
    this.subscriptions.push(
      this.itemService.getFlatLootList().subscribe(flatLoots => {
        this.flatLoots = flatLoots;
        this.reloadDataSource();
        this.loading += 25;
      })
    );
  }

  getFlatTraitBoostItems(): void {
    this.subscriptions.push(
      this.itemService.getFlatTraitBoostItemList().subscribe(flatTraitBoostItems => {
        this.flatTraitBoostItems = flatTraitBoostItems;
        this.reloadDataSource();
        this.loading += 25;
      })
    );
  }

  getFlatStatBoostItems(): void {
    this.subscriptions.push(
      this.itemService.getFlatStatBoostItemList().subscribe(flatStatBoostItems => {
        this.flatStatBoostItems = flatStatBoostItems;
        this.reloadDataSource();
        this.loading += 25;
      })
    );
  }

  reloadDataSource(): void {
    this.dataSource.data = this.flatConsumables.concat(this.flatLoots).concat(this.flatTraitBoostItems).concat(this.flatStatBoostItems);
  }
}
