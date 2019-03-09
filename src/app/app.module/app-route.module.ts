import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullNewsComponent } from './components/dump/full-news/full-news.component';
import { FullNewsContainerComponent } from './components/smart/full-news-container/full-news-container.component';

const routes: Routes = [
  {
    path: ':id',
    component: FullNewsContainerComponent,
    pathMatch: 'full',
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRouteModule { }