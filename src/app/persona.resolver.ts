import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { PersonaService } from './persona.service';
import { FullPersona } from './Classes/FlatPersona';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PersonaResolver implements Resolve<Map<number, FullPersona>> {
  constructor(private personaService: PersonaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<number, FullPersona>> {
    return this.personaService.getFullPersona(+route.params['id']).asObservable().pipe(first());
  }
}
