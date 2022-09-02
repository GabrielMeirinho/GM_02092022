import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsDetailComponent } from './accounts-detail/accounts-detail.component';
import { AccountsCreateComponent } from './accounts-create/accounts-create.component';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AccountsDetailComponent,
    AccountsCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
