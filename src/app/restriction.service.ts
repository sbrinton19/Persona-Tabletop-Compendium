import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Globals } from './Classes/Globals';
import { Payload } from './Classes/Payload';
import { Restriction } from './Classes/Restriction';
import { BoundRestriction } from './Classes/BoundRestriction';
import { Subject } from 'rxjs';

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
    const payloadObject = <Payload> JSON.parse(response.data);
    if (payloadObject.PayloadType === 'Restriction[]') {
      const payloadData = <Restriction[]> payloadObject.Payload;
      const returnData: Restriction[] = [];
      payloadData.forEach(data => {
        const restrict: Restriction = Restriction.copyConstructor(data);
        returnData.push(restrict);
      });
      this.restrictionList.next(returnData);
    }
  }

  addRestriction(restriction: Restriction): void {
    this.sockService.sendMessage('add|Restriction|' + JSON.stringify(restriction));
  }

  getRestrictionsList(): Subject<Restriction[]> {
    this.sockService.sendMessage(`get|Restriction|[]`);
    return this.restrictionList;
  }

  addBoundRestriction(boundRestriction: BoundRestriction): void {
    this.sockService.sendMessage('add|BoundRestriction|' + JSON.stringify(boundRestriction));
  }
}
