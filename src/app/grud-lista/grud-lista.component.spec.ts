import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrudListaComponent } from './grud-lista.component';

describe('GrudListaComponent', () => {
  let component: GrudListaComponent;
  let fixture: ComponentFixture<GrudListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrudListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrudListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
