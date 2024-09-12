import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../../../DB/firebase.service';
import { Album } from '../../interfaces/album';
import { Storage, ref, getStorage, deleteObject, listAll, getDownloadURL } from '@angular/fire/storage';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent implements OnInit {

  dbAlbums: Album[] = []
  albumSelected: string = "name"
  picsList: string[] = []

  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>, private db: FirebaseService, private storage: Storage){}

  ngOnInit(): void {
    this.db.GetAlbums().subscribe((albums: Album[])=> {
      this.dbAlbums = albums
      if(this.dbAlbums.length==0){
        this.albumSelected=""
      }
    })
  }

  async delete(){
    this.db.RemoveAlbum(this.albumSelected)
    .then(() => console.log('Eliminación completada'))
    
    this.picsList = await this.getImages(this.albumSelected)
    console.log(this.picsList)

    for(let pic of this.picsList){
      const delRef = ref(this.storage, pic)
      deleteObject(delRef)
    }

    
  }

  async getImages(album: string): Promise<string[]>{
    const urls : string[] = []
    const imagesRef =  ref(this.storage, album)
    await listAll(imagesRef)
    .then(async response => {
      for(let i of response.items){
        const url = i.fullPath
        urls.push(url)
      }
    })
    return urls
  }


}
