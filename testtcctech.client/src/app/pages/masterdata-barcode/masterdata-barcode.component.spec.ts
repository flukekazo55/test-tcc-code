import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterdataBarcodeComponent } from './masterdata-barcode.component';

describe('MasterdataBarcodeComponent', () => {
  let component: MasterdataBarcodeComponent;
  let fixture: ComponentFixture<MasterdataBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterdataBarcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterdataBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
