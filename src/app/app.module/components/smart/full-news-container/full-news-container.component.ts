import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/app.module/services/news.service/news.service';
import { News } from 'src/util/interfaces/news.interface';

@Component({
  selector: 'app-full-news-container,[app-full-news-container]',
  templateUrl: './full-news-container.component.html',
  styleUrls: ['./full-news-container.component.scss']
})
export class FullNewsContainerComponent implements OnInit {
  news: News = null;

  constructor(
    private route: ActivatedRoute,
    private newService: NewsService,
    private router: Router,
  ) {}

  async ngOnInit() {
    const newsId = this.route.snapshot.params.id;
    this.news = await this.newService.getNewsById(newsId).toPromise();
  }

  @HostListener('document: keydown.esc')
  escape(event: KeyboardEvent) {
    this.router.navigate(['/']);
  }

  @HostListener('click', ['$event'])
  clickToClose(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.router.navigate(['/']);
    }
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
}
