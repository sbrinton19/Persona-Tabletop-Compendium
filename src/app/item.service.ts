import { Injectable, OnDestroy } from '@angular/core';
import { Item, Weapon, FlatItem, OriginType, FlatArmor, getOrigins, FlatLoot, FlatAccessory, FlatConsumable, FlatWeapon, FlatSkillCard, SkillCardType, SkillCard, FlatRangedWeapon, OldDrop, Drop } from './Classes/Item';
import { Observable } from 'rxjs/Observable';
import { weaponList, armorList, accessoryList, consumableList, skillCardList, lootList } from './Data/ItemData';
import { of } from 'rxjs/observable/of';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs';
import { Payload } from './Classes/Payload';

@Injectable()
export class ItemService implements OnDestroy{
  private flatAccessoryList: Subject<FlatAccessory[]> = new Subject<FlatAccessory[]>();
  private flatArmorList: Subject<FlatArmor[]> = new Subject<FlatArmor[]>();
  private flatConsumableList: Subject<FlatConsumable[]> = new Subject<FlatConsumable[]>();
  private flatLootList: Subject<FlatLoot[]> = new Subject<FlatLoot[]>();
  private flatSkillCardList: Subject<FlatSkillCard[]> = new Subject<FlatSkillCard[]>();
  private flatRangedWeaponList: Subject<FlatRangedWeapon[]> = new Subject<FlatRangedWeapon[]>();
  private flatWeaponList: Subject<FlatWeapon[]> = new Subject<FlatWeapon[]>();
  constructor(private sockService: WebsocketService) {
    this.sockService.connect("ws://localhost:1992", this, this.onMessage);
  }

  ngOnDestroy() {
    this.sockService.close();
  }

  private onMessage(response: MessageEvent): void {
    if (response.data === "Failed to read database") {
      //TODO: Actually do something graceful
      return null;
    }
    let data = <Payload> JSON.parse(response.data);
    
    if(data.PayloadType === "FlatAccessory[]"){
      let payload = <FlatAccessory[]> data.Payload;
      let returnData: FlatAccessory[] = [];
      payload.forEach(element => {
        let accessory: FlatAccessory = new FlatAccessory(element.id, element.name, element.schedule, getOrigins(element.origins), element.description,
          element.special, element.transmuteId);
        returnData.push(accessory);
      });
      this.flatAccessoryList.next(returnData);
    }
    else if(data.PayloadType === "FlatArmor[]"){
      let payload = <FlatArmor[]> data.Payload;
      let returnData: FlatArmor[] = [];
      payload.forEach(element => {
        let armor: FlatArmor = new FlatArmor(element.id, element.name, element.schedule, getOrigins(element.origins), element.description,
          element.special, element.transmuteId, element.armorClass, element.damageReduction, element.moveAimPenalty, element.maxDodgeBonus, element.dirtyGearPool);
        returnData.push(armor);
      });
      this.flatArmorList.next(returnData);
    }
    else if(data.PayloadType === "FlatConsumable[]"){
      let payload = <FlatConsumable[]> data.Payload;
      let returnData: FlatConsumable[] = [];
      payload.forEach(element => {
        let consumable: FlatConsumable = new FlatConsumable(element.id, element.name, element.schedule, getOrigins(element.origins), element.description,
          element.special, element.consumableType, element.transmuteId);
        returnData.push(consumable);
      });
      this.flatConsumableList.next(returnData);
    }
    else if(data.PayloadType === "FlatLoot[]"){
      let payload = <FlatLoot[]> data.Payload;
      let returnData: FlatLoot[] = [];
      payload.forEach(element => {
        let loot: FlatLoot = new FlatLoot(element.id, element.name, element.schedule, getOrigins(element.origins), element.description,
          element.special, element.transmuteId, element.arcanaSources);
        returnData.push(loot);
      });
      this.flatLootList.next(returnData);
    }
    else if(data.PayloadType === "FlatSkillCard[]"){
      let payload = <FlatSkillCard[]> data.Payload;
      let returnData: FlatSkillCard[] = [];
      payload.forEach(element => {
        let split: string[] = element.name.split(" ");
        let name = "";
        for(let i = 0; i < split.length - 1; i++) {
            name += split[i];
            name += " ";
        }
        let skillCard: FlatSkillCard = new FlatSkillCard(element.id, name.trim(), element.schedule, 
          getOrigins(element.origins), element.description, element.special, element.transmuteId, SkillCardType[split[split.length-1]]);
        returnData.push(skillCard);
      });
      this.flatSkillCardList.next(returnData);
    }
    else if(data.PayloadType === "FlatRangedWeapon[]"){
      let payload = <FlatRangedWeapon[]> data.Payload;
      let returnData: FlatRangedWeapon[] = [];
      payload.forEach(element => {
        let rangedWeapon: FlatRangedWeapon = new FlatRangedWeapon(element.id, element.name, element.schedule, getOrigins(element.origins), element.description,
        element.special, element.transmuteId, element.baseDamage, element.maxDamageDice, element.damageDie, element.lowRange, element.highRange, element.failValue, element.magSize, element.magCount);
        returnData.push(rangedWeapon);
      });
      this.flatRangedWeaponList.next(returnData);
    }
    else if(data.PayloadType === "FlatWeapon[]"){
      let payload = <FlatWeapon[]> data.Payload;
      let returnData: FlatWeapon[] = [];
      payload.forEach(element => {
        let rangedWeapon: FlatWeapon = new FlatWeapon(element.id, element.name, element.schedule, getOrigins(element.origins), element.description,
        element.special, element.transmuteId, element.baseDamage, element.maxDamageDice, element.damageDie, element.lowRange, element.highRange, element.failValue);
        returnData.push(rangedWeapon);
      });
      this.flatWeaponList.next(returnData);
    } else if(data.PayloadType === "FullItem[]"){
      /*let payload = <FullItem[]> data.Payload;
      let returnData: FullItem[] = [];
      payload.forEach(element => {
        let rangedWeapon: FullItem = new FullItem(element.id, element.name, element.schedule, getOrigins(element.origins), element.description,
        element.special, element.transmuteId, element.baseDamage, element.maxDamageDice, element.damageDie, element.lowRange, element.highRange, element.failValue);
        returnData.push(rangedWeapon);
      });
      this.flatWeaponList.next(returnData);*/
    }
  }

