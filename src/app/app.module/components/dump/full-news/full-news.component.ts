import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { News } from 'src/util/interfaces/news.interface';

@Component({
  selector: 'app-full-news',  
  templateUrl: './full-news.component.html',
  styleUrls: ['./full-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullNewsComponent implements OnInit {

  @Input() news: News = null;

  @Output() rateUpdated = new EventEmitter<[News, NewsRating]>();

  ngOnInit() {}

  rateUp(news: News) {
    this.rateUpdated.emit([news, NewsRating.PLUS]);
  }
  rateDown(news: News) {
    this.rateUpdated.emit([news, NewsRating.MINUS]);
  }

}
