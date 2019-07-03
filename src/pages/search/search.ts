import { Component } from '@angular/core';
import { IonicPage,LoadingController, NavController, NavParams } from 'ionic-angular';
import { AgentsProvider } from "../../providers/agents/agents"
import { AgentpagePage } from '../agentpage/agentpage';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  auth_token:any;
  token:any;
  agentData = []
  agents = []
  searchstr:any;
  loader = false;
  constructor(public navCtrl: NavController,public loadingCtrl:LoadingController, public navParams: NavParams, public agentsProvider:AgentsProvider, public nativeStorage:NativeStorage) {
    this.nativeStorage.getItem('consumer').then(
      data => {this.auth_token=data['auth-token']},
      error => console.error(error)
    );
  this.nativeStorage.getItem('token').then(
    data => {this.token=data},
    error => console.error(error)
  );
    this.nativeStorage.getItem('agents').then(
      data => {this.agents = data;
        console.log(JSON.stringify(this.agents))
      },
      error => console.error("sfasdfasf")
    );  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  onCancel(event){
    this.agentData = []

  }
  futuresearch(event){
    // const loading = this.loadingCtrl.create({
      
    // });
    // loading.present();
    this.loader = true;
        this.nativeStorage.getItem('consumer').then(
            data => {this.auth_token=data['auth-token']},
            error => console.error(error)
          );
        this.nativeStorage.getItem('token').then(
          data => {this.token=data},
          error => console.error(error)
        );
    if(this.searchstr!=""){
    this.agentsProvider.searchagents(this.searchstr,0,10,this.auth_token,this.token).then(
      agentsData => {
        this.loader = false;
        this.agentData=agentsData["agents"];
        console.log(JSON.stringify(this.agentData));
        },
      error => {console.log(JSON.stringify(error));}
    );}
  }
  search(event){
    let temp = []
    for(let i in this.agents){
      // let regexp = "/ayes/"
      // let regexp = new RegExp("/"+this.searchstr+"/")
      if(this.agents[i]['name'].toLowerCase().includes(this.searchstr.toLowerCase())){
          temp.push(this.agents[i])
      }
      
    }
    this.agentData = temp;
    
  }
  OpenListing(item){
    var temp = {};
    // temp.authtoken = this.auth_token;
    // temp.token = this.token;
    item['auth-token'] = this.auth_token;
    item['token'] = this.token;
    console.log(JSON.stringify(this.auth_token,this.token));
    this.navCtrl.push(AgentpagePage,{
      agentData: item,consumerData:item['consumeragent']
    });
  }
}
