import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhotoInteractiveComponent } from './photo-interactive/photo-interactive.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './auth/signin/signin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import { NewMemberComponent } from './members/new-member/new-member.component';

const appRoutes: Routes = [
  { path: 'auth/signin', component: SigninComponent},
  { path: 'members/new',canActivate: [AuthGuardService] ,component: NewMemberComponent},
  { path: 'home', component: HomePageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home'}
]

@NgModule({
  declarations: [
    AppComponent,
    PhotoInteractiveComponent,
    HeaderComponent,
    HeroComponent,
    SigninComponent,
    HomePageComponent,
    FooterComponent,
    NewMemberComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
