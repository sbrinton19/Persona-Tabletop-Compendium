import { Component, OnInit, OnDestroy } from '@angular/core';
import { SkillService } from '../skill.service';
import { FlatSkill, FlatDamageSkill, PhysAilmentSkill, FlatDamageAilmentSkill, AilmentType, ElementalMagic, Element, AilmentFV, DivineKillMagic, BuffMagic, FlatSupportSkill, WallMagic, BreakMagic, FlatAilmentSkill, AilmentMagic, BoostSkill, FlatPassiveSkill, PassiveType, ReductionSkill, DodgeSkill, CounterSkill, RecoverySkill, MasterSkill, KillSkill, PostCombatSkill, GrowthSkill, ChainSkill, IrregularPassive } from '../Classes/Skill';
import { PersonaReference } from "../Classes/PersonaReference";
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy {
  sortOrder = false;
  displayList: FlatSkill[];
  private subscriptions: ISubscription[] = [];
  private flatSkillList: FlatSkill[] = [];

  constructor(private skillService: SkillService) { }

  public ngOnInit() {
    this.getFlatSkills();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  getFlatSkills(): void {
    this.subscriptions.push(
      this.skillService.getFlatSkillList().subscribe(skills => {
        this.flatSkillList = skills;
        this.displayList = this.flatSkillList;
      })
    );
  }

  orderBy(field: string, idx = 0): void {
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.flatSkillList, field, this.sortOrder, idx);
  }

  filterStr(filter): void {
    if (filter === '' && this.displayList.length !== this.flatSkillList.length) {
      this.displayList = this.flatSkillList;
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.flatSkillList, filter);
  }
}
