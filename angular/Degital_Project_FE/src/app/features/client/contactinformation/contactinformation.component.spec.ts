import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactinformationComponent } from './contactinformation.component';

describe('ContactinformationComponent', () => {
  let component: ContactinformationComponent;
  let fixture: ComponentFixture<ContactinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactinformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
