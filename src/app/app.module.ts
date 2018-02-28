import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BookComponent } from './book/book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { MapsComponent } from './maps/maps.component';

import { AgmCoreModule } from '@agm/core';
import { CreateClosedPathComponent } from './create-closed-path/create-closed-path.component';
import { PathService } from './path.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { InformationComponent } from './information/information.component'

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent,
    MapsComponent,
    CreateClosedPathComponent,
    InformationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AgmSnazzyInfoWindowModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCClygae8_Kpw-FzEwjoVgJQf4A8NfO4Ew'
    })
  ],
  providers: [ PathService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
