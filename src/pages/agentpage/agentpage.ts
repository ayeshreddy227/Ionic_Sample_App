import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, ModalController,ModalOptions, ViewController } from 'ionic-angular';
import { OffersqrPage } from '../offersqr/offersqr';
import { FilterPage } from '../filter/filter';
import { AgentsProvider } from "../../providers/agents/agents";
import { NativeStorage } from '@ionic-native/native-storage';
import { FCM } from '@ionic-native/fcm';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

/**
 * Generated class for the AgentpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-agentpage',
  templateUrl: 'agentpage.html',
})
export class AgentpagePage {
  public transaction_statuss = "success";
  public agentData;
  public consumeragentupdated = false;
  public consumerData;
  public consumeragent={};
  public checkstatus='resume';
  user = {
    name: 'Cosima Niehaus',
    profileImage: 'assets/img/avatar/girl-avatar.png',
    coverImage: 'assets/img/background/background-5.jpg',
    occupation: 'Designer',
    location: 'Seattle, WA',
    description: 'Passionate Designer. Recently focusing on developing mobile hybrid apps and web development.',
    address: '27 King\'s College Cir, Toronto, ON M5S, Canada',
    phone: '555 555 555',
    email: 'cosima@niehaus.com',
    whatsapp: '555 555 555',
  };


  public offers;
  flipped: boolean = false;
  // offers = [{"points":"100 pts","description":"Get Free Coke","image":"../../assets/imgs/Food Filled-100.png"},{"points":"100 pts","description":"Get Free Coke","image":"../../assets/imgs/Ice Cream Cone Filled-100.png"},{"points":"100 pts","description":"Get Free Coke","image":"../../assets/imgs/French Fries-104.png"}]
  constructor( public toast:ToastController, public fcm: FCM,public navCtrl: NavController, public navParams: NavParams,public nativeStorage:NativeStorage, private modalCtrl:ModalController , public viewCtrl: ViewController,public agentsProvider:AgentsProvider) {
    this.agentData = navParams.get("agentData");
    this.consumerData = navParams.get("consumerData");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(JSON.stringify(this.agentData));
    let startdate = this.agentData['starttime'].split(" ")[1].split(":")
    let starttime = startdate[0]+":"+startdate[1]
    let enddate = this.agentData['endtime'].split(" ")[1].split(":")
    let endtime = enddate[0]+":"+enddate[1]
    document.addEventListener("pause", () => {
      this.checkstatus = 'pause'
      console.log('paused');
    }, false);
    
    document.addEventListener("resume", () => {
      this.checkstatus = 'resume'
      console.log('resume');
      // loop()
    }, false);
    this.fcm.getToken().then(token => {
      console.log(token);
      // Your best bet is to here store the token on the user's profile on the
      // Firebase database, so that when you want to send notifications to this 
      // specific user you can do it from Cloud Functions.
    });
    this.agentsProvider.getConsumerAgent(this.agentData['_id'],this.agentData['auth-token'],this.agentData['token']).then(
      data => {this.consumeragent = data
        console.log(JSON.stringify(this.agentData))
        console.log(JSON.stringify(this.consumeragent))
        if(this.agentData.consumeragent){
          this.agentsProvider.getoffers(this.agentData['auth-token'],this.agentData['token'],this.agentData['_id'],this.agentData.consumeragent['rewardpoints'].toString()).then(
            data => {this.offers = data["offers"]
            console.log(JSON.stringify(this.offers))
        },
            error => console.error("sfasdfasf")
          );
          
        }
        else{
          this.agentsProvider.getoffers(this.agentData['auth-token'],this.agentData['token'],this.agentData['_id'],"0").then(
            data => {this.offers = data["offers"]
            console.log(JSON.stringify(this.offers))
        },
            error => console.error("sfasdfasf")
          );
          
        }
  },
      error => console.error("sfasdfasf")
    );
    // let starttime = startdate.getHours().toString()+":"+startdate.getMinutes().toString()
    // let enddate = new Date(this.agentData['endtime'])
    // let endtime = enddate.getHours().toString()+":"+enddate.getMinutes().toString()
    this.agentData['timings'] = starttime+"-"+endtime
    if (!this.agentData["consumeragent"].hasOwnProperty("rewardpoints")){
      this.agentData['consumeragent']['rewardpoints'] = 0
    }
    
    this.offers = [];
  }

  ionViewDidLoad() {

      this.viewCtrl.setBackButtonText('');
      

    
    
   
  }
  getConsumerdata(){
    this.agentsProvider.getConsumerAgent(this.agentData['_id'],this.agentData['auth-token'],this.agentData['token']).then(
      data => {this.consumeragent = data
  },
      error => console.error("sfasdfasf")
    );
  }
  isConsumerAgentUpdated(){
    return new Promise((resolve, reject) => {
      let currentUpdatedAt = this.consumeragent['updated_at']
    
    this.agentsProvider.getConsumerAgent(this.agentData['_id'],this.agentData['auth-token'],this.agentData['token']).then(
      data => {
        this.consumeragent = data
      if(currentUpdatedAt==this.consumeragent['updated_at']){
        resolve(false)
      }
      else{
        console.log(true)
        this.consumeragentupdated = true
        resolve(true)
      }
  },
      error => console.error("sfasdfasf")
    );
     
   })
    
    
  }
  flip(){
    this.flipped = !this.flipped;
  }
  generateQR(item){
    const myModalOptions : ModalOptions = {
      enableBackdropDismiss: false
    }
    // this.navCtrl.push(OffersqrPage,{
    //   QRData: item
    // },{animation:"wp-transition"});

  }
  
  // offersbarcodescan(){
  //   this.barcodeScanner.scan().then((barcodeData) => {
  //     // Success! Barcode data is here
  //    }, (err) => {
  //        // An error occurred
  //    });

  // }
  // itemTapped() {
  //   this.navCtrl.push(OffersqrPage,{QRData:{"description":"ssfdasfsdfasfa"}});
  // }
  openHintModal() {
    this.openModal("OffersqrPage",null);
  }

  openoffersmodal(offer) {
    if(offer.enabled==true){
      this.openModal("OffersqrPage",offer["_id"]);
    }
    else{
      this.toast.create({
        message: "Oops! insufficient points",
        duration: 3000,
        dismissOnPageChange:false
      }).present();
    }
    
  }

  openModal(pageName,offer) {
    const myModalOptions : ModalOptions = {
      enableBackdropDismiss: true,
      showBackdrop:true,
      cssClass: 'inset-modal'
    }
    
    if(this.agentData['consumeragent']["_id"]!=undefined){
      var consumeragent = this.agentData['consumeragent']["_id"]
      
    }
    else{
      var consumeragent = null;
    }
    let qrmodal = this.modalCtrl.create(OffersqrPage,{transaction_status:{"status":"unknown"},agentInfo:this.agentData,consumeragent:consumeragent,offerId:offer,consumerId:this.consumerData['login_id'],agentpagedata:this}, myModalOptions )
                  

    qrmodal.onDidDismiss((data) => {
                    // This will be executed after the modal is dismissed...
                    console.log('Hi...');
                    if(data!=undefined && data['transaction_id']){
                      this.getConsumerdata()
                    }
                    console.log(JSON.stringify(data));
                  });
    qrmodal.present();
           
  }
}
