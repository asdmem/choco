import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryNewsService } from './services/in-memory-news.service/in-memory-news.service';
import { AppComponent } from './components/smart/app.component/app.component';
import { NewsListComponent } from './components/dump/news-list/news-list.component';
import { NewsListContainerComponent } from './components/smart/news-list-container/news-list-container.component';
import { SearchBoxComponent } from './components/dump/search-box/search-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRouteModule } from './app-route.module';
import { FullNewsComponent } from './components/dump/full-news/full-news.component';
import { FullNewsContainerComponent } from './components/smart/full-news-container/full-news-container.component';


@NgModule({
  declarations: [
    // smart
    AppComponent,
    NewsListContainerComponent,
    FullNewsContainerComponent,

    // view
    NewsListComponent,
    SearchBoxComponent,
    FullNewsComponent,
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryNewsService),
    ReactiveFormsModule,
    AppRouteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
