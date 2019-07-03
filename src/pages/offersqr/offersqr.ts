import { Component, ComponentFactoryResolver } from '@angular/core';
import { ViewController, IonicPage, ToastController,NavController,App, NavParams, FabButton } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { AgentsProvider } from "../../providers/agents/agents"
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { FeedbackPage } from '../feedback/feedback';
/**
 * Generated class for the OffersqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ggg;
@IonicPage()
@Component({
  selector: 'page-offersqr',
  templateUrl: 'offersqr.html',
})

export class OffersqrPage {
  public QRData="";
  public consumer;
  public feedback_data;
  public transaction_status;
  public consumeragent;
  public offerId;
  public transaction_id;
  public consumerId;
  public agentData;
  public ratingvalue;
  public message;
  public agentpagedata;
  openMenu = false;
  checkstatus = true;
  createdCode = null;
  dismissed = false;
  gg = ggg;
  constructor(public app:App,private network: Network,public toast:ToastController,public agnetsProvider:AgentsProvider,public nativeStorage:NativeStorage,public fcm: FCM,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.consumeragent = navParams.get("consumeragent");
    this.offerId = navParams.get("offerId");
    this.agentData = navParams.get("agentInfo");
    this.consumerId = navParams.get("consumerId");
    this.transaction_id = navParams.get("transaction_id");
    this.transaction_status = navParams.get("transaction_status");
    this.agentpagedata = navParams.get("agentpagedata");
    if(this.offerId){
      this.QRData = "o."+this.offerId
    }
    if(this.consumeragent){
      this.QRData = this.QRData+"ca."+this.consumeragent
    }
    if(this.consumerId){
      this.QRData = this.QRData+"c."+this.consumerId
    }
    console.log(this.consumeragent,this.consumerId,this.offerId);
    // this.QRData = JSON.stringify({consumeragent:this.consumeragent,offerId:this.offerId,consumerId:this.consumerId})
    this.gg = "sdfsfsfs"
    console.log(JSON.stringify(this.QRData));
    this.nativeStorage.getItem('consumer').then(
      data => {this.consumer = data},
      error => console.error("sfasdfasf")
    );
    
    let loop = () => {
      if(this.dismissed==false){
      if (this.agentpagedata.checkstatus=="resume"){
        this.agentpagedata.isConsumerAgentUpdated().then(data=>{
          console.log(data)
          if(data==true){
            this.dismissed=true
          this.transaction_status["status"]="success"
          }
          

        })
          
        
        
      }
      setTimeout(() => 
      {
        loop()
      },
      3000);
    }
      
    }
    
    loop()
    this.fcm.getToken().then(token => {
      console.log(token);
      // Your best bet is to here store the token on the user's profile on the
      // Firebase database, so that when you want to send notifications to this 
      // specific user you can do it from Cloud Functions.
    });
    
  //   fcm.onNotification().subscribe(data => {
  //     if (data.wasTapped) {
  //       //Notification was received on device tray and tapped by the user.
        
  //       console.log(JSON.stringify(data));
        
  //     } else {
  //       this.QRData = "afdas";
  //       this.gg = '111111'
  //       //Notification was received in foreground. Maybe the user needs to be notified.
  //       console.log(JSON.stringify(data ));
  //       console.log(this.transaction_status);
  //       this.transaction_status["status"] = data["message"];
  //       console.log(data['message']);
  //       this.transaction_id = data["transaction_id"]
  //       console.log(this.transaction_status);
  //       console.log(JSON.stringify(data.profileId ));
  //       this.toast.create({
  //         message: "Offer Redeemed Successfully",
  //         duration: 3000,
  //         dismissOnPageChange:false
  //       }).present();
  //     }
  //   },
  // error=>{
  //   console.log("ggg")
  //   console.log(JSON.stringify(error));
  // });
  }

  
  ionViewWillLeave() {
    this.dismissed = true;
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersqrPage');
  }
  ratingevent(event){
    this.ratingvalue = event
    console.log(JSON.stringify(event));
  }
  startfeedback(){
    // this.dismiss()
    // this.navCtrl.push(FeedbackPage,{
    //   auth_token:this.consumer['auth_token'],
    //   token:this.consumer['token'],
    //   transaction_id:this.transaction_id,
    //   agentData:this.agentData
    // })
    this.transaction_status["status"] = "feedback"
  }
  requestmsg(){
    console.log(JSON.stringify(this.agentData))
    console.log("gg");
    this.agnetsProvider.feedback({"value":this.ratingvalue,"agentId":this.agentData['_id'],"transactionId":this.transaction_id},this.consumer['auth-token'],this.consumer['token']).then(
      data => {this.feedback_data = data
  },
      error => console.error(JSON.stringify(error))
    );
    this.transaction_status["status"] = "message"
  }
  feedback(){
    
    this.agnetsProvider.updatefeedback({"message":this.message},this.feedback_data["_id"],this.consumer['auth-token'],this.consumer['token']).then(
      data => {this.feedback_data = data
  },
      error => console.error("sfasdfasf")
    );
    this.dismiss()
  }
  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }
  goBack(){
    this.dismiss()
  }
  dismiss() {
    this.dismissed=true
    this.viewCtrl.dismiss({"transaction_id":this.transaction_id});
  }
}
