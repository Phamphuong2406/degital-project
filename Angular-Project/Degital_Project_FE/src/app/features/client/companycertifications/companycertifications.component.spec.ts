import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanycertificationsComponent } from './companycertifications.component';

describe('CompanycertificationsComponent', () => {
  let component: CompanycertificationsComponent;
  let fixture: ComponentFixture<CompanycertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanycertificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanycertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
