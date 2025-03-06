import { Component } from '@angular/core';
import { SitiosService } from '../services/sitios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [MatCardModule, MatButtonModule, CommonModule, FormsModule, NavbarComponent, RouterModule]
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
  isEditing = false;
  originalSite: any = null;

  constructor(private sitiosService: SitiosService, private snackBar: MatSnackBar) {
    this.loadSitios();
  }

  addNewSite(): void {
    if (this.isValidSite(this.newSite)) {
      const newSiteWithId = {
        ...this.newSite,
        id: uuidv4()
      };

      this.sitiosService.addNewSite(newSiteWithId).subscribe({
        next: () => {
          this.snackBar.open('Sitio añadido', 'Cerrar', { duration: 3000 });
          this.loadSitios();
          this.resetForm();
        },
        error: () => this.showError('Error añadiendo sitio')
      });
    } else {
      this.showError('Completa todos los campos');
    }
  }

  private isValidSite(site: any): boolean {
    return !!site.name && 
           !!site.description && 
           !!site.location && 
           !!site.imageUrl && 
           !!site.parrafo1 && 
           !!site.parrafo2;
  }

  loadSitios(): void {
    this.sitiosService.getSitios().subscribe({
      next: (sitios) => {
        this.sitios = sitios.map(site => ({...site, editing: false}));
      },
      error: () => this.showError('Error cargando sitios')
    });
  }

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
    this.isEditing = false;
  }

  startEdit(site: any): void {
    this.isEditing = true;
    this.originalSite = JSON.parse(JSON.stringify(site)); // Copia profunda
    site.editing = true;
  }

  cancelEdit(site: any): void {
    // Restauración completa de propiedades
    Object.keys(this.originalSite).forEach(key => {
      site[key] = this.originalSite[key];
    });
    site.editing = false;
    this.isEditing = false;
    this.originalSite = null;
  }

  updateSite(site: any): void {
    if (this.isValidSite(site)) {
      this.sitiosService.updateSite(site).subscribe({
        next: () => {
          this.snackBar.open('Sitio actualizado', 'Cerrar', { duration: 3000 });
          this.loadSitios();
          site.editing = false;
        },
        error: () => this.showError('Error actualizando sitio')
      });
    }
  }

  deleteSite(siteId: string): void {
    if (confirm('¿Eliminar este sitio permanentemente?')) {
      this.sitiosService.deleteSite(siteId).subscribe({
        next: () => {
          this.snackBar.open('Sitio eliminado', 'Cerrar', { duration: 3000 });
          this.loadSitios();
        },
        error: () => this.showError('Error eliminando sitio')
      });
    }
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }

  isFormValid(): boolean {
    return this.isValidSite(this.newSite);
  }
}