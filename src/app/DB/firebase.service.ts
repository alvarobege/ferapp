import { Injectable } from '@angular/core';
import {Film} from '../films/interfaces/film'
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
}
