import { TestBed } from '@angular/core/testing';

import { InMemoryNewsService } from './in-memory-news.service';

describe('InMemoryNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryNewsService = TestBed.get(InMemoryNewsService);
    expect(service).toBeTruthy();
  });
});
