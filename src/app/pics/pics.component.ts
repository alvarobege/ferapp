import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../DB/firebase.service';
import {CreateAlbumComponent} from './components/create-modal/create-modal.component'
import { Album } from './interfaces/album';
import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';


@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
  styleUrl: './pics.component.scss'
})
export class PicsComponent implements OnInit {

  dbAlbums: Album[] = []
  picsList: string[] = []

  constructor(private db: FirebaseService, public dialog: MatDialog, private storage: Storage){}

  ngOnInit(): void {
    this.db.GetAlbums().subscribe((albums: Album[])=> {
      this.dbAlbums = albums
    })
  }

  openModal(){
    const dialogRef = this.dialog.open(CreateAlbumComponent , {
      width: '420px'
    })
  }

  getImages(album: string){
    const imagesRef =  ref(this.storage, album)
    listAll(imagesRef)
    .then(async response => {
      for(let i of response.items){
        const url = await getDownloadURL(i)
        this.picsList.push(url)
      }
    })
  }

}
