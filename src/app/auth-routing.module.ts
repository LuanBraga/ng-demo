import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

const config = {
  domain: 'dev-czb0wsey5xotokhg.us.auth0.com',
  clientId: 'H8hCmPhC98KJ1w0LEqN5oLjKV8QwOqs8',
  redirectUri: window.location.origin + '/home',
  httpInterceptor: {
    allowedList: ['/api/*']
  },
};

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule.forRoot(config),
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
