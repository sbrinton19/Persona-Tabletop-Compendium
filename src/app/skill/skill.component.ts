import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FullSkill, FlatDamageSkill, FlatAilmentSkill, FlatSupportSkill, FlatPassiveSkill } from '../Classes/FlatSkill';
import { ActivatedRoute } from '@angular/router';
import { SkillService } from '../skill.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { DamageMultiplier } from '../Enums/DamageMultiplier';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit, OnDestroy {
  private skill: FullSkill;
  private subscription: ISubscription;
  private readonly baseDetail: string[] = ['Minimum Level', 'Area of Effect'];
  private readonly damageDetail: string[] = ['Max Damage Dice', 'Damage Multiplier', 'Damage Bonus', 'Damage Die'];
  private readonly damageAnalysis: string[] = ['Modifier', 'Min Damage', 'Avg Damage', 'Max Damage'];
  private standardDamage: number[] = [];
  private readonly ailmentDetail: string[] = ['Ailment', 'Ailment Failure Value'];
  private readonly supportDetail: string[] = ['Support Type', 'Support Details'];
  private readonly passiveDetail: string[] = ['Passive Type', 'Passive Skill Type', 'Passive Value', 'Passive Second Value'];
  private detailTableHeader: string[] = [];
  private detailTableValues: any[] = [];
  constructor(private route: ActivatedRoute, private skillService: SkillService) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ skillData }) => {
      this.skill = skillData.get(+this.route.snapshot.paramMap.get('id'));
      this.initSkillTable();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initSkillTable(): void {
    if (this.detailTableHeader.length > 0) {
      return;
    }
    this.detailTableHeader.push(...this.baseDetail);
    if (this.skill.skill.minLevel > 0) {
      this.detailTableValues.push(this.skill.skill.minLevel);
    } else {
      this.detailTableValues.push('-');
    }
    this.detailTableValues.push(this.skill.skill.getFormattedAoE());
    if (this.skill.skillClass === 'FlatDamageSkill' || this.skill.skillClass === 'FlatDamageAilmentSkill') {
      const temp: FlatDamageSkill = <FlatDamageSkill> this.skill.skill;
      if (temp.multiplier !== DamageMultiplier.None) {
        this.detailTableHeader.push(...this.damageDetail);
        this.detailTableValues.push(temp.maxDamageDice);
        this.detailTableValues.push(temp.getDamageMultiplierString());
        this.detailTableValues.push(temp.damageBonus);
        this.detailTableValues.push(temp.damageDie);
        this.standardDamage.push(temp.minDamage);
        this.standardDamage.push(temp.avgDamage);
        this.standardDamage.push(temp.maxDamage);
      }
    }
    if (this.skill.skillClass === 'FlatDamageAilmentSkill' || this.skill.skillClass === 'FlatAilmentSkill') {
      const temp: FlatAilmentSkill = <FlatAilmentSkill> this.skill.skill;
      this.detailTableHeader.push(...this.ailmentDetail);
      this.detailTableValues.push(temp.getAilmentName());
      this.detailTableValues.push(temp.ailmentFailValue);
    }
    if (this.skill.skillClass === 'FlatSupportSkill') {
      const temp: FlatSupportSkill = <FlatSupportSkill> this.skill.skill;
      this.detailTableHeader.push(...this.supportDetail);
      this.detailTableValues.push(temp.getSupportTypeName());
      this.detailTableValues.push(temp.getFormattedSupportValue());
    }
    if (this.skill.skillClass === 'FlatPassiveSkill') {
      const temp: FlatPassiveSkill = <FlatPassiveSkill> this.skill.skill;
      this.detailTableHeader.push(...this.passiveDetail);
      this.detailTableValues.push(temp.getPassiveTypeName());
      this.detailTableValues.push(temp.getPassiveSkillTypeName());
      this.detailTableValues.push(temp.getFormattedPrimaryValue());
      this.detailTableValues.push(temp.getFormattedSecondaryValue());
    }
  }

  isSplitTable(): boolean {
    return this.detailTableHeader.length > 4;
  }

  splitTableIndex(): number {
    return this.detailTableHeader.length / 2;
  }
}
