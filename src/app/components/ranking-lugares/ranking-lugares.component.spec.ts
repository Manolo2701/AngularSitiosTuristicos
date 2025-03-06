import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankingLugaresComponent } from './ranking-lugares.component';
import { SitiosService } from '../../services/sitios.service';
import { of } from 'rxjs'; // Para simular las respuestas del servicio
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

// Creamos un mock del SitiosService
class MockSitiosService {
  getSitios() {
    return of([
      { 
        name: 'Lugar 1', 
        description: 'Descripción del lugar 1', 
        rating: [5, 4, 5], 
        imageUrl: 'https://example.com/lugar1.jpg' 
      },
      { 
        name: 'Lugar 2', 
        description: 'Descripción del lugar 2', 
        rating: [4, 3, 4], 
        imageUrl: 'https://example.com/lugar2.jpg' 
      },
      { 
        name: 'Lugar 3', 
        description: 'Descripción del lugar 3', 
        rating: [5, 5, 5], 
        imageUrl: 'https://example.com/lugar3.jpg' 
      }
    ]);
  }
}

describe('RankingLugaresComponent', () => {
  let component: RankingLugaresComponent;
  let fixture: ComponentFixture<RankingLugaresComponent>;
  let sitiosService: SitiosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingLugaresComponent, CommonModule, MatCardModule, MatListModule],
      providers: [
        { provide: SitiosService, useClass: MockSitiosService } // Usamos el mock aquí
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingLugaresComponent);
    component = fixture.componentInstance;
    sitiosService = TestBed.inject(SitiosService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the top 5 rated places', () => {
    // Esperamos que el componente reciba los sitios del servicio mockeado
    component.ngOnInit();
    fixture.detectChanges();

    // Verificar que el componente muestra al menos 3 lugares (en el mock hay 3)
    const lugares = fixture.nativeElement.querySelectorAll('mat-list-item');
    expect(lugares.length).toBe(3);
  });

  it('should calculate the correct average rating', () => {
    const sitio = { 
      name: 'Lugar de prueba', 
      description: 'Descripción de prueba', 
      rating: [5, 4, 5], 
      imageUrl: 'https://example.com/test.jpg' 
    };

    // Comprobamos que la media es correcta
    expect(component.getAverageRating(sitio.rating)).toBe(4.67, 'La media debe ser 4.67');
  });
});
