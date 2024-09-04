import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FilmsComponent } from './films/films.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SearchModalComponent } from './films/components/search-modal/search-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MusicComponent } from './music/music/music.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    SearchModalComponent,
    MusicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"ferandirene","appId":"1:400956120729:web:cf5b79dc6e52cf7434a208","storageBucket":"ferandirene.appspot.com","apiKey":"AIzaSyB18Se-VvnwiA4SbQAOOI8-t76m2-C_x6c","authDomain":"ferandirene.firebaseapp.com","messagingSenderId":"400956120729"})),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
