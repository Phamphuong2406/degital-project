import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInformationAdminComponent } from './manage-information-admin.component';

describe('ManageInformationAdminComponent', () => {
  let component: ManageInformationAdminComponent;
  let fixture: ComponentFixture<ManageInformationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInformationAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInformationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
