import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FlatSkill, FlatDamageSkill, FlatDamageAilmentSkill, FlatSupportSkill, FlatAilmentSkill, FlatPassiveSkill, PersonaSkill, FullSkill } from './Classes/Skill';
import { of } from 'rxjs/observable/of';
import { WebsocketService } from './websocket.service';
import { Payload } from './Classes/Payload';
import { Subject } from 'rxjs';

@Injectable()
export class SkillService implements OnDestroy {
  private flatSkillList: Subject<FlatSkill[]> = new Subject<FlatSkill[]>();
  private flatDamageSkillList: Subject<FlatDamageSkill[]> = new Subject<FlatDamageSkill[]>();
  private flatDamageAilmentSkillList: Subject<FlatDamageAilmentSkill[]> = new Subject<FlatDamageAilmentSkill[]>();
  private flatSupportSkillList: Subject<FlatSupportSkill[]> = new Subject<FlatSupportSkill[]>();
  private flatAilmentSkillList: Subject<FlatAilmentSkill[]> = new Subject<FlatAilmentSkill[]>();
  private flatPassiveSkillList: Subject<FlatPassiveSkill[]> = new Subject<FlatPassiveSkill[]>();
  private fullSkillMapSubject: Subject<Map<number, FullSkill>> = new Subject<Map<number, FullSkill>>();
  private fullSkillMap: Map<number, FullSkill> = new Map<number, FullSkill>();

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
    if(data.PayloadType === "FlatSkill[]"){
      let payload = <FlatSkill[]> data.Payload;
      let returnData: FlatSkill[] = [];
      payload.forEach(data => {
        let flatSkill: FlatSkill = new FlatSkill(data.id, data.name, data.cost, data.element, data.description, data.allyCardId, data.mainCardId, data.aoe, data.minLevel, false);
        returnData.push(flatSkill);
      });
      this.flatSkillList.next(returnData);
    } else if(data.PayloadType === "FullSkill[]"){
      let payload = <FullSkill[]> data.Payload;
      payload.forEach(data => {
        let skill: FullSkill = FullSkill.copyConstructor(data);
        this.fullSkillMap.set(data.skill.id, skill);
      });
      this.fullSkillMapSubject.next(this.fullSkillMap);
    } else if(data.PayloadType === "FlatDamageSkill[]"){
      let payload = <FlatDamageSkill[]> data.Payload;
      let returnData: FlatDamageSkill[] = [];
      payload.forEach(data => {
        let flatDamageSkill: FlatDamageSkill = new FlatDamageSkill(data.id, data.name, data.cost, data.element, data.description, data.allyCardId, data.mainCardId, data.aoe, data.minLevel, data.multiplier, data.maxDamageDice, data.damageDie, data.damageBonus);
        returnData.push(flatDamageSkill);
      });
      this.flatDamageSkillList.next(returnData);
    } else if(data.PayloadType === "FlatDamageAilmentSkill[]"){
      let payload = <FlatDamageAilmentSkill[]> data.Payload;
      let returnData: FlatDamageAilmentSkill[] = [];
      payload.forEach(data => {
        let flatDamageAilmentSkill: FlatDamageAilmentSkill = new FlatDamageAilmentSkill(data.id, data.name, data.cost, data.element, data.description, data.allyCardId, data.mainCardId, data.aoe, data.minLevel, data.multiplier, data.maxDamageDice, data.damageDie, data.damageBonus, data.ailmentType, data.ailmentFailValue);
        returnData.push(flatDamageAilmentSkill);
      });
      this.flatDamageAilmentSkillList.next(returnData);
    } else if(data.PayloadType === "FlatSupportSkill[]"){
      let payload = <FlatSupportSkill[]> data.Payload;
      let returnData: FlatSupportSkill[] = [];
      payload.forEach(data => {
        let flatSupportSkill: FlatSupportSkill = new FlatSupportSkill(data.id, data.name, data.cost, data.element, data.description, data.allyCardId, data.mainCardId, data.aoe, data.minLevel, data.supportType, data.supportValue);
        returnData.push(flatSupportSkill);
      });
      this.flatSupportSkillList.next(returnData);
    } else if(data.PayloadType === "FlatAilmentSkill[]"){
      let payload = <FlatAilmentSkill[]> data.Payload;
      let returnData: FlatAilmentSkill[] = [];
      payload.forEach(data => {
        let flatAilmentSkill: FlatAilmentSkill = new FlatAilmentSkill(data.id, data.name, data.cost, data.element, data.description, data.allyCardId, data.mainCardId, data.aoe, data.minLevel, data.ailmentType, data.ailmentFailValue);
        returnData.push(flatAilmentSkill);
      });
      this.flatAilmentSkillList.next(returnData);
    } else if(data.PayloadType === "FlatPassiveSkill[]"){
      let payload = <FlatPassiveSkill[]> data.Payload;
      let returnData: FlatPassiveSkill[] = [];
      payload.forEach(data => {
        let flatPassiveSkill: FlatPassiveSkill = new FlatPassiveSkill(data.id, data.name, data.cost, data.element, data.description, data.allyCardId, data.mainCardId, data.aoe, data.minLevel, data.passiveType, data.type, data.value, data.secondValue);
        returnData.push(flatPassiveSkill);
      });
      this.flatPassiveSkillList.next(returnData);
    }
  }

  getFullSkill(skillid: number): Subject<Map<number, FullSkill>> {
    this.sockService.sendMessage(`get|FullSkill|[${skillid}]`);
    return this.fullSkillMapSubject;
  }

  getFullSkillsList(): Subject<Map<number, FullSkill>> {
    this.sockService.sendMessage(`get|FullSkill|[]`);
    return this.fullSkillMapSubject;
  }

  getFlatSkillList(): Subject<FlatSkill[]> {
    this.sockService.sendMessage("get|FlatSkill|[]");
    return this.flatSkillList;
  }

  getFlatDamageSkillList(): Subject<FlatDamageSkill[]> {
    this.sockService.sendMessage("get|FlatDamageSkill|[]");
    return this.flatDamageSkillList;
  }

  addFlatDamageSkill(damageSkill: FlatDamageSkill) : void {
    this.sockService.sendMessage("add|FlatDamageSkill|" + JSON.stringify(damageSkill));
  }

  getFlatDamageAilmentSkillList(): Subject<FlatDamageAilmentSkill[]> {
    this.sockService.sendMessage("get|FlatDamageAilmentSkill|[]");
    return this.flatDamageAilmentSkillList;
  }

  addFlatDamageAilmentSkill(damageAilmentSkill: FlatDamageAilmentSkill) : void {
    this.sockService.sendMessage("add|FlatDamageAilmentSkill|" + JSON.stringify(damageAilmentSkill));
  }

  getFlatSupportSkillList(): Subject<FlatSupportSkill[]> {
    this.sockService.sendMessage("get|FlatSupportSkill|[]");
    return this.flatSupportSkillList;
  }

  addFlatSupportSkill(flatSupportSkill: FlatSupportSkill) : void {
    this.sockService.sendMessage("add|FlatSupportSkill|" + JSON.stringify(flatSupportSkill));
  }

  getFlatAilmentSkillList(): Subject<FlatAilmentSkill[]> {
    this.sockService.sendMessage("get|FlatAilmentSkill|[]");
    return this.flatAilmentSkillList;
  }

  addFlatAilmentSkill(ailmentSkill: FlatAilmentSkill) : void {
    this.sockService.sendMessage("add|FlatAilmentSkill|" + JSON.stringify(ailmentSkill));
  }

  getFlatPassiveSkillList(): Subject<FlatPassiveSkill[]> {
    this.sockService.sendMessage("get|FlatPassiveSkill|[]");
    return this.flatPassiveSkillList;
  }

  addFlatPassiveSkill(passiveSkill: FlatPassiveSkill) : void {
    this.sockService.sendMessage("add|FlatPassiveSkill|" + JSON.stringify(passiveSkill));
  }

  addPersonaSkill(personaSkill: PersonaSkill) : void {
    this.sockService.sendMessage("add|PersonaSkill|" + JSON.stringify(personaSkill));
  }
}
