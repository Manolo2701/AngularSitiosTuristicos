import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SitiosService, Sitio } from '../../services/sitios.service';

@Component({
  selector: 'app-ranking-lugares',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './ranking-lugares.component.html',
  styleUrls: ['./ranking-lugares.component.scss']
})
export class RankingLugaresComponent implements OnInit {
  lugaresMejorValorados: Sitio[] = [];

  constructor(private sitiosService: SitiosService) { }

  ngOnInit(): void {
    this.sitiosService.getSitios().subscribe(sitios => {
      this.lugaresMejorValorados = this.getLugaresMejorValorados(sitios);
    });
  }

  //Obtiene los lugares mejor valorados
  getLugaresMejorValorados(sitios: Sitio[]): Sitio[] {
    return sitios
      .filter(sitio => sitio.rating.length > 0)
      .sort((a, b) => {
        const ratingA = a.rating.reduce((sum, r) => sum + r, 0) / a.rating.length;
        const ratingB = b.rating.reduce((sum, r) => sum + r, 0) / b.rating.length;
        return ratingB - ratingA;
      })
      .slice(0, 5);
  }

  //Sirve para obtener la media de notas
  getAverageRating(ratings: number[]): number {
    return ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
  }
}
