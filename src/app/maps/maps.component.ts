import { Component } from '@angular/core';
import { latLng, tileLayer, Map, Marker, icon } from 'leaflet'
import { MatDialog } from '@angular/material/dialog';
import {AddMarkerComponent} from './components/add-marker/add-marker.component'

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent {

  constructor(public dialog: MatDialog){}

  map: Map | undefined
  currentMarker: Marker | undefined = undefined
  markerSelected: boolean = false

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      })
    ],
    zoom: 10,
    center: latLng(40.4168, -3.7038)
  };

  layers: Marker[]= [/* 
    new Marker([40.4168, -3.7038], {
    icon: icon({
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowAnchor: [4, 62],
    shadowSize: [41, 41],
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
    })
  }) */];


  openModalAdd(){
    if(this.currentMarker){

      const {lat, lng} = this.currentMarker.getLatLng()

      const dialogRef = this.dialog.open(AddMarkerComponent , {
        width: '420px',
        data: {maps: {
          x: lat, // Latitud
          y: lng  // Longitud
        }}
      })
  
    }
  }


  addMarker(lat: number, lng: number){
    if(this.map){
      const mrk = new Marker([lat, lng], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png'
        })
      })

      if (this.currentMarker != undefined) {
         console.log(this.currentMarker)
         this.map?.removeLayer(this.currentMarker);  // Eliminar del mapa el marcador anterior
      }

      this.currentMarker = mrk
      this.currentMarker.bindPopup(`
        <h3 style = "text-align: center">${this.currentMarker.getLatLng()}</h3>
      `);

      this.currentMarker.on('click', () => {
        console.log(`test`);
      });
  
      this.markerSelected = true
      this.currentMarker.addTo(this.map)
    }
  }

  onMapReady(event: Map){
    this.map = event

    this.map.on('click', (aux: any) =>{
      const {lat, lng} = aux.latlng
      this.addMarker(lat,lng)
    })
  }

}
