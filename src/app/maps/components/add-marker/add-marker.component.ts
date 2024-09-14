import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { latLng, tileLayer, Map, Marker, icon } from 'leaflet'
import { Album } from '../../../pics/interfaces/album';
import {Marcador} from '../../interfaces/map'
import { FirebaseService } from '../../../DB/firebase.service';
@Component({
  selector: 'app-add-marker',
  templateUrl: './add-marker.component.html',
  styleUrl: './add-marker.component.scss'
})
export class AddMarkerComponent implements OnInit{

  lat: number = 0
  lng: number = 0
  name: string = ""
  dbAlbums: Album[] = []
  iconSelected: number = 0
  linkAlbum:boolean = false
  albumSelected: string = ""

  constructor(public dialogRef: MatDialogRef<AddMarkerComponent>, private db: FirebaseService,
  @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    const {x, y} = this.data.maps!
    this.lat = x
    this.lng = y

    this.db.GetAlbums().subscribe((albums: Album[])=> {
      this.dbAlbums = albums
      if(this.dbAlbums.length==0){
        this.albumSelected=""
      }
    })
  }

  onCheckboxChange(event: any): void {
    this.linkAlbum = event.checked; // Actualiza la variable con el estado del checkbox
  }

  upload(){
    const m: Marcador = {
      name: this.name,
      lat: this.lat,
      lng: this.lng,
      icon: this.iconSelected,
      album: this.albumSelected
    }
    this.db.AddMap(m)   
  }
}
