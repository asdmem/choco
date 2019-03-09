import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { News } from '../../../../../util/interfaces/news.interface';
import { RefObject } from 'src/util/meta/ref-object';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent {

  @Input() set refNews(refNews: RefObject<News[]>) {
    this.newsArray = refNews.data;
  }

  @Input() threshold = 70;
  @Output() scrollThresholdReached = new EventEmitter<number>();
  @Output() rateUpdated = new EventEmitter<[News, NewsRating]>();

  newsArray: News[] = [];
  throttle = new Subject<number>();

  constructor() {
    this.throttle.pipe(throttleTime(100)).subscribe(threshold => this.scrollThresholdReached.emit(threshold));
  }

  @HostListener('scroll', ['$event'])
  scrollIndexChanged(event: Event) {
    const target = event.target as HTMLElement;
    const threshold =  target.scrollTop / (target.scrollHeight - target.clientHeight);
    if (threshold > (this.threshold / 100)) {
      this.throttle.next(threshold);
    }
  }

  trackBy(index: number, news: News) {
    return news.id;
  }

  rateUp(news: News) {
    this.rateUpdated.emit([news, NewsRating.PLUS]);
  }
  rateDown(news: News) {
    this.rateUpdated.emit([news, NewsRating.MINUS]);
  }
}
