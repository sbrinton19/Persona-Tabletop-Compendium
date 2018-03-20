import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Skill } from './Classes/Skill';
import { of } from 'rxjs/observable/of';
import { skillList } from './Data/SkillData';

@Injectable()
export class SkillService {

  constructor() { }

  getSkillList(): Observable<Skill[]> {
    return of(skillList);
  }

}
