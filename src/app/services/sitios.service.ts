import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { User } from '../user.model';

export interface Sitio {
  id: string;
  name: string;
  description: string;
  location: string;
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
  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getSitios(): Observable<Sitio[]> {
    return this.http.get<Sitio[]>(this.apiURL).pipe(
      catchError((error) => {
        console.error('Error en getSitios:', error);
        return throwError(() => new Error('No se pudieron cargar los sitios. Intenta más tarde.'));
      })
    );
  }

  getSitioById(id: string): Observable<Sitio> {
    return this.http.get<Sitio>(`${this.apiURL}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error al obtener el sitio con id ${id}:`, error);
        return throwError(() => new Error('No se pudo cargar el sitio. Intenta más tarde.'));
      })
    );
  }

  addNewSite(site: Sitio): Observable<Sitio> {
    return this.http.post<Sitio>(this.apiURL, site).pipe(
      catchError((error) => {
        console.error('Error al añadir un nuevo sitio:', error);
        return throwError(() => new Error('No se pudo añadir el sitio. Intenta más tarde.'));
      })
    );
  }

  updateSite(site: Sitio): Observable<Sitio> {
    return this.http.put<Sitio>(`${this.apiURL}/${site.id}`, site).pipe(
      catchError((error) => {
        console.error(`Error al actualizar el sitio con id ${site.id}:`, error);
        return throwError(() => new Error('No se pudo actualizar el sitio. Intenta más tarde.'));
      })
    );
  }

  deleteSite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error al eliminar el sitio con id ${id}:`, error);
        return throwError(() => new Error('No se pudo eliminar el sitio. Intenta más tarde.'));
      })
    );
  }

  addCommentToSite(sitioId: string, comment: string, rating: number, user: string): Observable<Sitio> {
    return this.getSitioById(sitioId).pipe(
      map((sitio: Sitio) => ({
        ...sitio,
        comments: [...sitio.comments, comment],
        rating: [...sitio.rating, rating],
        commentUser: [...sitio.commentUser, user],
      })),
      switchMap((updatedSite: Sitio) =>
        this.http.put<Sitio>(`${this.apiURL}/${sitioId}`, updatedSite)
      ),
      catchError((error) => {
        console.error(`Error al añadir comentario al sitio ${sitioId}:`, error);
        return throwError(() => new Error('No se pudo añadir el comentario. Intenta más tarde.'));
      })
    );
  }

  getRandomComments(count: number = 5): Observable<{ comment: string; user: string }[]> {
    return this.getSitios().pipe(
      map((sitios) => {
        let allComments: { comment: string; user: string }[] = [];
        sitios.forEach((sitio) => {
          if (sitio.comments && sitio.commentUser) {
            sitio.comments.forEach((comment, index) => {
              allComments.push({ comment, user: sitio.commentUser[index] || 'Anónimo' });
            });
          }
        });
        return allComments.sort(() => Math.random() - 0.5).slice(0, count);
      }),
      catchError((error) => {
        console.error('Error al obtener comentarios aleatorios:', error);
        return throwError(() => new Error('No se pudieron obtener comentarios aleatorios.'));
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener usuarios:', error);
        return throwError(() => new Error('No se pudieron cargar los usuarios. Intenta más tarde.'));
      })
    );
  }
}