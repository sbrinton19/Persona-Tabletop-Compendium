import { Injectable, OnDestroy } from '@angular/core';
import { FlatSkill, FlatDamageSkill, FlatDamageAilmentSkill, FlatSupportSkill,
  FlatAilmentSkill, FlatPassiveSkill, PersonaSkill, FullSkill } from './Classes/FlatSkill';
import { WebsocketService } from './websocket.service';
import { Payload } from './Classes/Payload';
import { Subject } from 'rxjs';
import { Globals } from './Classes/Globals';

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
    const payloadObject = <Payload> JSON.parse(response.data);
    if (payloadObject.PayloadType === 'FlatSkill[]') {
      const payloadData = <FlatSkill[]> payloadObject.Payload;
      const returnData: FlatSkill[] = [];
      payloadData.forEach(data => {
        const flatSkill: FlatSkill = FlatSkill.copyConstructor(data);
        returnData.push(flatSkill);
      });
      this.flatSkillList.next(returnData);
    } else if (payloadObject.PayloadType === 'FullSkill[]') {
      const payloadData = <FullSkill[]> payloadObject.Payload;
      payloadData.forEach(data => {
        const skill: FullSkill = FullSkill.copyConstructor(data);
        this.fullSkillMap.set(data.skill.id, skill);
      });
      this.fullSkillMapSubject.next(this.fullSkillMap);
    } else if (payloadObject.PayloadType === 'FlatDamageSkill[]') {
      const payloadData = <FlatDamageSkill[]> payloadObject.Payload;
      const returnData: FlatDamageSkill[] = [];
      payloadData.forEach(data => {
        const flatDamageSkill: FlatDamageSkill = FlatDamageSkill.copyConstructor(data);
        returnData.push(flatDamageSkill);
      });
      this.flatDamageSkillList.next(returnData);
    } else if (payloadObject.PayloadType === 'FlatDamageAilmentSkill[]') {
      const payloadData = <FlatDamageAilmentSkill[]> payloadObject.Payload;
      const returnData: FlatDamageAilmentSkill[] = [];
      payloadData.forEach(data => {
        const flatDamageAilmentSkill: FlatDamageAilmentSkill = FlatDamageAilmentSkill.copyConstructor(data);
        returnData.push(flatDamageAilmentSkill);
      });
      this.flatDamageAilmentSkillList.next(returnData);
    } else if (payloadObject.PayloadType === 'FlatSupportSkill[]') {
      const payloadData = <FlatSupportSkill[]> payloadObject.Payload;
      const returnData: FlatSupportSkill[] = [];
      payloadData.forEach(data => {
        const flatSupportSkill: FlatSupportSkill = FlatSupportSkill.copyConstructor(data);
        returnData.push(flatSupportSkill);
      });
      this.flatSupportSkillList.next(returnData);
    } else if (payloadObject.PayloadType === 'FlatAilmentSkill[]') {
      const payloadData = <FlatAilmentSkill[]> payloadObject.Payload;
      const returnData: FlatAilmentSkill[] = [];
      payloadData.forEach(data => {
        const flatAilmentSkill: FlatAilmentSkill = FlatAilmentSkill.copyConstructor(data);
        returnData.push(flatAilmentSkill);
      });
      this.flatAilmentSkillList.next(returnData);
    } else if (payloadObject.PayloadType === 'FlatPassiveSkill[]') {
      const payloadData = <FlatPassiveSkill[]> payloadObject.Payload;
      const returnData: FlatPassiveSkill[] = [];
      payloadData.forEach(data => {
        const flatPassiveSkill: FlatPassiveSkill = FlatPassiveSkill.copyConstructor(data);
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
    this.sockService.sendMessage('get|FlatSkill|[]');
    return this.flatSkillList;
  }

  getFlatDamageSkillList(): Subject<FlatDamageSkill[]> {
    this.sockService.sendMessage('get|FlatDamageSkill|[]');
    return this.flatDamageSkillList;
  }

  addFlatDamageSkill(damageSkill: FlatDamageSkill): void {
    this.sockService.sendMessage('add|FlatDamageSkill|' + JSON.stringify(damageSkill));
  }

  getFlatDamageAilmentSkillList(): Subject<FlatDamageAilmentSkill[]> {
    this.sockService.sendMessage('get|FlatDamageAilmentSkill|[]');
    return this.flatDamageAilmentSkillList;
  }

  addFlatDamageAilmentSkill(damageAilmentSkill: FlatDamageAilmentSkill): void {
    this.sockService.sendMessage('add|FlatDamageAilmentSkill|' + JSON.stringify(damageAilmentSkill));
  }

  getFlatSupportSkillList(): Subject<FlatSupportSkill[]> {
    this.sockService.sendMessage('get|FlatSupportSkill|[]');
    return this.flatSupportSkillList;
  }

  addFlatSupportSkill(flatSupportSkill: FlatSupportSkill): void {
    this.sockService.sendMessage('add|FlatSupportSkill|' + JSON.stringify(flatSupportSkill));
  }

  getFlatAilmentSkillList(): Subject<FlatAilmentSkill[]> {
    this.sockService.sendMessage('get|FlatAilmentSkill|[]');
    return this.flatAilmentSkillList;
  }

  addFlatAilmentSkill(ailmentSkill: FlatAilmentSkill): void {
    this.sockService.sendMessage('add|FlatAilmentSkill|' + JSON.stringify(ailmentSkill));
  }

  getFlatPassiveSkillList(): Subject<FlatPassiveSkill[]> {
    this.sockService.sendMessage('get|FlatPassiveSkill|[]');
    return this.flatPassiveSkillList;
  }

  addFlatPassiveSkill(passiveSkill: FlatPassiveSkill): void {
    this.sockService.sendMessage('add|FlatPassiveSkill|' + JSON.stringify(passiveSkill));
  }

  addPersonaSkill(personaSkill: PersonaSkill): void {
    this.sockService.sendMessage('add|PersonaSkill|' + JSON.stringify(personaSkill));
  }
}
