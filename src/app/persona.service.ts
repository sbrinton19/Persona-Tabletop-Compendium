import { Injectable, OnDestroy } from '@angular/core';
import { FlatPersona, FullPersona } from './Classes/FlatPersona';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs';
import { ServerRequestResponse } from './Classes/ServerRequestReponse';
import { Globals } from './Classes/Globals';
import { ServerRequest, ServerRequestType } from './Classes/ServerRequest';

@Injectable()
export class PersonaService implements OnDestroy {
  private flatPersonaList: Subject<FlatPersona[]> = new Subject<FlatPersona[]>();
  private fullPersonaMap: Map<number, FullPersona> = new Map<number, FullPersona>();
  private fullPersonaMapSubject: Subject<Map<number, FullPersona>> = new Subject<Map<number, FullPersona>>();
  
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
      case 'FlatPersona[]':
        payload = reqResp.payload as FlatPersona[];
        payload.forEach(persona => returnData.push(FlatPersona.copyConstructor(persona)));
        this.flatPersonaList.next(returnData);
        break;
      case 'FullPersona[]':
        payload = reqResp.payload as FullPersona[];
        payload.forEach(persona => this.fullPersonaMap.set(persona.id, FullPersona.copyConstructor(persona)));
        this.fullPersonaMapSubject.next(this.fullPersonaMap);
        break;
    }
  }

  getFlatPersonaList(): Subject<FlatPersona[]> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FlatPersona.name, []).toString());
    return this.flatPersonaList;
  }

  addFlatPersona(flatPersona: FlatPersona): void {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Add, flatPersona.constructor.name, flatPersona).toString());
  }

  /**
   * This is a debug method; it should not be called in production code
   */
  getFullPersonaList(): Subject<Map<number, FullPersona>> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FullPersona.name, []).toString());
    return this.fullPersonaMapSubject;
  }

  getFullPersona(personaId: number): Subject<Map<number, FullPersona>> {
    this.sockService.sendMessage(new ServerRequest(ServerRequestType.Get, FullPersona.name, [personaId]).toString());
    return this.fullPersonaMapSubject;
  }
}
