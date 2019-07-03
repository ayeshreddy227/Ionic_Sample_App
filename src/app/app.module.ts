import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule,Slides, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { AgentpagePage } from '../pages/agentpage/agentpage';
import { OffersqrPage } from '../pages/offersqr/offersqr';
import { SearchPage } from '../pages/search/search';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginProvider } from '../providers/login/login';
import { AgentsProvider } from '../providers/agents/agents';
import { PromotionsPage } from '../pages/promotions/promotions';
import { ProfilePage } from '../pages/profile/profile';
import { FeedbackPage } from '../pages/feedback/feedback';
import { FilterPage } from '../pages/filter/filter';

import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { ParallaxHeaderDirective } from '../components/parallax-header/parallax-header';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { QRCodeModule } from 'angular2-qrcode';
import { FCM } from '@ionic-native/fcm';
import { Ionic2RatingModule } from 'ionic2-rating';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    LoginPage,
    FilterPage,
    OffersqrPage,
    AgentpagePage,
    PromotionsPage,
    ProfilePage,
    FeedbackPage,
    // ParallaxHeaderDirective
  ],
  imports: [
    BrowserModule,
    QRCodeModule,
    HttpClientModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
            scrollAssist: true,
            autoFocusAssist: false
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    SearchPage,
    LoginPage,
    FilterPage,
    OffersqrPage,
    AgentpagePage,
    HomePage,
    PromotionsPage,
    ProfilePage,
    FeedbackPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    Slides,
    SplashScreen,
    NativeStorage,
    LoginProvider,
    Geolocation,
    AgentsProvider,
    Network,
    FCM,
    BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
