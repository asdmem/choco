import { Injectable } from '@angular/core';
import { News } from 'src/util/interfaces/news.interface';
import {
  RequestInfo,
  ResponseOptions,
  STATUS,
  getStatusText
} from 'angular-in-memory-web-api';
import { of } from 'rxjs';
import { HttpEvent, HttpResponse } from '@angular/common/http';

@Injectable()
export class InMemoryNewsService {
  news: News[] = [];

  createDb() {
    this.news = [];
    for (let index = 0; index < 150; index++) {
      this.news.push({
        id: index,
        body:
          `SPEED & PERFORMANCE
        Achieve the maximum speed possible on the Web Platform today, and take it further, via Web Workers and server-side rendering.
        Angular puts you in control over scalability. Meet huge data requirements
        by building data models on RxJS, Immutable.js or another push-model. ` +
          index,
        caption: 'Angular 7 ' + index + ' ' + new Date().toLocaleDateString(),
        rating: NewsRating.NONE
      });
    }

    return { news: this.news };
  }

  get(reqInfo: RequestInfo) {
    if (reqInfo.query.has('page')) {
      const page: number = Number.parseInt(reqInfo.query.get('page')[0], 10);
      const limit: number = reqInfo.query.has('limit')
        ? Number.parseInt(reqInfo.query.get('limit')[0], 10)
        : 10;
      const startIndex = page * limit;
      const collection = this.news.slice(startIndex, startIndex + limit);
      const body = reqInfo.utils.getConfig().dataEncapsulation
        ? { data: collection }
        : collection;
      console.log('page is %s and limit %s', page, limit);
      console.log('next data will be', body);
      const httpResponse = new HttpResponse({
        body,
        url: reqInfo.url,
        status: 200,
        statusText: 'ok'
      });
      return of(httpResponse);
    } else if (reqInfo.query.has('search')) {
      const searchTerm: string = reqInfo.query.get('search')[0];
      const collection = this.news.filter(
        news =>
          news.body.toLowerCase().includes(searchTerm) ||
          news.caption.toUpperCase().includes(searchTerm)
      );
      const body = reqInfo.utils.getConfig().dataEncapsulation
        ? { data: collection }
        : collection;
      console.log('search term is %s', searchTerm);
      console.log('response for search are ', body);
      const httpResponse = new HttpResponse({
        body,
        url: reqInfo.url,
        status: 200,
        statusText: 'ok'
      });
      return of(httpResponse);
    }
    return null;
  }

  put(reqInfo: RequestInfo) {
    const id = Number.parseInt(reqInfo.query.get('id')[0], 10);
    const bodyNews: News = (reqInfo.req as any).body as News;
    const index: number = this.news.findIndex(news => news.id === id);
    if (index > -1) {
      this.news[index] = bodyNews;
      console.log('updated entity rating ', bodyNews);
      const body = reqInfo.utils.getConfig().dataEncapsulation
        ? { data: bodyNews }
        : bodyNews;
      const httpResponse = new HttpResponse({
        body,
        url: reqInfo.url,
        status: 200,
        statusText: 'ok'
      });
      return of(httpResponse);
    }
    return null;
  }
}
