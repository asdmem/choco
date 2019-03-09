import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullNewsContainerComponent } from './full-news-container.component';

describe('FullNewsContainerComponent', () => {
  let component: FullNewsContainerComponent;
  let fixture: ComponentFixture<FullNewsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullNewsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullNewsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
