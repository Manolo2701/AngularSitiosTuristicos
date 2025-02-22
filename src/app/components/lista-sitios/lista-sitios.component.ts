import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SitiosService, Sitio } from '../../services/sitios.service';
import { RankingLugaresComponent } from '../ranking-lugares/ranking-lugares.component';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-lista-sitios',
  standalone: true,
  imports: [CommonModule, MatCardModule,
    MatButtonModule, RouterModule,
    RankingLugaresComponent, ComentariosComponent,
    NavbarComponent],
  templateUrl: './lista-sitios.component.html',
  styleUrls: ['./lista-sitios.component.scss']
})

export class ListaSitiosComponent implements OnInit {
  sitios: Sitio[] = [];

  constructor(private sitiosService: SitiosService) {}
  //Coge todos los sitios de sitiosservice
  ngOnInit(): void {
    this.sitiosService.getSitios().subscribe((data) => {
      this.sitios = data;
    });
  }
}
