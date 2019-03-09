import { Component, OnInit } from '@angular/core';
import { RefObject } from 'src/util/meta/ref-object';
import { News } from '../../../../../util/interfaces/news.interface';
import { NewsService } from '../../../services/news.service/news.service';
import { Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-news-list-container',
  templateUrl: './news-list-container.component.html',
  styleUrls: ['./news-list-container.component.scss']
})
export class NewsListContainerComponent implements OnInit {
  refNews: RefObject<News[]> = { data: [] };
  iterator: Iterator<Promise<News[]>>;

  currentPage = 0;

  loading = false;

  constructor(private newService: NewsService) {}

  async ngOnInit() {
    this.iterator = this.getNews();
    this.refNews = this.createRefFromData(await this.iterator.next().value);
  }

  *getNews() {
    let page = 0;
    const limit = 15;
    while (true) {
      yield this.newService.getNewsWithPaging(page, limit).toPromise();
      page++;
    }
  }

  async loadMore() {
    if (this.loading) {
      return;
    }
    const append = await this.iterator.next().value;
    this.loading = false;
    this.refNews.data.push(...append);
    this.refNews = this.createRefFromData(this.refNews.data);
  }

  rateUpdated([news, rating]: [News, NewsRating]) {
    const previewsRating: NewsRating = news.rating;
    // double click
    if (news.rating === rating) {
      news.rating = NewsRating.NONE;
    } else {
      news.rating = rating;
    }
    this.newService
      .updateNews(news)
      .subscribe(data => {}, error => (news.rating = previewsRating));
  }

  search(value: string) {
    this.newService.searchNews(value).subscribe(newsArray => {
      this.refNews = this.createRefFromData(newsArray);
    });
  }

  private createRefFromData(data: News[]): RefObject<News[]> {
    return { data };
  }
}
