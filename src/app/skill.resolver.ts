import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FullSkill } from "./Classes/Skill";
import { SkillService } from "./skill.service";
import { first } from "rxjs/operators";

@Injectable()
export class SkillResolver implements Resolve<Map<number,FullSkill>> {
  constructor(private skillService: SkillService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<number,FullSkill>> {
    return this.skillService.getFullSkill(+route.params['id']).asObservable().pipe(first());
  }
}