import { Component } from '@angular/core';
import { NavController,LoadingController,Select,ToastController,ModalController,ModalOptions, Loading,NavParams,Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AgentpagePage } from '../agentpage/agentpage';
import { FilterPage } from '../filter/filter';
import { AgentsProvider } from "../../providers/agents/agents"
import { NativeStorage } from '@ionic-native/native-storage';
import { FCM } from '@ionic-native/fcm';
// import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
// import { Geofence } from '@ionic-native/geofence';
// import {BGService} from '../home/BGService';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [AgentsProvider]
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  location = "Hyderabad";
  street: any;
  lat:any;
  long:any;
  searchtype = "Nearby"
  public agents=[]
  public slideData = []
  public token = ""
  public auth_token = ""
  public consumerData = {}

  // private bgService: BGService;
  public identifier: string;
  public radius: string;
  private latitude: number;
  private longitude: number;
  public notifyOnEntry: boolean;
  public notifyOnExit: boolean;
  public notifyOnDwell: boolean;
  public loiteringDelay: number;
  public radiusOptions: any;

  offers = [{url:"https://static.pexels.com/photos/51115/restaurant-wine-glasses-served-51115.jpeg"},{url:"http://www.realdetroitweekly.com/wp-content/uploads/2017/06/Restaurants.jpg"}]
  @ViewChild('mySelect') selectRef: Select;
  constructor( private fcm: FCM, private backgroundGeolocation: BackgroundGeolocation, private modalCtrl:ModalController ,public platform: Platform,public toast:ToastController, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public nativeStorage: NativeStorage,public navCtrl: NavController,public navParams:NavParams,private geolocation: Geolocation, public agentsProvider:AgentsProvider) {
    // this.bgService = this.bgServices;
    this.identifier = '';
    this.radius = '200';
    this.latitude = this.navParams.get('latitude');
    this.longitude = this.navParams.get('longitude');
  
    this.notifyOnEntry = true;
    this.notifyOnExit = false;
    this.notifyOnDwell = false;
  
    this.radiusOptions = [100, 150, 200, 500, 1000, 5000, 10000];
    
    
    this.nativeStorage.getItem('agents').then(
        data => {this.agents = data
        },
        error => console.error("sfasdfasf")
      );
    
    this.nativeStorage.getItem('consumer').then(
      data => {this.token = data['token']
      this.consumerData = data
      console.log(data)},
      error => console.error("sfasdfasf")
    );
    this.nativeStorage.getItem('auth-token').then(
      data => {this.auth_token = data
      console.log(data)},
      error => console.error("sfasdfasf")
    );
    this.nativeStorage.getItem('coordinates').then(
      data => {this.lat = data['lat']
      this.long = data['long']
      console.log(data)},
      error => console.error("sfasdfasf")
    );
    this.nativeStorage.getItem('agentsFullData').then(
      data => {this.location = data['location']
      
    this.slideData = data['slide']},
      error => console.error("sfasdfasf")
    );
        fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        //Notification was received on device tray and tapped by the user.
        this.navCtrl.parent.select(1);
        console.log('sdf');
        
      } else {
        }
    },
  error=>{
    console.log(JSON.stringify(error));
  });

  //   var self = this
  //   document.addEventListener('deviceready', function (this) {
  //     // window.geofence is now available
  //     geofence.initialize().then(function () {
  //         console.log("Successful initialization");
          
          
  //     }, function (error) {
  //         console.log("Error", error);
  //     });
     
  //     platform.ready().then(() => {
  //       this.addGeofence()
  //     });
  // }, false);
