import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaeComponent } from './personae/personae.component';
import { PersonaComponent } from './persona/persona.component';
import { SkillsComponent } from './skills/skills.component';
import { ItemsComponent } from './items/items.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { ArmorsComponent } from './armors/armors.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { SkillComponent } from './skill/skill.component';
import { PersonaResolver } from './persona.resolver';
import { SkillResolver } from './skill.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/personae', pathMatch: 'full' },
  { path: 'personae', component: PersonaeComponent },
  { path: 'persona/:id', component: PersonaComponent, resolve: { personaData: PersonaResolver } },
  { path: 'skills', component: SkillsComponent },
  { path: 'skill/:id', component: SkillComponent, resolve: { skillData: SkillResolver } },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'armors', component: ArmorsComponent },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'items', component: ItemsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PersonaResolver]
})
export class AppRoutingModule { }
