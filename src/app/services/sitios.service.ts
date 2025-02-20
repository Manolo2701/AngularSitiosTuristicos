import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { User } from '../user.model'; // Importamos el modelo de User

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

  getRandomComments(count: number = 5): Observable<{ comment: string; user: string }[]> {
    return this.getSitios().pipe(
      map(sitios => {
        let allComments: { comment: string; user: string }[] = [];
  
        sitios.forEach(sitio => {
          if (sitio.comments && sitio.commentUser) {
            sitio.comments.forEach((comment, index) => {
              allComments.push({ comment, user: sitio.commentUser[index] || 'Anónimo' });
            });
          }
        });
  
        return allComments.sort(() => 0.5 - Math.random()).slice(0, count);
      })
    );
  }

  private usersUrl = 'http://localhost:3000/users'; // Asegúrate de que esta URL sea correcta

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);  
  }
}