  getWeaponList(): Observable<Item[]> {
    return of(weaponList);
  }

  getFlatWeaponList(): Subject<FlatWeapon[]> {
    this.sockService.sendMessage("get|FlatWeapon|[]");
    return this.flatWeaponList;    
  }

  addFlatWeapon(weapon: FlatWeapon): void {
    this.sockService.sendMessage("add|FlatWeapon|" + JSON.stringify(weapon));
  }

  getFlatRangedWeaponList(): Subject<FlatRangedWeapon[]> {
    this.sockService.sendMessage("get|FlatRangedWeapon|[]");
    return this.flatRangedWeaponList;    
  }

  addFlatRangedWeapon(weapon: FlatRangedWeapon): void {
    this.sockService.sendMessage("add|FlatRangedWeapon|" + JSON.stringify(weapon));
  }

  getFlatArmorList(): Subject<FlatArmor[]> {
    this.sockService.sendMessage("get|FlatArmor|[]");
    return this.flatArmorList;
  }

  addFlatArmor(armor: FlatArmor): void {
    this.sockService.sendMessage("add|FlatArmor|" + JSON.stringify(armor));
  }

  getArmorList(): Observable<Item[]> {
    return of(armorList);
  }

  getAccessoryList(): Observable<Item[]> {
    return of(accessoryList);
  }

  getFlatAccessoryList(): Subject<FlatAccessory[]> {
    this.sockService.sendMessage("get|FlatAccessory|[]")
    return this.flatAccessoryList;
  }

  addFlatAccessory(accessory: FlatAccessory): void {
    this.sockService.sendMessage("add|FlatAccessory|" + JSON.stringify(accessory));
  }

  addFlatItemList(item: FlatItem) {
    this.sockService.sendMessage('add|FlatItem|' + JSON.stringify(item));
  }

  getConsumableList(): Observable<Item[]> {
    return of(consumableList);
  }

  getFlatConsumableList(): Subject<FlatConsumable[]> {
    this.sockService.sendMessage("get|FlatConsumable|[]");
    return this.flatConsumableList;
  }

  addFlatConsumable(consumable: FlatConsumable) : void {
    this.sockService.sendMessage('add|FlatConsumable|' + JSON.stringify(consumable));
  }

  getSkillCardList(): Observable<Item[]> {
    return of(skillCardList);
  }

  getFlatSkillCardList(): Subject<FlatSkillCard[]> {
    this.sockService.sendMessage("get|FlatSkillCard|[]");
    return this.flatSkillCardList;
  }

  addFlatSkillCard(skillCard: FlatSkillCard): void {
    this.sockService.sendMessage('add|FlatSkillCard|' + JSON.stringify(skillCard));
  }

  getLootList(): Observable<Item[]> {
    return of(lootList);
  }

  getFlatLootList(): Observable<FlatLoot[]> {
    this.sockService.sendMessage("get|FlatLoot|[]");
    return this.flatLootList;
  }

  addFlatLoot(loot: FlatLoot) {
    this.sockService.sendMessage("add|FlatLoot|"+JSON.stringify(loot));
  }

  addDrop(drop: Drop) {
    this.sockService.sendMessage('add|Drop|'+JSON.stringify(drop));
  }
}