//   const config: BackgroundGeolocationConfig = 
//     {
//       desiredAccuracy: 10,
//       stationaryRadius: 0,
//       distanceFilter: 0,
//       // notificationTitle: 'Background tracking',
//       // notificationText: 'enable d',
//       // debug: true,
//       interval: 1000,
//       // url: 'http://192.168.0.4:5000/dummygg',
//       // httpHeaders: {
//         // 'X-FOO': 'bar'
//       // }
//       // customize post properties
//     // enable this to clear background location settings when the app terminates
// };
// let bgGeo = this.bgService.getPlugin();
//     let radius = parseInt(this.radius, 10);
//     bgGeo.addGeofence({
//       identifier: this.identifier,
//       radius: radius,
//       latitude: this.latitude,
//       longitude: this.longitude,
//       notifyOnEntry: this.notifyOnEntry,
//       notifyOnExit: this.notifyOnExit,
//       notifyOnDwell: this.notifyOnDwell,
//       loiteringDelay: this.loiteringDelay,
//       extras: {
//         radius: radius,
//         center: {latitude: this.latitude, longitude: this.longitude}
//       }
//     }, (identifier) => {
//     }, (error) => {
//       console.log(error);
//     })
// this.backgroundGeolocation.configure(config)
// .subscribe((location: BackgroundGeolocationResponse) => {

// console.log("location ::",JSON.stringify(location));

// // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
// // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
// // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
// this.backgroundGeolocation.finish(); // FOR IOS ONLY

// });

// // start recording location
// this.backgroundGeolocation.start();

// // If you wish to turn OFF background-tracking, call the #stop method.
// this.backgroundGeolocation.stop();
  
    // geofence.initialize().then(
    //   // resolved promise does not return a value
    //   (data) => {
    //     console.log("ggggggggg")
    //     console.log(JSON.stringify(data))
    //     this.addGeofence()
    //   // this.addGeofence()
    // },
    //   (err) => console.log(err)
    // )
    
