import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule para el ngModel
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Importa animaciones si estás usando Angular Material

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],  // Declarar el componente
      imports: [
        MatCardModule,              // Importar MatCardModule para trabajar con mat-card
        FormsModule,                // Importar FormsModule para el uso de ngModel
        NoopAnimationsModule        // Importar NoopAnimationsModule si usas animaciones
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
