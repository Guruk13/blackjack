import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { PackComponent } from './pack/pack.component';
import { HandComponent } from './hand/hand.component';

//Store related imports
import { StoreModule } from '@ngrx/store';
import { packReducer } from './state/pack.reducer';
import { playerHandsReducer } from './state/playerhandsreducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';




@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    TableComponent,
    HandComponent,
    PackComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    StoreModule.forRoot({ playerHand: playerHandsReducer, pack: packReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
