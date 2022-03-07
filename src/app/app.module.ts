
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Form imports
import{ReactiveFormsModule,FormsModule} from '@angular/forms';


//Angular Material imports

import {MatButtonModule} from '@angular/material/button'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';



import {MatToolbarModule} from '@angular/material/toolbar';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';

import {MatExpansionModule} from '@angular/material/expansion';

import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';


import {MatTableModule} from '@angular/material/table';


//to sort
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { HandComponent } from './hand/hand.component';
import {PackComponent} from './pack/pack.component';



//Store related imports
import { StoreModule } from '@ngrx/store';
import { packReducer } from './state/pack.reducer';
import { playerReducer } from './state/playerReducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DealerComponent } from './dealer/dealer.component';
import {playerHandsReducer} from './state/playerHandReducer'

//ToolBar for game parameters
import { SideToolBarComponent } from './side-tool-bar/side-tool-bar.component';
import { SideBarWrapperDirective } from './side-tool-bar/side-wrapper.directive';
import { PlayerComponent } from './player/player.component';
import { CardAreaComponent } from './card-area/card-area.component';

import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './home/home.component';
import { from } from 'rxjs';
import { NavbarDirective } from './navbar.directive';
import { SectionComponent } from './section/section.component';
import { TechniqueComponent } from './technique/technique.component';





@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    TableComponent,
    HandComponent,
    PackComponent,
    DealerComponent,
    SideToolBarComponent,
    SideBarWrapperDirective,
    PlayerComponent,
    CardAreaComponent,
    HomeComponent,
    NavbarDirective,
    SectionComponent,
    TechniqueComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Forms
    FormsModule,
    ReactiveFormsModule,

    //Angular Material related imports
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,

    MatAutocompleteModule,

    MatRadioModule,
    MatSelectModule,
    MatSliderModule,

    MatToolbarModule,

    MatGridListModule,
    MatCardModule,
    MatStepperModule,

    MatExpansionModule,

    MatChipsModule,
    MatIconModule,

    MatProgressBarModule,
    MatDialogModule,

    MatTableModule,


    //Store related imports
    StoreModule.forRoot({ players: playerReducer, pack: packReducer , playerHands: playerHandsReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
