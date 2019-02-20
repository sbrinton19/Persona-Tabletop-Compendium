import { Injectable, OnDestroy } from '@angular/core';
import { FlatActivity, FullActivity } from './Classes/FlatActivity';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { Globals } from './Classes/Globals';
import { Payload } from './Classes/Payload';
import { FlatVendor } from './Classes/FlatVendor';
import { FlatVendorItem } from './Classes/FlatVendorItem';

@Injectable({
  providedIn: 'root'
})
export class ActivityService implements OnDestroy {
  private flatActivityList: Subject<FlatActivity[]> = new Subject<FlatActivity[]>();
  private fullActivityMapSubject: Subject<Map<number, FullActivity>> = new Subject<Map<number, FullActivity>>();
  private fullActivityMap: Map<number, FullActivity> = new Map<number, FullActivity>();

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
    if (payloadObject.PayloadType === 'FlatActivity[]') {
      const payload = <FlatActivity[]> payloadObject.Payload;
      const returnData: FlatActivity[] = [];
      payload.forEach(element => {
        const activity: FlatActivity = FlatActivity.copyConstructor(element);
        returnData.push(activity);
      });
      this.flatActivityList.next(returnData);
    } else if (payloadObject.PayloadType === 'FullActivity[]') {
      const payload = <FullActivity[]> payloadObject.Payload;
      payload.forEach(element => {
        const activity: FullActivity = FullActivity.copyConstructor(element);
        this.fullActivityMap.set(activity.id, activity);
      });
      this.fullActivityMapSubject.next(this.fullActivityMap);
    }
  }

  getFlatActivityList(): Subject<FlatActivity[]> {
    this.sockService.sendMessage('get|FlatActivity|[]');
    return this.flatActivityList;
  }

  addFlatActivity(flatActivity: FlatActivity): void {
    this.sockService.sendMessage('add|FlatActivity|' + JSON.stringify(flatActivity));
  }

  addFlatVendor(flatVendor: FlatVendor): void {
    this.sockService.sendMessage('add|FlatVendor|' + JSON.stringify(flatVendor));
  }

  addFlatVendorItem(flatVendorItem: FlatVendorItem): void {
    this.sockService.sendMessage('add|FlatVendorItem|' + JSON.stringify(flatVendorItem));
  }

  getFullActivity(activityId: number): Subject<Map<number, FullActivity>> {
    this.sockService.sendMessage(`get|FullActivity|[${activityId}]`);
    return this.fullActivityMapSubject;
  }

  getFullActivityList(): Subject<Map<number, FullActivity>> {
    this.sockService.sendMessage('get|FullActivity|[]');
    return this.fullActivityMapSubject;
  }
}
