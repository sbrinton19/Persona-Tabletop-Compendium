import { Component, OnInit, Input } from '@angular/core';
import { FullSkill, FlatDamageSkill } from '../Classes/Skill';
import { ActivatedRoute } from '@angular/router';
import { SkillService } from '../skill.service';
import { ISubscription } from 'rxjs/Subscription';
import { DamageMultiplier } from '../Classes/DamageMultiplier';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  
  private skill: FullSkill;
  private Math = Math;
  private subscription: ISubscription;
  private baseDetail: string[] = ['Minimum Level', 'Area of Effect'];
  private damageDetail: string[] = ['Max Damage Dice', 'Damage Multiplier', 'Damage Bonus', 'Damage Die'];
  private ailmentDetail: string[] = ['Ailment', 'Ailment Failure Value'];
  private detailTableHeader: string[] = [];
  private detailTableValues: any[] = [];
  constructor(private route: ActivatedRoute, private skillService: SkillService) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ skillData }) => {
      this.skill = skillData.get(+this.route.snapshot.paramMap.get('id'));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDetailTableHeader(): string[] {
    this.detailTableHeader.push(...this.baseDetail);
    if(this.skill.skill.minLevel > 0) {
      this.detailTableValues.push(this.skill.skill.minLevel);
    } else {
      this.detailTableValues.push('-');
    }
    this.detailTableValues.push(this.skill.skill.getAoE());
    if(this.skill.skillClass == 'FlatDamageSkill' || this.skill.skillClass == 'FlatDamageAilmentSkill') {
      const temp: FlatDamageSkill = <FlatDamageSkill> this.skill.skill;
      if(temp.multiplier !== DamageMultiplier.None) {
        this.detailTableHeader.push(...this.damageDetail);
        this.detailTableValues.push(temp.maxDamageDice);
        this.detailTableValues.push(temp.getDamageMultiplierString());
        this.detailTableValues.push(temp.damageBonus);
        this.detailTableValues.push(temp.damageDie);
      }
    }
    return this.detailTableHeader;
  }
}
