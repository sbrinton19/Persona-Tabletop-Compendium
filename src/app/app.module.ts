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
import { WeaponsComponent } from './weapons/weapons.component';
import { ArmorsComponent } from './armors/armors.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaeComponent,
    OrderByPipe,
    FilterPipe,
    PersonaComponent,
    SkillsComponent,
    ItemsComponent,
    WeaponsComponent,
    ArmorsComponent,
    AccessoriesComponent,
    PaginationComponent
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
