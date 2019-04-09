import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatAccessory } from '../Classes/FlatItem';
import { ItemService } from '../Services/item.service';
import { SubscriptionLike } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { TableHeader } from '../Classes/TableHeader';
import { FilterType } from '../Enums/FilterType';
import { getDisplayOriginTypes, getOriginName } from '../Enums/OriginType';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<FlatAccessory> = new MatTableDataSource([]);
  tableHeaders: TableHeader[] = [
    new TableHeader(1, 1, 'Name', FilterType.StringFilter, 'name', '', true),
    new TableHeader(1, 1, 'Origins', FilterType.FlagSelectFilter, 'origins', '', true),
    new TableHeader(1, 2, 'Schedule', FilterType.NoFilter, 'schedule', '', true),
    new TableHeader(1, 2, 'Special', FilterType.NoFilter, 'special', '', true),
  ];
  selectOptions: Map<string, [string, any][]> = new Map<string, [string, any][]>();
  loading = true;
  private subscription: SubscriptionLike;

  constructor(private itemService: ItemService) {
    const originsMap: [string, any][] = [['Any Origin', -1]];
    getDisplayOriginTypes().forEach(origin => originsMap.push([getOriginName(origin), origin]));
    this.selectOptions.set('origins', originsMap);
  }

  ngOnInit() {
    this.getFlatAccessories();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getFlatAccessories(): void {
    this.subscription =
      this.itemService.getFlatAccessoryList().subscribe(flatAccessories => {
        this.dataSource.data = flatAccessories;
        this.loading = false;
      });
  }
}
