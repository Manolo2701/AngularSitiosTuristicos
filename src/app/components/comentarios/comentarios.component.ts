import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SitiosService } from '../../services/sitios.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})

export class ComentariosComponent implements OnInit, OnDestroy {
  comentarios: { comment: string; user: string }[] = [];
  currentCommentIndex = 0;
  intervalId: any;
  subscription!: Subscription;

  constructor(private sitiosService: SitiosService) {}

  //Para iniciar cualquier cosa cuando la clase se exporta y carga
  ngOnInit(): void {
    this.subscription = this.sitiosService.getRandomComments(5).subscribe(comments => {
      this.comentarios = comments;
      this.startRotation();
    });
  }

  //Intervalo de rotación del carrusel, cada 5 segunditos:
  startRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentCommentIndex = (this.currentCommentIndex + 1) % this.comentarios.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
