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
import { ReseauxComponent } from './footer/reseaux/reseaux.component';
import { PartenairesComponent } from './footer/partenaires/partenaires.component';
import { GameComponent } from './game/game.component';
import { HeroSonarComponent } from './hero-sonar/hero-sonar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VideoYoutubeComponent } from './video-youtube/video-youtube.component';
import { DefiListComponent } from './defi-list/defi-list.component';
import { ScoreboardComponent } from './game/scoreboard/scoreboard.component';
import { MenuComponent } from './menu/menu.component';
import { AllosComponent } from './allos/allos.component';
import { VideosComponent } from './videos/videos.component';
import { EnigmaComponent } from './enigma/enigma.component';


const appRoutes: Routes = [
  // { path: 'auth/signin', component: SigninComponent},
  // { path: 'members/new', canActivate: [AuthGuardService] ,component: NewMemberComponent},
  { path: 'home', component: HomePageComponent },
  { path: 'game', component: GameComponent },
  { path: 'defis', component: DefiListComponent },
  { path: 'allos', component: AllosComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'enigme', component: EnigmaComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
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
    WeekPlanningComponent,
    ReseauxComponent,
    PartenairesComponent,
    GameComponent,
    HeroSonarComponent,
    VideoYoutubeComponent,
    DefiListComponent,
    ScoreboardComponent,
    MenuComponent,
    AllosComponent,
    VideosComponent,
    EnigmaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {
      anchorScrolling: 'enabled'
    }),
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    NgModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
