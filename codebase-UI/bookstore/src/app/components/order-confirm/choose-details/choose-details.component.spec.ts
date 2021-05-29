import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDetailsComponent } from './choose-details.component';

describe('ChooseDetailsComponent', () => {
  let component: ChooseDetailsComponent;
  let fixture: ComponentFixture<ChooseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
