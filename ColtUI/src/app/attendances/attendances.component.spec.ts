import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancesComponent } from './attendances.component';

describe('AttendancesComponent', () => {
  let component: AttendancesComponent;
  let fixture: ComponentFixture<AttendancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
