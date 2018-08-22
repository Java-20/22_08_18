import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpProvider} from './providers/http.provider';
import {StoreProvider} from './providers/store.provider';


const routers: Routes = [
  {path:'', component:MainComponent},
  {path:'contacts', component: ContactsComponent, children:[
      {path:':id', component: ContactInfoComponent}
    ]},
  {path:'add', component: AddContactComponent},
  {path:'login',component:LoginComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ContactsComponent,
    AddContactComponent,
    ContactInfoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routers),
    HttpClientModule
  ],
  providers: [HttpProvider,StoreProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
