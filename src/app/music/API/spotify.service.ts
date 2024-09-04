import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  APIKEY = "1b91024e1e43cc69df895f4bdc2e0cf3"
  SHARED = "f528b8f75173340ae7550e34b650b225"
  URL = "http://ws.audioscrobbler.com/2.0/"


  constructor(private lastfm : HttpClient) { }

  SearchSon(name: string):Observable<any>{
    const params = new HttpParams()
      .set('method', 'track.search')
      .set('track', name)
      .set('api_key', this.APIKEY)
      .set('format', 'json');
    
    return this.lastfm.get<any>(this.URL,{params})
  }

  getTrakcInfo( mbid: string): Observable<any> {
    const params = new HttpParams()
      .set('method', 'track.getinfo')
      .set('mbid', mbid)
      .set('api_key', this.APIKEY)
      .set('format', 'json');

    return this.lastfm.get(this.URL, { params });
  }

  getImage(mbid: string):string {
    this.getTrakcInfo(mbid).subscribe((song: any)=>{
      return  song.track.album.image[2]['#text']
    })
   
  }

}
