import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/api/server';
import { News } from '../../../../util/interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  getNewsWithPaging(page: number, limit = 10): Observable<News[]> {
    const params = new HttpParams().append('page', page.toString())
      .append('limit', limit.toString());
    return this.httpClient.get<News[]>(api.getNewsList, {params});
  }

  getNewsById(id: number): Observable<News> {
    return this.httpClient.get<News>(api.getById + id.toString());
  }

  updateNews(news: News): Observable<News> {
    const params = new HttpParams().append('id', news.id.toString());
    return this.httpClient.put<News>(api.updateNews, news, {params});
  }

  searchNews(searchTerm: string): Observable<News[]> {
    const params = new HttpParams().append('search', searchTerm.toUpperCase());
    return this.httpClient.get<News[]>(api.search, {params});
  }
}
