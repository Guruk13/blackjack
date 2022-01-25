import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideToolBarComponent } from './side-tool-bar.component';

describe('SideToolBarComponent', () => {
  let component: SideToolBarComponent;
  let fixture: ComponentFixture<SideToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideToolBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
