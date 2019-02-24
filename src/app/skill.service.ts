import { Injectable, OnDestroy } from '@angular/core';
import { FlatSkill, FlatDamageSkill, FlatDamageAilmentSkill, FlatSupportSkill,
  FlatAilmentSkill, FlatPassiveSkill, PersonaSkill, FullSkill } from './Classes/FlatSkill';
import { WebsocketService } from './websocket.service';
import { ServerRequestResponse } from './Classes/ServerRequestReponse';
import { Subject } from 'rxjs';
import { Globals } from './Classes/Globals';
import { ServerRequest, ServerRequestType } from './Classes/ServerRequest';

@Injectable()
export class SkillService implements OnDestroy {
  private flatSkillList: Subject<FlatSkill[]> = new Subject<FlatSkill[]>();
  private flatDamageSkillList: Subject<FlatDamageSkill[]> = new Subject<FlatDamageSkill[]>();
  private flatDamageAilmentSkillList: Subject<FlatDamageAilmentSkill[]> = new Subject<FlatDamageAilmentSkill[]>();
  private flatAilmentSkillList: Subject<FlatAilmentSkill[]> = new Subject<FlatAilmentSkill[]>();
  private flatSupportSkillList: Subject<FlatSupportSkill[]> = new Subject<FlatSupportSkill[]>();
  private flatPassiveSkillList: Subject<FlatPassiveSkill[]> = new Subject<FlatPassiveSkill[]>();
  private fullSkillMap: Map<number, FullSkill> = new Map<number, FullSkill>();
  private fullSkillMapSubject: Subject<Map<number, FullSkill>> = new Subject<Map<number, FullSkill>>();

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
      case 'FlatSkill[]':
        payload = reqResp.payload as FlatSkill[];
        payload.forEach(skill => returnData.push(FlatSkill.copyConstructor(skill)));
        this.flatSkillList.next(returnData);
        break;
      case 'FlatDamageSkill[]':
        payload = reqResp.payload as FlatDamageSkill[];
        payload.forEach(damageSkill => returnData.push(FlatDamageSkill.copyConstructor(damageSkill)));
        this.flatDamageSkillList.next(returnData);
        break;
      case 'FlatDamageAilmentSkill[]':
        payload = reqResp.payload as FlatDamageAilmentSkill[];
        payload.forEach(damageAilmentSkill => returnData.push(FlatDamageAilmentSkill.copyConstructor(damageAilmentSkill)));
        this.flatDamageAilmentSkillList.next(returnData);
        break;
      case 'FlatAilmentSkill[]':
        payload = reqResp.payload as FlatAilmentSkill[];
        payload.forEach(ailmentSkill => returnData.push(FlatAilmentSkill.copyConstructor(ailmentSkill)));
        this.flatAilmentSkillList.next(returnData);
        break;
      case 'FlatSupportSkill[]':
        payload = reqResp.payload as FlatSupportSkill[];
        payload.forEach(supportSkill => returnData.push(FlatSupportSkill.copyConstructor(supportSkill)));
        this.flatSupportSkillList.next(returnData);
        break;
      case 'FlatPassiveSkill[]':
        payload = reqResp.payload as FlatPassiveSkill[];
        payload.forEach(passiveSkill => returnData.push(FlatPassiveSkill.copyConstructor(passiveSkill)));
        this.flatPassiveSkillList.next(returnData);
        break;
      case 'FullSkill[]':
        payload = reqResp.payload as FullSkill[];
        payload.forEach(skill => this.fullSkillMap.set(skill.skill.id, FullSkill.copyConstructor(skill)));
        this.fullSkillMapSubject.next(this.fullSkillMap);
        break;
    }
  }

  getFlatSkillList(): Subject<FlatSkill[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatSkill.name, []).toString());
    return this.flatSkillList;
  }

  getFlatDamageSkillList(): Subject<FlatDamageSkill[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatDamageSkill.name, []).toString());
    return this.flatDamageSkillList;
  }

  addFlatDamageSkill(flatDamageSkill: FlatDamageSkill): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatDamageSkill.constructor.name, flatDamageSkill).toString());
  }

  getFlatDamageAilmentSkillList(): Subject<FlatDamageAilmentSkill[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatDamageAilmentSkill.name, []).toString());
    return this.flatDamageAilmentSkillList;
  }

  addFlatDamageAilmentSkill(flatDamageAilmentSkill: FlatDamageAilmentSkill): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatDamageAilmentSkill.constructor.name, flatDamageAilmentSkill).toString());
  }

  getFlatAilmentSkillList(): Subject<FlatAilmentSkill[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatAilmentSkill.name, []).toString());
    return this.flatAilmentSkillList;
  }

  addFlatAilmentSkill(flatAilmentSkill: FlatAilmentSkill): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatAilmentSkill.constructor.name, flatAilmentSkill).toString());
  }

  getFlatSupportSkillList(): Subject<FlatSupportSkill[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatSupportSkill.name, []).toString());
    return this.flatSupportSkillList;
  }

  addFlatSupportSkill(flatSupportSkill: FlatSupportSkill): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatSupportSkill.constructor.name, flatSupportSkill).toString());
  }

  getFlatPassiveSkillList(): Subject<FlatPassiveSkill[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatPassiveSkill.name, []).toString());
    return this.flatPassiveSkillList;
  }

  addFlatPassiveSkill(flatPassiveSkill: FlatPassiveSkill): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatPassiveSkill.constructor.name, flatPassiveSkill).toString());
  }

  /**
   * This is a debug method; it should not be called in production code
   */
  getFullSkillsList(): Subject<Map<number, FullSkill>> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FullSkill.name, []).toString());
    return this.fullSkillMapSubject;
  }

  getFullSkill(skillId: number): Subject<Map<number, FullSkill>> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FullSkill.name, [skillId]).toString());
    return this.fullSkillMapSubject;
  }

  // PersonaSkill is tightly bound to the skill class so it is a part of the skill service
  addPersonaSkill(personaSkill: PersonaSkill): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, personaSkill.constructor.name, personaSkill).toString());
  }
}
