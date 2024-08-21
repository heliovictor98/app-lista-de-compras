import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogexcluirComponent } from './dialogexcluir.component';

describe('DialogexcluirComponent', () => {
  let component: DialogexcluirComponent;
  let fixture: ComponentFixture<DialogexcluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogexcluirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogexcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
