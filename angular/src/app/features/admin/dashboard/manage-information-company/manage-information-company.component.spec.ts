import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInformationCompanyComponent } from './manage-information-company.component';

describe('ManageInformationCompanyComponent', () => {
  let component: ManageInformationCompanyComponent;
  let fixture: ComponentFixture<ManageInformationCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInformationCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInformationCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
