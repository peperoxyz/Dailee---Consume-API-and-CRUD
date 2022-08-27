import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HeroImageComponent } from './hero-image/hero-image.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { PostOfUserComponent } from './post-of-user/post-of-user.component';
import { DetailPostsComponent } from './detail-posts/detail-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    HeroImageComponent,
    CreatePostComponent,
    UsersComponent,
    CreateUserComponent,
    PostOfUserComponent,
    DetailPostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'heroImage', component: HeroImageComponent },
      { path: 'createPost', component: CreatePostComponent },
      { path: 'user', component: UsersComponent },
      { path: 'home/postOfUser/:ownerId', component: PostOfUserComponent },
      { path: 'createUser', component: CreateUserComponent },
      { path: 'createPost/:ownerId', component: CreatePostComponent },
      { path: 'postOfUser/:ownerId', component: PostOfUserComponent },
      {
        path: 'home/detailPost/:postId',
        component: DetailPostsComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
{
}
