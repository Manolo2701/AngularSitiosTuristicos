import { Component } from '@angular/core';
import { SitiosService } from '../services/sitios.service';
import { MatSnackBar } from '@angular/material/snack-bar'; //Los mensajitos en negro
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NavbarComponent } from "../components/navbar/navbar.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [MatCardModule, MatButtonModule,
    CommonModule, FormsModule, 
    NavbarComponent]
})
export class AdminComponent {
  newSite = {
    id: '',
    name: '',
    description: '',
    location: '',
    imageUrl: '',
    parrafo1: '',
    parrafo2: '',
    imageGallery: [],
    rating: [],
    comments: [],
    commentUser: []
  };

  sitios: any[] = [];

  constructor(private sitiosService: SitiosService, private snackBar: MatSnackBar) {
    this.loadSitios();
  }

//Método para añadir sitios nuevos
  addNewSite(): void {
    if (this.newSite.name && this.newSite.description && this.newSite.location && this.newSite.imageUrl && this.newSite.parrafo1 && this.newSite.parrafo2) {
      const newSiteWithId = {
        ...this.newSite,
        id: uuidv4()
      };
      //Se llama al método addnewite de sitiosService
      this.sitiosService.addNewSite(newSiteWithId).subscribe(
        (response) => {
          this.snackBar.open('Sitio añadido con éxito', 'Cerrar', { duration: 3000 });
          this.loadSitios();
          this.resetForm();
        },
        (error) => {
          this.snackBar.open('Error al añadir el sitio', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', { duration: 3000 });
    }
  }

  //Carga todos los sitios usando sitiosService
  loadSitios(): void {
    this.sitiosService.getSitios().subscribe(sitios => {
      this.sitios = sitios;
    });
  }

  //Limpia el formulario
  resetForm(): void {
    this.newSite = {
      id: '',
      name: '',
      description: '',
      location: '',
      imageUrl: '',
      parrafo1: '',
      parrafo2: '',
      imageGallery: [],
      rating: [],
      comments: [],
      commentUser: []
    };
  }
}
