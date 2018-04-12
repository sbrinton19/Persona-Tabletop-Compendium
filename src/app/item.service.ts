import { Injectable } from '@angular/core';
import { Item } from './Classes/Item';
import { Observable } from 'rxjs/Observable';
import { weaponList, armorList, accessoryList, consumableList, skillCardList, lootList } from './Data/ItemData';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ItemService {

  constructor() { }

  getWeaponList(): Observable<Item[]> {
    return of(weaponList);
  }

  getArmorList(): Observable<Item[]> {
    return of(armorList);
  }

  getAccessoryList(): Observable<Item[]> {
    return of(accessoryList);
  }

  getConsumableList(): Observable<Item[]> {
    return of(consumableList);
  }

  getSkillCardList(): Observable<Item[]> {
    return of(skillCardList);
  }

  getLootList(): Observable<Item[]> {
    return of(lootList);
  }

  getItemList(): Observable<Item[]> {
    let compile: Item[] = [];
    compile = compile.concat(consumableList as Item[]);
    compile = compile.concat(lootList as Item[]);
    compile = compile.concat(skillCardList as Item[]);
    return of(compile);
  }
}
