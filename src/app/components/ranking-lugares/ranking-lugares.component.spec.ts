import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingLugaresComponent } from './ranking-lugares.component';

describe('RankingLugaresComponent', () => {
  let component: RankingLugaresComponent;
  let fixture: ComponentFixture<RankingLugaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingLugaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
