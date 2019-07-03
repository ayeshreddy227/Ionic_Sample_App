import { Component } from '@angular/core';
import { IonicPage, App, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';
import { AgentsProvider } from "../../providers/agents/agents";
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  consumer = {};
  transactions = [];
  constructor(public agentsProvider:AgentsProvider, public appCtrl: App, public navParams: NavParams, public nativeStorage: NativeStorage) {
  this.onstartup()
    
  }
  onstartup(refresher=null){
    this.nativeStorage.getItem('consumer').then(
      data => {
      this.consumer = data
      console.log(JSON.stringify(this.consumer))
      this.agentsProvider.recenttransactions(0,5,this.consumer['auth-token'],this.consumer['token']).then(
        data => {
          
          this.transactions = data["transactions"]
        console.log(JSON.stringify(this.transactions))},
        error => console.error("sfasdfasf")
      );},
      error => console.error("sfasdfasf")
    );
    console.log(JSON.stringify(this.transactions))
    if(refresher!=null){
      refresher.complete();}
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  goToLogout(){
    this.nativeStorage.clear();
    this.agentsProvider.logout(this.consumer['auth-token'],this.consumer['token']).then(
      data => {
        
        this.transactions = data["transactions"]
      console.log(JSON.stringify(this.transactions))},
      error => console.error("sfasdfasf")
    );
    this.appCtrl.getRootNav().setRoot(LoginPage);
    // this.navCtrl.popAll();

  }
}
