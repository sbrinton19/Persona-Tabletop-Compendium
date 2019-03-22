import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatArmor } from '../Classes/FlatItem';
import { ItemService } from '../Services/item.service';
import { SubscriptionLike } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { TableHeader } from '../Classes/TableHeader';
import { FilterType } from '../Enums/FilterType';
import { getDisplayOriginTypes, getOriginName } from '../Enums/OriginType';
import { getDisplayArmorClasses, getArmorClassName } from '../Enums/ArmorClass';

@Component({
  selector: 'app-armors',
  templateUrl: './armors.component.html',
  styleUrls: ['./armors.component.scss']
})
export class ArmorsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<FlatArmor> = new MatTableDataSource([]);
  tableHeaders: TableHeader[] = [
    new TableHeader(1, 1, 'Name', FilterType.StringFilter, 'name', '', true),
    new TableHeader(1, 1, 'Origins', FilterType.FlagSelectFilter, 'origins', 'mobile-hidden-3', true),
    new TableHeader(1, 1, 'Armor Class', FilterType.SelectFilter, 'armorClass', 'mobile-hidden-2', true),
    new TableHeader(1, 2, 'Schedule', FilterType.NoFilter, 'schedule', 'mobile-hidden-3', true),
    new TableHeader(1, 2, 'Gear Pool', FilterType.NoFilter, 'dirtyGearPool', 'mobile-hidden-2', true),
    new TableHeader(1, 2, 'DMG Reduction', FilterType.NoFilter, 'damageReduction', '', true),
    new TableHeader(1, 2, 'Move/Aim Penalty', FilterType.NoFilter, 'moveAimPenalty', '', true),
    new TableHeader(1, 2, 'Max Dodge Bonus', FilterType.NoFilter, 'maxDodgeBonus', '', true),
    new TableHeader(1, 2, 'Special', FilterType.NoFilter, 'special', 'mobile-hidden-3', true),
  ];
  selectOptions: Map<string, [string, any][]> = new Map<string, [string, any][]>();
  displayList: Array<[FlatArmor, boolean]> = [];
  private subscription: SubscriptionLike;

  constructor(private itemService: ItemService) {
    const originsMap: [string, any][] = [['Any Origin', -1]];
    getDisplayOriginTypes().forEach(origin => originsMap.push([getOriginName(origin), origin]));
    this.selectOptions.set('origins', originsMap);
    const armorClassMap: [string, any][] = [['Any Armor Class', -1]];
    getDisplayArmorClasses().forEach(armorClass => armorClassMap.push([getArmorClassName(armorClass), armorClass]));
    this.selectOptions.set('armorClass', armorClassMap);
  }

  ngOnInit() {
    this.getFlatArmors();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getFlatArmors(): void {
    this.subscription = this.itemService.getFlatArmorList().subscribe(flatArmors => {
      flatArmors.forEach(armor => this.displayList.push([armor, true]));
      this.dataSource.data = flatArmors;
    });
  }
}
