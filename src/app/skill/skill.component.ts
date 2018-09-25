import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../Classes/Skill';
import { ActivatedRoute } from '@angular/router';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @Input() skill: Skill;
  Math = Math;
  constructor(private route: ActivatedRoute, private skillService: SkillService) { }


  ngOnInit(): void {
    this.getSkills();
  }

  getSkills(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.skillService.getSkillList().subscribe(skills => this.skill = skills.find(s => s.id === id));
  }

}
