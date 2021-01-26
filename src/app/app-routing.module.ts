import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardDetailsFormComponent } from './card-details-form/card-details-form.component';

const routes: Routes = [
  { path: 'payment-details', component: CardDetailsFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
