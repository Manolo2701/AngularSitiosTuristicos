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

  //Para añadir comentarios
  addComment(): void {
    //COmprobación de que está autenticado:
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getUserData(); 
      const userName = `${user.firstName} ${user.lastName}`; 
  

      const userNameString = String(userName);
  
      const rating = Number(this.newRating); 
  
      //Para que no se puedan meter caracteres que no sean números
      if (isNaN(rating)) {
        alert('La puntuación debe ser un número válido.');
        return;
      }
      //Usa sitiosservice para añadir el comentario
      this.sitiosService.addCommentToSite(this.sitio.id, this.newComment, rating, userNameString).subscribe(
        (updatedSite) => {
          this.sitio = updatedSite; 
          this.newComment = ''; 
          this.newRating = null; 
        },
        (error) => {
          console.error('Error al agregar comentario', error);
        }
      );
    } else {
      alert('Por favor, inicie sesión para comentar.');
    }
  }
  
  //Para volver a la página anterior (que si no el botón no funciona)
  goBack() {
    window.history.back();
  }
  
}
