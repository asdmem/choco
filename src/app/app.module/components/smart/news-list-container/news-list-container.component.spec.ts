import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListContainerComponent } from './news-list-container.component';

describe('NewsListContainerComponent', () => {
  let component: NewsListContainerComponent;
  let fixture: ComponentFixture<NewsListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
