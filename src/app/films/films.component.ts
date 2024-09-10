import { Component, EventEmitter, OnInit } from '@angular/core';
import { TmdbService } from './API/tmdb.service';
import { FirebaseService } from '../DB/firebase.service'
import { Film } from './interfaces/film'
import { MatDialog } from '@angular/material/dialog';
import { SearchModalComponent } from './components/search-modal/search-modal.component'

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent implements OnInit {

  showSearch : boolean = false
  showSeen:boolean = false
  DbFilms: Film[] = []
    


  constructor(private db: FirebaseService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getDbFilms()
  }

  getDbFilms(){
    this.db.GetFilms().subscribe((films: Film[])=> {
      this.DbFilms = films
    })
  }


  openModal(){
    const dialogRef = this.dialog.open(SearchModalComponent , {
      width: '420px'
    })

    dialogRef.afterClosed().subscribe(()=>{
      this.getDbFilms()
    })
  }

  seeFilm(f: Film){
    f.visto = !f.visto
    this.db.Updatefilm(f)
    this.getDbFilms()
  }

  filterFilms(){
    this.showSeen = !this.showSeen
  }

  
  getCartel(path: string){
    return `https://image.tmdb.org/t/p/original${path}`
  }
}