// this.geolocation.getCurrentPosition().then((resp) => {
//       // this.lat = resp.coords.latitude
//       // this.long = resp.coords.longitude
//       // console.log(this.lat,this.long);
//       console.log('sdasdfa');
//       console.log(resp.coords.latitude);
    
      
//     // document.getElementById("gg").innerText = location;
//   });
  }
  // ionViewDidEnter() {
  //   this.network.onConnect().subscribe(data => {
  //     console.log(data)
  //     this.displayNetworkUpdate(data.type);
  //   }, error => console.error(error));
   
  //   this.network.onDisconnect().subscribe(data => {
  //     console.log(data)
  //     this.displayNetworkUpdate(data.type);
  //   }, error => console.error(error));
  // }
  // displayNetworkUpdate(connectionState: string){
  //   let networkType = this.network.type;
  //   this.toast.create({
  //     message: `You are now ${connectionState} via ${networkType}`,
  //     duration: 3000,
  //     dismissOnPageChange:false
  //   }).present();
  // }
 
  
  searchtypechange(event){
    console.log(event)
    let indexestoberemoved = []
    if(event=="Visited"){
      for(var i = 0, size = this.agents.length; i < size ; i++){
          console.log(this.agents[i]['consumeragent'].hasOwnProperty('_id'))
          if(this.agents[i]['consumeragent'].hasOwnProperty('_id')!=true){
              indexestoberemoved.push(i)
              
          }
      }
      console.log(indexestoberemoved)
      for(var i = indexestoberemoved.length-1; i >= 0 ; i--){
        this.agents.splice(indexestoberemoved[i],1)
      }
      console.log(JSON.stringify(this.agents))
    }
    else{
      this.nativeStorage.getItem('agents').then(
        data => {this.agents = data
        },
        error => console.error("sfasdfasf")
      );
    }
  }
  OpenListing(item){
    item['auth-token'] = this.auth_token;
    item['token'] = this.token;
    this.navCtrl.push(AgentpagePage,{
      agentData: item,
      consumerData:this.consumerData
    });
  }
  doRefresh(refresher){
   
    setTimeout(() => {
      var options = {timeout:5000}
      this.agentsProvider.location().then((resp) => {
        console.log(JSON.stringify(resp));
        this.lat = resp["lat"]
        this.long = resp['lon']
        // console.log(this.lat,this.long);
        this.nativeStorage.setItem('coordinates', {"lat":this.lat,"long":this.long});
      this.agentsProvider.getagentsbylocation(this.lat,this.long,0,10,this.auth_token,this.token).then(
        agentsData => {
          this.nativeStorage.setItem('agentsFullData', agentsData);
          this.nativeStorage.setItem('agents', agentsData["agents"]);
          this.location = agentsData['location']
          this.slideData = agentsData['slide']
          refresher.complete();
          },
        error => {console.log(JSON.stringify(error));}
      );
    },errr=>{console.log(JSON.stringify(errr))});
      refresher.complete();
    }, 5000);


    
  }
  openSelect()
  {
      this.selectRef.open();
  }

  closeSelect()
  {
      this.selectRef.close();
  }
  openHintModal() {
    this.openModal("OffersqrPage",null);
  }

  openoffersmodal(offer) {
    this.openModal("OffersqrPage",offer["_id"]);
  }

  openModal(pageName,offer) {
    const myModalOptions : ModalOptions = {
      enableBackdropDismiss: true,
      showBackdrop:true,
      cssClass: 'inset-modal'
    }
    
    
    let qrmodal = this.modalCtrl.create(FilterPage, myModalOptions )
                  

    qrmodal.onDidDismiss((data) => {
                    // This will be executed after the modal is dismissed...
                    console.log('Hi...');
                    if(data!=undefined && data['transaction_id']){
                      // this.getConsumerdata()
                      console.log(data);
                    }
                    console.log(JSON.stringify(data));
                  });
    qrmodal.present();
           
  }

  private addGeofence() {
    //options describing geofence
    let fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d374dfgsddfsdfasfsfsadfsdfsafasdf', //any unique ID
      latitude:       17.440533208518826, //center of geofence radius
      longitude:      78.39179911084457,
      radius:         100, //radius to edge of geofence in meters
      // transitionType: this.geofence.TransitionType.ENTER, //see 'Transition Types' below
      notification: { //notification settings
          id:             1, //any unique ID
          title:          'You crossed a fence', //notification title
          text:           'You just arrived to Gliwice city center.', //notification body
          openAppOnClick: false //open app when notification is tapped
      }
    }

    // this.geofence.remove("69ca1b88-6fbe-4e80-a4d4-ff4d3748acdc")
    // .then(function () {
    //     console.log('Geofence sucessfully removed');
    // }
    // , function (error){
    //     console.log('Removing geofence failed', error);
    // });
    // this.geofence.addOrUpdate(fence).then(
    //      (data) => console.log(JSON.stringify(data)),
    //      (err) => console.log('Geofence failed to add')
    //    );
    // this.geofence.removeAll()
    // .then(function () {
    //     console.log('All geofences successfully removed.');
    //     this.geofence.getWatched().then(data=>{console.log(JSON.stringify(data))},error=>{})

    // }
    // , function (error) {
    //     console.log('Removing geofences failed', error);
    // });
    // this.geofence.removeAll().then(
    //      (data) => {
    //        console.log(JSON.stringify(data));
    //       this.geofence.getWatched().then(data=>{console.log(JSON.stringify(data))},error=>{})
    // //        this.geofence.addOrUpdate(fence).then(
    // //    (data) => console.log(JSON.stringify(data)),
    // //    (err) => console.log('Geofence failed to add')
    // //  );
    //      },
    //      (err) => console.log('Geofence failed to add')
    //    );
  //   this.geofence.onTransitionReceived = function (geofences) {
  //     geofences.forEach(function (geo) {
  //         console.log('Geofence transition detected', geo);
  //     });
  // };
    // this.geofence.getWatched().then(data=>{console.log(JSON.stringify(data))},error=>{})
     
  }
  
}
//   this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
//   .then((result: NativeGeocoderReverseResult) =>{ this.street = JSON.stringify(result);})
//   .catch((error: any) => console.log(error));
//  }).catch((error) => {
//    console.log('Error getting location', error);
//  });