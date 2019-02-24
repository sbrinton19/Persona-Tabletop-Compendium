import { Injectable, OnDestroy } from '@angular/core';
import { FlatArmor, FlatLoot, FlatAccessory, FlatConsumable, FlatWeapon, FlatSkillCard,
  FlatRangedWeapon, FlatStatBoostItem, FlatTraitBoostItem, FullItem } from './Classes/FlatItem';
import { Drop } from './Classes/Drop';
import { SkillCardType } from './Enums/SkillCardType';
import { WebsocketService } from './websocket.service';
import { ServerRequestResponse } from './Classes/ServerRequestReponse';
import { Subject } from 'rxjs';
import { Globals } from './Classes/Globals';
import { ServerRequest, ServerRequestType } from './Classes/ServerRequest';

@Injectable()
export class ItemService implements OnDestroy {
  private flatWeaponList: Subject<FlatWeapon[]> = new Subject<FlatWeapon[]>();
  private flatRangedWeaponList: Subject<FlatRangedWeapon[]> = new Subject<FlatRangedWeapon[]>();
  private flatArmorList: Subject<FlatArmor[]> = new Subject<FlatArmor[]>();
  private flatAccessoryList: Subject<FlatAccessory[]> = new Subject<FlatAccessory[]>();
  private flatConsumableList: Subject<FlatConsumable[]> = new Subject<FlatConsumable[]>();
  private flatLootList: Subject<FlatLoot[]> = new Subject<FlatLoot[]>();
  private flatSkillCardList: Subject<FlatSkillCard[]> = new Subject<FlatSkillCard[]>();
  private flatStatBoostList: Subject<FlatStatBoostItem[]> = new Subject<FlatStatBoostItem[]>();
  private flatTraitBoostList: Subject<FlatTraitBoostItem[]> = new Subject<FlatTraitBoostItem[]>();
  private fullItemMap: Map<number, FullItem> = new Map<number, FullItem>();
  private fullItemMapSubject: Subject<Map<number, FullItem>> = new Subject<Map<number, FullItem>>();

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
    const reqResp = JSON.parse(response.data) as ServerRequestResponse;
    // ServerRequestResponse.payload objects do not "autobox" into their respective object types
    // This means they don't have their member functions autodefined
    // So you have to use the static copyConstructor() rather than the member clone()
    let payload: any[];
    const returnData: any[] = [];
    switch (reqResp.payloadType) {
      case 'FlatWeapon[]':
        payload = reqResp.payload as FlatWeapon[];
        payload.forEach(weapon => returnData.push(FlatWeapon.copyConstructor(weapon)));
        this.flatWeaponList.next(returnData);
        break;
      case 'FlatRangedWeapon[]':
        payload = reqResp.payload as FlatRangedWeapon[];
        payload.forEach(rangedWeapon => returnData.push(FlatRangedWeapon.copyConstructor(rangedWeapon)));
        this.flatRangedWeaponList.next(returnData);
        break;
      case 'FlatArmor[]':
        payload = reqResp.payload as FlatArmor[];
        payload.forEach(armor => returnData.push(FlatArmor.copyConstructor(armor)));
        this.flatArmorList.next(returnData);
        break;
      case 'FlatAccessory[]':
        payload = reqResp.payload as FlatAccessory[];
        payload.forEach(accessory => returnData.push(FlatAccessory.copyConstructor(accessory)));
        this.flatAccessoryList.next(returnData);
        break;
      case 'FlatConsumable[]':
        payload = reqResp.payload as FlatConsumable[];
        payload.forEach(consumable => returnData.push(FlatConsumable.copyConstructor(consumable)));
        this.flatConsumableList.next(returnData);
        break;
      case 'FlatLoot[]':
        payload = reqResp.payload as FlatLoot[];
        payload.forEach(loot => returnData.push(FlatLoot.copyConstructor(loot)));
        this.flatLootList.next(returnData);
        break;
      case 'FlatSkillCard[]':
        payload = reqResp.payload as FlatSkillCard[];
        payload.forEach(skillCard => {
          // TODO: Probably should do this server-side
          const split: string[] = skillCard.name.split(' ');
          let name = '';
          for (let i = 0; i < split.length - 1; i++) {
            name += split[i];
            name += ' ';
          }
          skillCard.skillName = name.trim();
          skillCard.cardType = SkillCardType[split[split.length - 1]];
          returnData.push(FlatSkillCard.copyConstructor(skillCard));
        });
        this.flatSkillCardList.next(returnData);
        break;
      case 'FlatStatBoostItem[]':
        payload = reqResp.payload as FlatStatBoostItem[];
        payload.forEach(statBoostItem => returnData.push(FlatStatBoostItem.copyConstructor(statBoostItem)));
        this.flatStatBoostList.next(returnData);
        break;
      case 'FlatTraitBoostItem[]':
        payload = reqResp.payload as FlatTraitBoostItem[];
        payload.forEach(traitBoostItem => returnData.push(FlatTraitBoostItem.copyConstructor(traitBoostItem)));
        this.flatTraitBoostList.next(returnData);
        break;
      case 'FullItem[]':
        payload = reqResp.payload as FullItem[];
        payload.forEach(item => this.fullItemMap.set(item.item.id, FullItem.copyConstructor(item)));
        this.fullItemMapSubject.next(this.fullItemMap);
        break;
    }
  }

  getFlatWeaponList(): Subject<FlatWeapon[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatWeapon.name, []).toString());
    return this.flatWeaponList;
  }

  addFlatWeapon(flatWeapon: FlatWeapon): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatWeapon.constructor.name, flatWeapon).toString());
  }

  getFlatRangedWeaponList(): Subject<FlatRangedWeapon[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatRangedWeapon.name, []).toString());
    return this.flatRangedWeaponList;
  }

  addFlatRangedWeapon(flatRangedWeapon: FlatRangedWeapon): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatRangedWeapon.constructor.name, flatRangedWeapon).toString());
  }

  getFlatArmorList(): Subject<FlatArmor[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatArmor.name, []).toString());
    return this.flatArmorList;
  }

  addFlatArmor(flatArmor: FlatArmor): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatArmor.constructor.name, flatArmor).toString());
  }

  getFlatAccessoryList(): Subject<FlatAccessory[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatAccessory.name, []).toString());
    return this.flatAccessoryList;
  }

  addFlatAccessory(flatAccessory: FlatAccessory): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatAccessory.constructor.name, flatAccessory).toString());
  }

  getFlatConsumableList(): Subject<FlatConsumable[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatConsumable.name, []).toString());
    return this.flatConsumableList;
  }

  addFlatConsumable(flatConsumable: FlatConsumable): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatConsumable.constructor.name, flatConsumable).toString());
  }

  getFlatLootList(): Subject<FlatLoot[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatLoot.name, []).toString());
    return this.flatLootList;
  }

  addFlatLoot(flatLoot: FlatLoot) {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatLoot.constructor.name, flatLoot).toString());
  }

  getFlatSkillCardList(): Subject<FlatSkillCard[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatSkillCard.name, []).toString());
    return this.flatSkillCardList;
  }

  addFlatSkillCard(flatSkillCard: FlatSkillCard): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatSkillCard.constructor.name, flatSkillCard).toString());
  }

  getFlatStatBoostItemList(): Subject<FlatStatBoostItem[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatStatBoostItem.name, []).toString());
    return this.flatStatBoostList;
  }

  addFlatStatBoostItem(flatStatBoostItem: FlatStatBoostItem): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatStatBoostItem.constructor.name, flatStatBoostItem).toString());
  }

  getFlatTraitBoostItemList(): Subject<FlatTraitBoostItem[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatTraitBoostItem.name, []).toString());
    return this.flatTraitBoostList;
  }

  addFlatTraitBoostItem(flatTraitBoostItem: FlatTraitBoostItem): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatTraitBoostItem.constructor.name, flatTraitBoostItem).toString());
  }

  /**
   * This is a debug method; it should not be called in production code
   */
  getFullItemList(): Subject<Map<number, FullItem>> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FullItem.name, []).toString());
    return this.fullItemMapSubject;
  }

  getFullItem(itemId: number): Subject<Map<number, FullItem>> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FullItem.name, [itemId]).toString());
    return this.fullItemMapSubject;
  }

  // Drops are tightly bound to items so they are a part of the item service
  addDrop(drop: Drop) {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, drop.constructor.name, drop).toString());
  }
}
