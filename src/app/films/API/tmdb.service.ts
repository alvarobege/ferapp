import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  API_KEY="776e283549dc5d3cc664c6b8c6e83cda"
  URL="https://api.themoviedb.org/3"

  constructor(private api: HttpClient) { }

  searchFilm(query: string): Observable<any>{
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('query', query)
      .set('include_adult', false)
      .set('language', "es-ES")
      .set('page',1);

    return this.api.get<any>(`${this.URL}/search/movie`, {params})
  }

  
}
