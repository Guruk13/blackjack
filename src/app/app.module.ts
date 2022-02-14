import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Form imports
import{ReactiveFormsModule,FormsModule} from '@angular/forms';


//Angular Material imports
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { PackComponent } from './pack/pack.component';
import {MatTableModule} from '@angular/material/table'
import { HandComponent } from './hand/hand.component';

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
import { posssessedCardReducer } from './state/possessedCardReducer';


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


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Forms
    FormsModule,
    ReactiveFormsModule,

    //Angular Material related imports
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatTableModule,

    //Store related imports
    StoreModule.forRoot({ players: playerReducer, pack: packReducer , playerHands: playerHandsReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
