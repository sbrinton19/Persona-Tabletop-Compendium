import { Injectable } from '@angular/core';
import { Item } from './Classes/Item';
import { Observable } from 'rxjs/Observable';
import { weaponList, armorList, accessoryList, recoveryList, skillCardList, lootList } from './Data/ItemData';
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

  getRecoveryList(): Observable<Item[]> {
    return of(recoveryList);
  }

  getSkillCardList(): Observable<Item[]> {
    return of(skillCardList);
  }

  getLootList(): Observable<Item[]> {
    return of(lootList);
  }
}
