import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahDialogComponent } from './tambah-dialog.component';

describe('TambahDialogComponent', () => {
  let component: TambahDialogComponent;
  let fixture: ComponentFixture<TambahDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TambahDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TambahDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
