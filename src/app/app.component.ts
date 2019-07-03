import { Component } from '@angular/core';
import { Platform, Tab } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AgentsProvider } from "../providers/agents/agents"
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  lat:any;
  long:any;
  constructor(public nativeStorage: NativeStorage,public network:Network, public geolocation:Geolocation,public agentsProvider:AgentsProvider,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.nativeStorage.getItem('consumer')
  .then(
    data => {
      if(data){
        this.agentsProvider.location().then((resp) => {
          this.lat = resp["lat"]
        this.long = resp['lon']
          
          if(this.lat!=null){
          console.log(this.lat,this.long);
          }
          else{
            this.lat = "17.3753"
        this.long = "78.4744"
        console.log(this.lat,this.long)
        this.nativeStorage.setItem('coordinates', {"lat":this.lat,"long":this.long});
            
      }
          this.nativeStorage.setItem('coordinates', {"lat":this.lat,"long":this.long});
          this.agentsProvider.getagentsbylocation(this.lat,this.long,0,10,data['auth-token'],data['token']).then(
            agentsData => {
              if(agentsData['agents']!=null){
              this.nativeStorage.setItem('agentsFullData', agentsData);
              this.nativeStorage.setItem('agents', agentsData["agents"]);
              this.rootPage = TabsPage
              }
              else{
                this.rootPage = LoginPage
              }
              },
            error => {
              
            
              console.log("gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
        console.log(JSON.stringify(error));}
          );
        
        
        // document.getElementById("gg").innerText = location;
        
      });
        // this.rootPage = LoginPage
      }
    else{
      console.log(data);
      this.rootPage = LoginPage
    }
    splashScreen.hide();
    },
    error => {
      console.log(error);
      this.rootPage = LoginPage
      splashScreen.hide();
    }
  );
    });
    
  }
  
}
