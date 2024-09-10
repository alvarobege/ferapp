import { Injectable } from '@angular/core';
import {Film} from '../films/interfaces/film'
import {Album} from '../pics/interfaces/album'
import { Firestore,collection, addDoc, collectionData, setDoc, doc, deleteDoc} from '@angular/fire/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private firestore: Firestore) {}

  AddFilm(f: Film){
    const filmRef = collection(this.firestore, 'films')
    return addDoc(filmRef, f)
  }

  GetFilms(): Observable<Film[]> {
    const filmRef = collection(this.firestore, 'films')
    return collectionData(filmRef, { idField: 'id'}) as Observable<Film[]>
  }

  Updatefilm(f: Film){
    console.log(f.id)
    const docRef = doc(this.firestore, 'films', f.id!)
    return setDoc(docRef, f)
  }

  RemoveFilm(f: Film){
    console.log(f.id)
    const docRef = doc(this.firestore, 'films', f.id!)
    return deleteDoc(docRef)
  }

  GetAlbums(): Observable<any[]>  {
    const albumRef = collection(this.firestore, 'albums')
    return collectionData(albumRef, { idField: 'id'}) as Observable<Album[]>
  }

  AddAlbum(a: Album){
    const albumRef = collection(this.firestore, 'albums')
    return addDoc(albumRef, a)
  }
}
