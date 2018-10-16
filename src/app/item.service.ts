import { Injectable, OnDestroy } from '@angular/core';
import { FlatItem, FlatArmor, FlatLoot, FlatAccessory, FlatConsumable, FlatWeapon, FlatSkillCard, FlatRangedWeapon } from './Classes/FlatItem';
import { Drop } from './Classes/Drop';
import { SkillCardType } from './Enums/SkillCardType';
import { WebsocketService } from './websocket.service';
import { Payload } from './Classes/Payload';
import { Subject, Observable, of } from 'rxjs';
import { Globals } from './Classes/Globals';

@Injectable()
export class ItemService implements OnDestroy {
  private flatAccessoryList: Subject<FlatAccessory[]> = new Subject<FlatAccessory[]>();
  private flatArmorList: Subject<FlatArmor[]> = new Subject<FlatArmor[]>();
  private flatConsumableList: Subject<FlatConsumable[]> = new Subject<FlatConsumable[]>();
  private flatLootList: Subject<FlatLoot[]> = new Subject<FlatLoot[]>();
  private flatSkillCardList: Subject<FlatSkillCard[]> = new Subject<FlatSkillCard[]>();
  private flatRangedWeaponList: Subject<FlatRangedWeapon[]> = new Subject<FlatRangedWeapon[]>();
  private flatWeaponList: Subject<FlatWeapon[]> = new Subject<FlatWeapon[]>();
  constructor(private sockService: WebsocketService) {
    this.sockService.connect(Globals.PERSONASERVER, this, this.onMessage);
  }

  ngOnDestroy() {
    this.sockService.close();
  }

  private onMessage(response: MessageEvent): void {
    if (response.data === 'Failed to read database') {
      // TODO: Actually do something graceful
      return null;
    }
    const data = <Payload> JSON.parse(response.data);
    if (data.PayloadType === 'FlatAccessory[]') {
      const payload = <FlatAccessory[]> data.Payload;
      const returnData: FlatAccessory[] = [];
      payload.forEach(element => {
        const accessory: FlatAccessory = FlatAccessory.copyConstructor(element);
        returnData.push(accessory);
      });
      this.flatAccessoryList.next(returnData);
    } else if (data.PayloadType === 'FlatArmor[]') {
      const payload = <FlatArmor[]> data.Payload;
      const returnData: FlatArmor[] = [];
      payload.forEach(element => {
        const armor: FlatArmor = FlatArmor.copyConstructor(element);
        returnData.push(armor);
      });
      this.flatArmorList.next(returnData);
    } else if (data.PayloadType === 'FlatConsumable[]') {
      const payload = <FlatConsumable[]> data.Payload;
      const returnData: FlatConsumable[] = [];
      payload.forEach(element => {
        const consumable: FlatConsumable = FlatConsumable.copyConstructor(element);
        returnData.push(consumable);
      });
      this.flatConsumableList.next(returnData);
    } else if (data.PayloadType === 'FlatLoot[]') {
      const payload = <FlatLoot[]> data.Payload;
      const returnData: FlatLoot[] = [];
      payload.forEach(element => {
        const loot: FlatLoot = FlatLoot.copyConstructor(element);
        returnData.push(loot);
      });
      this.flatLootList.next(returnData);
    } else if (data.PayloadType === 'FlatSkillCard[]') {
      const payload = <FlatSkillCard[]> data.Payload;
      const returnData: FlatSkillCard[] = [];
      payload.forEach(element => {
        const split: string[] = element.name.split(' ');
        let name = '';
        for (let i = 0; i < split.length - 1; i++) {
            name += split[i];
            name += ' ';
        }
        element.skillName = name.trim();
        element.cardType = SkillCardType[split[split.length - 1]];
        const skillCard: FlatSkillCard = FlatSkillCard.copyConstructor(element);
        returnData.push(skillCard);
      });
      this.flatSkillCardList.next(returnData);
    } else if (data.PayloadType === 'FlatRangedWeapon[]') {
      const payload = <FlatRangedWeapon[]> data.Payload;
      const returnData: FlatRangedWeapon[] = [];
      payload.forEach(element => {
        const rangedWeapon: FlatRangedWeapon = FlatRangedWeapon.copyConstructor(element);
        returnData.push(rangedWeapon);
      });
      this.flatRangedWeaponList.next(returnData);
    } else if (data.PayloadType === 'FlatWeapon[]') {
      const payload = <FlatWeapon[]> data.Payload;
      const returnData: FlatWeapon[] = [];
      payload.forEach(element => {
        const rangedWeapon: FlatWeapon = FlatWeapon.copyConstructor(element);
        returnData.push(rangedWeapon);
      });
      this.flatWeaponList.next(returnData);
    } else if (data.PayloadType === 'FullItem[]') {
      /*let payload = <FullItem[]> data.Payload;
      let returnData: FullItem[] = [];
      payload.forEach(element => {
        let rangedWeapon: FullItem = new FullItem(element.id, element.name, element.schedule, getOrigins(element.origins), element.description,
        element.special, element.transmuteId, element.baseDamage, element.maxDamageDice, element.damageDie, element.lowRange,
        element.highRange, element.failValue);
        returnData.push(rangedWeapon);
      });
      this.flatWeaponList.next(returnData);*/
    }
  }

