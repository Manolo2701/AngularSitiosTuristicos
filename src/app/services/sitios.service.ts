import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

export interface Sitio {
  id: string;
  name: string;
  description: string;
  parrafo1: string;
  parrafo2: string;
  imageUrl: string;
  imageGallery: string[];
  rating: number[];
  comments: string[];
  commentUser: string[];
}

@Injectable({ providedIn: 'root' })
export class SitiosService {
  private apiURL = 'http://localhost:3000/sitios';

  constructor(private http: HttpClient) { }

  getSitios(): Observable<Sitio[]> {
    return this.http.get<Sitio[]>(this.apiURL);
  }
  
  getLugaresMejorValorados(): Observable<Sitio[]> {
    return this.http.get<Sitio[]>(this.apiURL).pipe(
      map((sitios: Sitio[]) =>
        sitios
          .filter((sitio: Sitio) => sitio.rating.length > 0) // ✅ Filtramos los que tienen ratings
          .sort((a: Sitio, b: Sitio) => {
            const ratingA = a.rating.reduce((sum, r) => sum + r, 0) / a.rating.length;
            const ratingB = b.rating.reduce((sum, r) => sum + r, 0) / b.rating.length;
            return ratingB - ratingA;
          })
      )
    );
  }

}


