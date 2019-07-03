import { Component } from '@angular/core';
import { NavController, ModalController,ModalOptions,ToastController} from 'ionic-angular';
import { AgentsProvider } from "../../providers/agents/agents"
import { NativeStorage } from '@ionic-native/native-storage';
import { OffersqrPage } from '../offersqr/offersqr';
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html'
})
export class PromotionsPage {
  token:any;
  auth_token:any;
  consumerData:any;
  promotions=[]
  agents={};
  gg = "../../assets/imgs/Champagne Filled-100.png"
  concerts = [
    {
      name: 'yeezy world tour 2017',
      artistName: 'Kanye West',
      artistImage: 'https://static.pexels.com/photos/51115/restaurant-wine-glasses-served-51115.jpeg',
      color: '#f73e53'
    },
    {
      name: 'yeezy world tour 2017',
      artistName: 'Kanye West',
      artistImage: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/57890141/Restaurant_View_2.0.jpg',
      color: '#0be3ff'
    },
    {
      name: 'yeezy world tour 2017',
      artistName: 'Kanye West',
      artistImage: 'https://static.pexels.com/photos/51115/restaurant-wine-glasses-served-51115.jpeg',
      color: '#fdd427'
    },
  ];

  constructor(public toast:ToastController,public navCtrl: NavController, private modalCtrl:ModalController ,public nativeStorage: NativeStorage, public agentsProvider:AgentsProvider) {
    this.nativeStorage.getItem('agents').then(
      data => {
        // console.log(JSON.stringify(data))
        for(let i in data){
          // console.log(JSON.stringify(data[i]))
          this.agents[data[i]['_id']] = data[i]
        }
        },
      error => {console.log(JSON.stringify(error));}
      );
    this.nativeStorage.getItem('consumer').then(
      data => {this.token = data['token']
      this.consumerData = data;
      this.auth_token = data["auth-token"]
      // console.log(JSON.stringify(data))
      agentsProvider.getpromotions(this.auth_token,this.token).then(
        offerdata => {
          this.promotions = offerdata['promotions']
          
          for(let i in this.promotions){
            console.log(this.promotions[i]['promotion_data']["background_image"]);
            if(this.promotions[i]['promotion_data'].hasOwnProperty("background_image") != true){
            this.promotions[i]['background_image'] = this.agents[this.promotions[i]['agentId']]['primary_image']
            }
            else{this.promotions[i]['background_image'] = this.promotions[i]['promotion_data']["background_image"] }
            this.promotions[i]['name'] = this.agents[this.promotions[i]['agentId']]['name']
            this.promotions[i]['color'] =  '#f73e53'
          }
          console.log("#########")
          console.log(JSON.stringify(this.promotions))
          },
        error => {console.log(JSON.stringify(error));}
      );
    },
      error => console.error("sfasdfasf")
    );
  }
  openHintModal() {
    this.openModal("OffersqrPage",null);
  }

  openoffersmodal(offer) {

      this.openModal("OffersqrPage",offer);
    

    
  }

  openModal(pageName,offer) {
    const myModalOptions : ModalOptions = {
      enableBackdropDismiss: true,
      showBackdrop:true,
      cssClass: 'inset-modal'
    }
    
    if(this.agents[offer['agentId']]['consumeragent']["_id"]!=undefined){
      var consumeragent = this.agents[offer['agentId']]['consumeragent']["_id"]
      
    }
    else{
      var consumeragent = null;
    }
    let qrmodal = this.modalCtrl.create(OffersqrPage,{transaction_status:{"status":"unknown"},agentInfo:offer["agentId"],consumeragent:consumeragent,offerId:offer['_id'],consumerId:this.consumerData['login_id'],agentpagedata:this}, myModalOptions )
                  

    qrmodal.onDidDismiss((data) => {
                    // This will be executed after the modal is dismissed...
                    console.log('Hi...');
                    if(data!=undefined && data['transaction_id']){
                    }
                    console.log(JSON.stringify(data));
                  });
    qrmodal.present();
           
  }

}
