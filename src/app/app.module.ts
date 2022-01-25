import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material imports 
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { PackComponent } from './pack/pack.component';
import { HandComponent } from './hand/hand.component';

//Store related imports
import { StoreModule } from '@ngrx/store';
import { packReducer } from './state/pack.reducer';
import { playerReducer } from './state/playerReducer';
import { possessedCardReducer } from './state/possessedCardsReducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DealerComponent } from './dealer/dealer.component';

//ToolBar for game parameters
import { SideToolBarComponent } from './side-tool-bar/side-tool-bar.component';
import { SideBarWrapperDirective } from './side-wrapper.directive';
import { SideOpenerDirective } from './side-opener.directive';

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
    SideOpenerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Angular Material related imports 
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,

    //Store related imports 
    StoreModule.forRoot({ players: playerReducer, pack: packReducer, possessedCard: possessedCardReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
