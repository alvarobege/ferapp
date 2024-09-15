import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { latLng, tileLayer, Map, Marker, icon } from 'leaflet'
import { MatDialog } from '@angular/material/dialog';
import {AddMarkerComponent} from './components/add-marker/add-marker.component'
import { FirebaseService } from '../DB/firebase.service';
import { Marcador } from './interfaces/map';
import { Storage, ref, listAll, getDownloadURL, deleteObject } from '@angular/fire/storage';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent implements OnInit{

  constructor(public dialog: MatDialog, private db: FirebaseService,private storage: Storage, private cdr: ChangeDetectorRef){}

  map: Map | undefined
  currentMarker: Marker | undefined = undefined
  dbMarker: Marker | undefined = undefined
  markerSelected: boolean = false
  dbMarkerSlected: boolean = false
  dbMaps: Marcador[] = []
  dbPics : string[] = []

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      })
    ],
    zoom: 5,
    center: latLng(40.4168, -3.7038)
  };

  ngOnInit(): void {
    this.db.GetMaps().subscribe((maps : Marcador[]) => {
      this.dbMaps = maps
      for(let map of this.dbMaps){
        this.addMarker(map.lat, map.lng,true,map.icon,map.name,map.album)
      }
    })
  }


  openModalAdd(){
    if(this.currentMarker){

      const {lat, lng} = this.currentMarker.getLatLng()
      this.map?.removeLayer(this.currentMarker!);
      const dialogRef = this.dialog.open(AddMarkerComponent , {
        width: '420px',
        data: {maps: {
          x: lat, // Latitud
          y: lng  // Longitud
        }}
      })
      
    }
  }

  remove(){
    if(this.dbMarker){
      this.map?.removeLayer(this.dbMarker);
      const {lat, lng} = this.dbMarker.getLatLng()
      const map = this.dbMaps.find(map=>map.lat == lat && map.lng == lng)
      if(map){
        this.db.RemoveMap(map.name)
      }
    }
  }


  addMarker(lat: number, lng: number,saveDb: boolean, iconCode: number ,nombre?: string, album?: string){
    if(this.map){
      const mrk = new Marker([lat, lng], {
        icon: icon({
          iconSize: [33, 33],
          iconAnchor: [12, 33],
          iconUrl: `../assets/icons/${iconCode}.png`
        })
      })


      if (!saveDb) {
        if(this.currentMarker != undefined){
          this.map?.removeLayer(this.currentMarker!);
        }
        this.currentMarker = mrk  // Eliminar del mapa el marcador anterior
      }

      
      if(nombre){
        mrk.bindPopup(`
          <h3 style = "text-align: center">${nombre}</h3>
        `);
      }else{
        mrk.bindPopup(`
          <h3 style = "text-align: center">Nuevo marcador</h3>
        `);
      }

      mrk.on('click',async () => {
        this.dbMarker = mrk
        this.markerSelected = false
        if(this.currentMarker != undefined){
          this.map?.removeLayer(this.currentMarker!);
        }
        this.currentMarker = undefined
        if(album && album!=""){
          this.dbPics = []
          const imagesRef =  ref(this.storage, album)
          listAll(imagesRef)
          .then(async response => {
            for(let i of response.items){
            const url = await getDownloadURL(i)
            this.dbPics.push(url)
            }
          this.cdr.detectChanges()
          })
         
        }else{
          this.dbPics = []
          this.cdr.detectChanges()
        }
      });
  
      this.markerSelected = true
      this.dbMarker = undefined
      this.dbPics = []
      this.cdr.detectChanges()

      mrk.addTo(this.map)
    }
  }

  onMapReady(event: Map){
    this.map = event

    this.map.on('click', (aux: any) =>{
      const {lat, lng} = aux.latlng
      this.addMarker(lat,lng,false,0)
    })
  }

  async getImages(album: string){
    const imagesRef =  ref(this.storage, album)
    listAll(imagesRef)
    .then(async response => {
      for(let i of response.items){
        const url = await getDownloadURL(i)
        this.dbPics.push(url)
      }
    })
  }

}
