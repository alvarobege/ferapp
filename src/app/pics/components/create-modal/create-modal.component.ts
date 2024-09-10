import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../../../DB/firebase.service';
import { Album } from '../../interfaces/album';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { of } from 'rxjs';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss'
})
export class CreateAlbumComponent implements OnInit {

  dbAlbums: Album[] = []
  selectedPics: any[] = []
  albumSelected: string = "name"
  newAlbum: Album = {
    name:""}
  selectedFiles: File[] = []

  constructor(public dialogRef: MatDialogRef<CreateAlbumComponent>, private db: FirebaseService, private storage: Storage){}

  ngOnInit(): void {
    this.db.GetAlbums().subscribe((albums: Album[])=> {
      this.dbAlbums = albums
      if(this.dbAlbums.length==0){
        this.albumSelected=""
      }
    })
  }

  onFilesSelected(event: Event){  
    const target = event.target as HTMLInputElement;
    if(target.files){
      this.selectedFiles = Array.from(target.files)
    }
  }

  upload(){
    let path
    if(this.albumSelected != ""){
      path = `${this.albumSelected}`
    }else{
      path = `${this.newAlbum.name}`
      this.db.AddAlbum(this.newAlbum)
    }
    this.selectedFiles.forEach(file => {
      const imgRef = ref(this.storage, path+`/${file.name}`)
      uploadBytes(imgRef, file)
        .then()
        .catch(e => console.error(e));       
    })


  }

  getClass(){

    return {
      'new-name': this.dbAlbums.length > 0,
      'new-name-empty': this.dbAlbums.length == 0
    };

  }

  closeModal(): void{
    this.dialogRef.close()
  }



}
