import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogosPage } from './catalogos.page';

describe('CatalogosPage', () => {
  let component: CatalogosPage;
  let fixture: ComponentFixture<CatalogosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
