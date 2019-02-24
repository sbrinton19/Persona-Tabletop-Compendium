import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Globals } from './Classes/Globals';
import { ServerRequestResponse } from './Classes/ServerRequestReponse';
import { Restriction } from './Classes/Restriction';
import { BoundRestriction } from './Classes/BoundRestriction';
import { Subject } from 'rxjs';
import { ServerRequest, ServerRequestType } from './Classes/ServerRequest';

@Injectable({
  providedIn: 'root'
})
export class RestrictionService implements OnDestroy {
  private restrictionList: Subject<Restriction[]> = new Subject<Restriction[]>();

  constructor(private sockService: WebsocketService) {
    this.sockService.connect(Globals.PERSONASERVER, this, this.onMessage);
  }

  public ngOnDestroy() {
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
      case 'Restriction[]':
        payload = reqResp.payload as Restriction[];
        payload.forEach(restriction => returnData.push(Restriction.copyConstructor(restriction)));
        this.restrictionList.next(returnData);
        break;
    }
  }

  getRestrictionList(): Subject<Restriction[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, Restriction.name, []).toString());
    return this.restrictionList;
  }

  addRestriction(restriction: Restriction): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, restriction.constructor.name, restriction).toString());
  }

  addBoundRestriction(boundRestriction: BoundRestriction): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, boundRestriction.constructor.name, boundRestriction).toString());
  }
}
