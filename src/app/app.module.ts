import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { NewMemberComponent } from './members/new-member/new-member.component';
import { PhotoInteractiveComponent } from './photo-interactive/photo-interactive.component';
import { WeekPlanningComponent } from './week-planning/week-planning.component';


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
    HomePageComponent,
    SigninComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    NewMemberComponent,
    PhotoInteractiveComponent,
    WeekPlanningComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {
      anchorScrolling: 'enabled'
    })
  ],
  providers: [
    AuthService,
    AuthGuardService,
    NgModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
