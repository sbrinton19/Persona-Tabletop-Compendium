import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FlatShadow, FullShadow } from '../Classes/FlatShadow';
import { WebsocketService } from './websocket.service';
import { Globals } from '../Classes/Globals';
import { ServerRequestResponse, OperationResult } from '../Classes/ServerRequestReponse';
import { ServerRequest, ServerRequestType } from '../Classes/ServerRequest';

@Injectable({
  providedIn: 'root'
})
export class ShadowService implements OnDestroy {
  private flatShadowList: Subject<FlatShadow[]> = new Subject<FlatShadow[]>();
  private fullShadowMap: Map<number, FullShadow> = new Map<number, FullShadow>();
  private fullShadowMapSubject: Subject<Map<number, FullShadow>> = new Subject<Map<number, FullShadow>>();
  private addShadowResult: Subject<OperationResult> = new Subject<OperationResult>();

  constructor(private sockService: WebsocketService) {
    this.sockService.connect(Globals.PERSONASERVER, this, this.onMessage);
  }

  public ngOnDestroy() {
    this.sockService.close();
  }

  private onMessage(message: MessageEvent): void {
    if (message.data === 'Failed to read database') {
      // TODO: Actually do something graceful
      return null;
    }
    const reqResp = JSON.parse(message.data) as ServerRequestResponse;
    // ServerRequestResponse.payload objects do not "autobox" into their respective object types
    // This means they don't have their member functions autodefined
    // So you have to use the static copyConstructor() rather than the member clone()
    let payload: any[];
    const returnData: any[] = [];
    switch (reqResp.payloadType) {
      case 'FlatShadow[]':
        payload = reqResp.payload as FlatShadow[];
        payload.forEach(shadow => returnData.push(FlatShadow.copyConstructor(shadow)));
        this.flatShadowList.next(returnData);
        break;
      case 'FullShadow[]':
        payload = reqResp.payload as FullShadow[];
        payload.forEach(shadow => this.fullShadowMap.set(shadow.id, FullShadow.copyConstructor(shadow)));
        this.fullShadowMapSubject.next(this.fullShadowMap);
        break;
      case 'AddShadowResult':
        const result = reqResp.payload as OperationResult;
        this.addShadowResult.next(result);
        break;
    }
  }

  getFlatShadowList(): Subject<FlatShadow[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatShadow.name, []).toString());
    return this.flatShadowList;
  }

  addFlatShadow(flatShadow: FlatShadow): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatShadow.constructor.name, flatShadow).toString());
  }

  addFullShadow(fullShadow: FullShadow): Subject<OperationResult> {
    if (fullShadow) {
      this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, fullShadow.constructor.name, fullShadow).toString());
    }
    return this.addShadowResult;
  }

  getFullShadow(id: number): Subject<Map<number, FullShadow>> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FullShadow.name, [id]).toString());
    return this.fullShadowMapSubject;
  }
}
