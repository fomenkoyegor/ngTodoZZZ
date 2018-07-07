import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddnotesComponent } from './addnotes/addnotes.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
   declarations: [
      AppComponent,
      UsersComponent,
      AdduserComponent,
      AddnotesComponent,
      NotesComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
