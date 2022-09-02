import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsCreateComponent } from './accounts-create/accounts-create.component';
import { AccountsDetailComponent } from './accounts-detail/accounts-detail.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'accountsdetails', component: AccountsDetailComponent },
  { path: 'accountscreate', component: AccountsCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
