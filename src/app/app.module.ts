import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardDetailsFormComponent } from './card-details-form/card-details-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { cardDetailsReducer } from './store/card-details.reducer';
import { CreditCardDirective } from './Directives/credit-card.directive';

@NgModule({
  declarations: [
    AppComponent,
    CardDetailsFormComponent,
    CreditCardDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({cardDetails : cardDetailsReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
