import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingEditComponent } from './setting-edit.component';

describe('SettingEditComponent', () => {
  let component: SettingEditComponent;
  let fixture: ComponentFixture<SettingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
