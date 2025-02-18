import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSitiosComponent } from './lista-sitios.component';

describe('ListaSitiosComponent', () => {
  let component: ListaSitiosComponent;
  let fixture: ComponentFixture<ListaSitiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSitiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSitiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
