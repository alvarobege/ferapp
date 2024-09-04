import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TmdbService } from '../../API/tmdb.service';
import { Film } from '../../interfaces/film';
import { FirebaseService } from '../../../DB/firebase.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss'
})
export class SearchModalComponent {

  filmToSearch: string = ""
  busqueda: any
  showSearch: boolean = false
  filmToAdd: Film = {
    name: "",
    year: "",
    poster_url:"",
    link: "",
    visto: false
  }

  constructor(
     public dialogRef: MatDialogRef<SearchModalComponent>,
     private tmdb: TmdbService,
     private db: FirebaseService ){}

  closeModal(): void{
    this.dialogRef.close()
  }

  search(){
    this.showSearch = true
    this.tmdb.searchFilm(this.filmToSearch).subscribe(
      (response: any) => {
      this.busqueda = response.results
    })
  }

  saveFilm(item: any){ 
    this.filmToAdd = {
      name: item.original_title,
      year: item.release_date.split("-")[0],
      poster_url: this.getCartel(item.poster_path),
      visto: false,
      link: `https://www.themoviedb.org/movie/${item.id}`
    }
    this.db.AddFilm(this.filmToAdd)
    this.dialogRef.close()
  }

  getCartel(path: string){
    return `https://image.tmdb.org/t/p/original${path}`
  }

}
