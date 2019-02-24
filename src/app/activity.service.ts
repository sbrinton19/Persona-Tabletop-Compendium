import { Injectable, OnDestroy } from '@angular/core';
import { FlatActivity, FullActivity } from './Classes/FlatActivity';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { Globals } from './Classes/Globals';
import { ServerRequestResponse } from './Classes/ServerRequestReponse';
import { FlatVendor } from './Classes/FlatVendor';
import { FlatVendorItem } from './Classes/FlatVendorItem';
import { ServerRequest, ServerRequestType } from './Classes/ServerRequest';

@Injectable({
  providedIn: 'root'
})
export class ActivityService implements OnDestroy {
  private flatActivityList: Subject<FlatActivity[]> = new Subject<FlatActivity[]>();
  private fullActivityMap: Map<number, FullActivity> = new Map<number, FullActivity>();
  private fullActivityMapSubject: Subject<Map<number, FullActivity>> = new Subject<Map<number, FullActivity>>();

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
      case 'FlatActivity[]':
        payload = reqResp.payload as FlatActivity[];
        payload.forEach(activity => returnData.push(FlatActivity.copyConstructor(activity)));
        this.flatActivityList.next(returnData);
        break;
      case 'FullActivity[]':
        payload = reqResp.payload as FullActivity[];
        payload.forEach(activity => this.fullActivityMap.set(activity.id, FullActivity.copyConstructor(activity)));
        this.fullActivityMapSubject.next(this.fullActivityMap);
        break;
    }
  }

  getFlatActivityList(): Subject<FlatActivity[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatActivity.name, []).toString());
    return this.flatActivityList;
  }

  addFlatActivity(flatActivity: FlatActivity): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatActivity.constructor.name, flatActivity).toString());
  }

  /**
   * This is a debug method; it should not be called in production code
   */
  getFullActivityList(): Subject<Map<number, FullActivity>> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FullActivity.name, []).toString());
    return this.fullActivityMapSubject;
  }

  getFullActivity(activityId: number): Subject<Map<number, FullActivity>> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FullActivity.name, [activityId]).toString());
    return this.fullActivityMapSubject;
  }

  // Vendor objects are currently inextricably bound to activities
  // So they're handled as a part of the activity service

  addFlatVendor(flatVendor: FlatVendor): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatVendor.constructor.name, flatVendor).toString());
  }

  addFlatVendorItem(flatVendorItem: FlatVendorItem): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatVendorItem.constructor.name, flatVendorItem).toString());
  }
}
