import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaeComponent } from './personae/personae.component';
import { PersonaComponent } from './persona/persona.component';
import { SkillsComponent } from './skills/skills.component';
import { ItemsComponent } from './items/items.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { ArmorsComponent } from './armors/armors.component';
import { AccessoriesComponent } from './accessories/accessories.component';

const routes: Routes = [
  { path: '', redirectTo: '/personae', pathMatch: 'full' },
  { path: 'personae', component: PersonaeComponent },
  { path: 'persona/:id', component: PersonaComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'armors', component: ArmorsComponent },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'items', component: ItemsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
