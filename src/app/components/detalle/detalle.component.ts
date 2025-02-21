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
      this.sitiosService.getSitioById(id).subscribe(sitio => this.sitio = sitio);
    }
    
    const userData = this.authService.getUserData(); 
    if (userData) {
      this.currentUser = this.authService.getUserData();
    }
  }

  addComment(): void {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getUserData(); // Obtenemos los datos del usuario
      const userName = `${user.firstName} ${user.lastName}`; // Concatenamos el nombre y apellido
  
      // Aseguramos que userName sea un string
      const userNameString = String(userName);
  
      const rating = Number(this.newRating); // Convertimos la puntuación a número
  
      if (isNaN(rating)) {
        alert('La puntuación debe ser un número válido.');
        return;
      }


      this.sitiosService.addCommentToSite(this.sitio.id, this.newComment, rating, userNameString).subscribe(
        (updatedSite) => {
          this.sitio = updatedSite; // Actualizamos el sitio con el nuevo comentario
          this.newComment = ''; // Limpiamos el campo de comentario
          this.newRating = null; // Limpiamos la puntuación
        },
        (error) => {
          console.error('Error al agregar comentario', error);
        }
      );
    } else {
      alert('Por favor, inicie sesión para comentar.');
    }
  }

  

  goBack() {
    window.history.back();
  }
  
}
