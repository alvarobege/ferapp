import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../API/spotify.service'

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent implements OnInit {

  ngOnInit(): void {
    this.api.SearchSon("thriller").subscribe((songs: any)=>{
      console.log(songs)
      console.log(this.api.getImage("e25d1292-ca82-4225-ae7d-04193904f3d0"))
    })
  }

  constructor(private api: SpotifyService){

  }


}
