import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatCardModule, MatButtonModule, MatSelectModule, MatTooltipModule, MatProgressBarModule, MatToolbarModule, MatMenuModule, MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PersonaeComponent } from './personae/personae.component';
import { AppRoutingModule } from './/app-routing.module';
import { OrderByPipe } from './Pipes/order-by-pipe';
import { PersonaComponent } from './persona/persona.component';
import { PersonaService } from './Services/persona.service';
import { PersonaResolver } from './persona.resolver';
import { ItemService } from './Services/item.service';
import { FilterPipe } from './Pipes/filter-pipe';
import { SkillsComponent } from './skills/skills.component';
import { SkillService } from './Services/skill.service';
import { SkillResolver } from './skill.resolver';
import { ItemsComponent } from './items/items.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { ArmorsComponent } from './armors/armors.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SkillComponent } from './skill/skill.component';
import { WebsocketService } from './Services/websocket.service';
import { ItemComponent } from './item/item.component';
import { StringFilterComponent } from './string-filter/string-filter.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityService } from './Services/activity.service';
import { RestrictionService } from './Services/restriction.service';
import { ActivityComponent } from './activity/activity.component';
import { ItemResolver } from './item.resolver';
import { ShadowComponent } from './shadow/shadow.component';
import { ShadowsComponent } from './shadows/shadows.component';
import { ShadowService } from './Services/shadow.service';
import { FilteredTableComponent } from './filtered-table/filtered-table.component';
import { RouterLinkComponent } from './router-link/router-link.component';
import { SplitableSingleRowTableComponent } from './splitable-single-row-table/splitable-single-row-table.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { LoadFromDialogComponent } from './load-from-dialog/load-from-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

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
    PaginationComponent,
    SkillComponent,
    ItemComponent,
    StringFilterComponent,
    ActivitiesComponent,
    ActivityComponent,
    ShadowComponent,
    ShadowsComponent,
    FilteredTableComponent,
    RouterLinkComponent,
    SplitableSingleRowTableComponent,
    EditableTableComponent,
    LoadFromDialogComponent,
    AlertDialogComponent,
  ],
  entryComponents: [
    LoadFromDialogComponent,
    AlertDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
  ],
  providers: [
    WebsocketService,
    PersonaService,
    ItemService,
    SkillService,
    ActivityService,
    RestrictionService,
    ShadowService,
    PersonaResolver,
    SkillResolver,
    ItemResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
