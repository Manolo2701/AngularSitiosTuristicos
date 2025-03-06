import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SitiosService, Sitio } from '../../services/sitios.service';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  standalone: true,
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  imports: [MatCardModule, CommonModule, NavbarComponent, FormsModule]
})
export class DetalleComponent implements OnInit {
  sitio!: Sitio;
  newComment: string = ''; // Inicializar propiedad
  currentUser: string = ''; // Usuario actual
  newRating: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private sitiosService: SitiosService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sitiosService.getSitioById(id).subscribe(
        (sitio) => {
          this.sitio = sitio;
        },
        (error) => {
          console.error('Error al obtener el sitio:', error);
        }
      );
    } else {
      console.error('ID de sitio no proporcionado.');
    }
    
    const userData = this.authService.getUserData();
    if (userData) {
      this.currentUser = `${userData.firstName} ${userData.lastName}`; // Guardamos el nombre completo
    }
  }

  // Para añadir comentarios
  addComment(): void {
    if (this.authService.isAuthenticated()) {
      const rating = Number(this.newRating);

      // Validación de la puntuación
      if (isNaN(rating) || rating < 1 || rating > 5) {
        alert('La puntuación debe ser un número válido entre 1 y 5.');
        return;
      }

      if (!this.newComment.trim()) {
        alert('Por favor, escriba un comentario.');
        return;
      }

      const userNameString = this.currentUser;

      this.sitiosService.addCommentToSite(this.sitio.id, this.newComment, rating, userNameString).subscribe(
        (updatedSite) => {
          this.sitio = updatedSite;
          this.newComment = ''; // Limpiar comentario
          this.newRating = null; // Limpiar puntuación
        },
        (error) => {
          console.error('Error al agregar comentario', error);
        }
      );
    } else {
      alert('Por favor, inicie sesión para comentar.');
    }
  }

  // Para volver a la página anterior
  goBack(): void {
    window.history.back();
  }
}
