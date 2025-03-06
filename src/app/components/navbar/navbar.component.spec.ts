import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

class MockAuthService {
  isAuthenticated() {
    return false;
  }

  getRole(): string | null {
    return 'user';
  }

  logout() {}
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: MockAuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule, MatButtonModule, MatToolbarModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout method when logout is triggered', () => {
    spyOn(authService, 'logout');
    spyOn(router, 'navigate');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to login when goToLogin is called', () => {
    spyOn(router, 'navigate');
    component.goToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to register when goToRegister is called', () => {
    spyOn(router, 'navigate');
    component.goToRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });

  it('should navigate to add-site when addNewSite is called', () => {
    spyOn(router, 'navigate');
    component.addNewSite();
    expect(router.navigate).toHaveBeenCalledWith(['/add-site']);
  });

  it('should return false for isAuthenticated when the user is not authenticated', () => {
    expect(component.isAuthenticated).toBeFalse();
  });

  it('should return "user" for role when the user has a role', () => {
    expect(component.role).toBe('user');
  });
});