  getFlatWeaponList(): Subject<FlatWeapon[]> {
    this.sockService.sendMessage('get|FlatWeapon|[]');
    return this.flatWeaponList;
  }

  addFlatWeapon(weapon: FlatWeapon): void {
    this.sockService.sendMessage('add|FlatWeapon|' + JSON.stringify(weapon));
  }

  getFlatRangedWeaponList(): Subject<FlatRangedWeapon[]> {
    this.sockService.sendMessage('get|FlatRangedWeapon|[]');
    return this.flatRangedWeaponList;
  }

  addFlatRangedWeapon(weapon: FlatRangedWeapon): void {
    this.sockService.sendMessage('add|FlatRangedWeapon|' + JSON.stringify(weapon));
  }

  getFlatArmorList(): Subject<FlatArmor[]> {
    this.sockService.sendMessage('get|FlatArmor|[]');
    return this.flatArmorList;
  }

  addFlatArmor(armor: FlatArmor): void {
    this.sockService.sendMessage('add|FlatArmor|' + JSON.stringify(armor));
  }

  getFlatAccessoryList(): Subject<FlatAccessory[]> {
    this.sockService.sendMessage('get|FlatAccessory|[]');
    return this.flatAccessoryList;
  }

  addFlatAccessory(accessory: FlatAccessory): void {
    this.sockService.sendMessage('add|FlatAccessory|' + JSON.stringify(accessory));
  }

  addFlatItemList(item: FlatItem) {
    this.sockService.sendMessage('add|FlatItem|' + JSON.stringify(item));
  }

  getFlatConsumableList(): Subject<FlatConsumable[]> {
    this.sockService.sendMessage('get|FlatConsumable|[]');
    return this.flatConsumableList;
  }

  addFlatConsumable(consumable: FlatConsumable): void {
    this.sockService.sendMessage('add|FlatConsumable|' + JSON.stringify(consumable));
  }

  getFlatSkillCardList(): Subject<FlatSkillCard[]> {
    this.sockService.sendMessage('get|FlatSkillCard|[]');
    return this.flatSkillCardList;
  }

  addFlatSkillCard(skillCard: FlatSkillCard): void {
    this.sockService.sendMessage('add|FlatSkillCard|' + JSON.stringify(skillCard));
  }

  getFlatLootList(): Observable<FlatLoot[]> {
    this.sockService.sendMessage('get|FlatLoot|[]');
    return this.flatLootList;
  }

  addFlatLoot(loot: FlatLoot) {
    this.sockService.sendMessage('add|FlatLoot|' + JSON.stringify(loot));
  }

  addDrop(drop: Drop) {
    this.sockService.sendMessage('add|Drop|' + JSON.stringify(drop));
  }
}
