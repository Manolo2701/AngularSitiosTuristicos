import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SitiosService, Sitio } from '../../services/sitios.service';
import { RankingLugaresComponent } from '../ranking-lugares/ranking-lugares.component';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-lista-sitios',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    RankingLugaresComponent,
    ComentariosComponent,
    NavbarComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './lista-sitios.component.html',
  styleUrls: ['./lista-sitios.component.scss']
})
export class ListaSitiosComponent implements OnInit {
  sitios: Sitio[] = [];
  isLoading = true;

  constructor(private sitiosService: SitiosService) {}

  ngOnInit(): void {
    this.sitiosService.getSitios().subscribe(
      (data) => {
        this.sitios = data;
        this.isLoading = false;
        console.log('Sitios cargados:', this.sitios);
      },
      (error) => {
        console.error('Error al cargar los sitios:', error);
        this.isLoading = false;
      }
    );
  }
}
