import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PersonaeComponent } from './personae/personae.component';
import { AppRoutingModule } from './/app-routing.module';
import { OrderByPipe } from './Pipes/order-by-pipe';
import { PersonaComponent } from './persona/persona.component';
import { PersonaService } from './persona.service';
import { ItemService } from './item.service';
import { FilterPipe } from './Pipes/filter-pipe';
import { SkillsComponent } from './skills/skills.component';
import { SkillService } from './skill.service';
import { ItemsComponent } from './items/items.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaeComponent,
    OrderByPipe,
    FilterPipe,
    PersonaComponent,
    SkillsComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    PersonaService,
    ItemService,
    SkillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
