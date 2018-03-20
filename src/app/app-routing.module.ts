import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaeComponent } from './personae/personae.component';
import { PersonaComponent } from './persona/persona.component';
import { SkillsComponent } from './skills/skills.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  { path: '', redirectTo: '/personae', pathMatch: 'full' },
  { path: 'personae', component: PersonaeComponent },
  { path: 'persona/:id', component: PersonaComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'items', component: ItemsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
