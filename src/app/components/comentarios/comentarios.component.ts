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

  ngOnInit(): void {
    this.subscription = this.sitiosService.getRandomComments(5).subscribe({
      next: (comments) => {
        if (comments && comments.length) {
          this.comentarios = comments;
          this.startRotation();
        }
      },
      error: (err) => {
        console.error('Error al obtener los comentarios: ', err);
        // Manejo de error: Puedes mostrar un mensaje o manejarlo de otra forma.
      }
    });
  }

  // Inicia la rotación automática de los comentarios
  startRotation(): void {
    if (this.comentarios.length > 0) {
      this.intervalId = setInterval(() => {
        this.currentCommentIndex = (this.currentCommentIndex + 1) % this.comentarios.length;
      }, 5000);
    }
  }

  // Cambia al siguiente comentario de forma manual
  nextComment(): void {
    this.currentCommentIndex = (this.currentCommentIndex + 1) % this.comentarios.length;
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
