import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../user.model'; 

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
//Servicio para las funcioens de los sitios:
export class SitiosService {
  private apiURL = 'http://localhost:3000/sitios';

  constructor(private http: HttpClient) { }

  getSitios(): Observable<Sitio[]> {
    return this.http.get<Sitio[]>(this.apiURL);
  }

  getSitioById(id: string): Observable<Sitio> {
    return this.http.get<Sitio>(`${this.apiURL}/${id}`);
  }

  addNewSite(site: Sitio): Observable<Sitio> {
    return this.http.post<Sitio>(this.apiURL, site);
  }

  addCommentToSite(sitioId: string, comment: string, rating: number, user: string): Observable<Sitio> {
    return this.getSitioById(sitioId).pipe(
      map((sitio: Sitio) => ({
        ...sitio,
        comments: [...sitio.comments, comment],
        rating: [...sitio.rating, rating],
        commentUser: [...sitio.commentUser,user]
      })),
      switchMap((updatedSite: Sitio) => this.http.put<Sitio>(`${this.apiURL}/${sitioId}`, updatedSite))
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

  private usersUrl = 'http://localhost:3000/users'

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
}
