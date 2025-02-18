import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SitiosService, Sitio } from '../../services/sitios.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  sitio?: Sitio;

  constructor(private route: ActivatedRoute, private sitiosService: SitiosService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sitiosService.getSitios().subscribe(sitios => {
        this.sitio = sitios.find(s => s.id === id);
      });
    }
  }
}
