import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../DB/firebase.service';
import {CreateAlbumComponent} from './components/create-modal/create-modal.component'
import {DeleteModalComponent} from './components/delete-modal/delete-modal.component'
import { Album } from './interfaces/album';
import { Storage, ref, listAll, getDownloadURL, deleteObject } from '@angular/fire/storage';


@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
  styleUrl: './pics.component.scss'
})
export class PicsComponent implements OnInit {

  dbAlbums: Album[] = []
  picsList: string[] = []
  showFullScreen: boolean = false
  indexToShow: number = 0

  constructor(private db: FirebaseService, public dialog: MatDialog, private storage: Storage){}

  ngOnInit(): void {
    this.db.GetAlbums().subscribe((albums: Album[])=> {
      this.dbAlbums = albums
    })
  }

  openModalCreate(){
    const dialogRef = this.dialog.open(CreateAlbumComponent , {
      width: '420px'
    })
  }

  openModalDelete(){
    const dialogRef = this.dialog.open(DeleteModalComponent , {
      width: '420px'
    })
  }

  goFullScreen(index : number){
    this.showFullScreen = true
    this.indexToShow = index
    console.log(this.indexToShow)
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
