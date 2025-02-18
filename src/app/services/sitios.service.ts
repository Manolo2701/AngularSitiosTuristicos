import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getSitios(): Observable<Sitio[]> {
    return this.http.get<Sitio[]>(this.apiURL);
  }
}
