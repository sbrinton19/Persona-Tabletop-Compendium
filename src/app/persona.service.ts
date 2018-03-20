import { Injectable } from '@angular/core';
import { Persona } from './Classes/Persona';
import { personaeList } from './Data/PersonaeData';
import { personaeMap } from './Data/PersonaeData';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PersonaService {

  constructor() { }

  getPersonaeList(): Observable<Persona[]> {
    return of(personaeList);
  }
  
  getPersonaeMap(): Observable<Map<string, Persona>> {
    return of(personaeMap);
  }
}
