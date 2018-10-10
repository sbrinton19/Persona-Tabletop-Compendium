import { Injectable, OnDestroy } from '@angular/core';
import { FlatPersona, FullPersona } from './Classes/Persona';
import { ElemResist } from "./Classes/ElemResist";
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs';
import { Payload } from './Classes/Payload';

@Injectable()
export class PersonaService implements OnDestroy{

  private flatPersonaeList: Subject<FlatPersona[]> = new Subject<FlatPersona[]>();
  private fullPersonaeMapSubject: Subject<Map<number, FullPersona>> = new Subject<Map<number, FullPersona>>();
  private fullPersonaeMap: Map<number, FullPersona> = new Map<number, FullPersona>();
  constructor(private sockService: WebsocketService) { 
    this.sockService.connect("ws://localhost:1992", this, this.onMessage);
  }

  public ngOnDestroy() {
    this.sockService.close();
  }

  private onMessage(message: MessageEvent): void {
    if (message.data === "Failed to read database") {
      //TODO: Actually do something graceful
      return null;
    }

    let data = <Payload> JSON.parse(message.data);
    if(data.PayloadType === "FlatPersona[]"){
      let payload = <FlatPersona[]> data.Payload;
      let returnData: FlatPersona[] = [];
      payload.forEach(element => {
        let persona: FlatPersona = FlatPersona.copyConstructor(element);
        returnData.push(persona);
      });
      this.flatPersonaeList.next(returnData);
    } else if (data.PayloadType == "FullPersona[]"){
      let payload = <FullPersona[]> data.Payload;
      payload.forEach(element => {
        let persona: FullPersona = FullPersona.copyConstructor(element);
        this.fullPersonaeMap.set(persona.id, persona);
      });
      this.fullPersonaeMapSubject.next(this.fullPersonaeMap);
    }
  }

  getFlatPersonaeList(): Subject<FlatPersona[]> {
    this.sockService.sendMessage("get|FlatPersona|[]");
    return this.flatPersonaeList;
  }

  addFlatPersona(persona: FlatPersona): void {
    this.sockService.sendMessage("add|FlatPersona|"+JSON.stringify(persona));
  }

  getFullPersona(personaid: number): Subject<Map<number, FullPersona>> {
    this.sockService.sendMessage(`get|FullPersona|[${personaid}]`);
    return this.fullPersonaeMapSubject;
  }

  // This is a validation method it should not be called
  private getFullPersonaeList(): Subject<Map<number, FullPersona>> {
    this.sockService.sendMessage(`get|FullPersona|[]`);
    return this.fullPersonaeMapSubject;
  }
}
