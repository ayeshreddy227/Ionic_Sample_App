import { Component,ViewChild } from '@angular/core';
import { NavController,LoadingController, Slides, AlertController,Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginProvider } from '../../providers/login/login'
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AgentsProvider } from "../../providers/agents/agents"
import { FCM } from '@ionic-native/fcm';
declare var AdvancedGeolocation:any;
declare var Keyboard: any;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  // public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  isLoggedIn:boolean = false;
  isenabled:boolean=false;
  users: any;
  code: any;
  phone: any;
  email: any;
  name: any;
  lat:any;
  long:any;
  public fcmId:any;
  public itemDate = (new Date()).toISOString();
  public gg = "Phone Number";
  public backgroundImage = "../assets/imgs/small_gift-wallpaper-1280x800.jpg";
  otp: any;
  constructor(public fcm:FCM,public platform:Platform,public geolocation:Geolocation,public agentsProvider:AgentsProvider,public navCtrl: NavController,public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,public loginprovider: LoginProvider,public nativeStorage:NativeStorage) {
      Keyboard.disableScroll();
      this.fcm.getToken().then(token => {
        this.fcmId = token
        // Your best bet is to here store the token on the user's profile on the
        // Firebase database, so that when you want to send notifications to this 
        // specific user you can do it from Cloud Functions.
      });
   
  }
//facebook login code

  // login() {
  //   this.fb.login(['public_profile', 'user_friends', 'email'])
  //     .then(res => {
  //       if(res.status === "connected") {
  //         this.getUserDetail(res.authResponse.userID);
  //         this.navCtrl.push(TabsPage);
  //       } else {
  //         this.isLoggedIn = false;
  //       }
        
  //     })
  //     .catch(e => console.log('Error logging into Facebook', e));
  // }

  // logout() {
  //   this.fb.logout()
  //     .then( res => this.isLoggedIn = false)
  //     .catch(e => console.log('Error logout from Facebook', e));
  // }

  // getUserDetail(userid) {
  //   this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
  //     .then(res => {
  //       console.log(res);
  //       this.users = res;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }
 // Slider methods

 ionViewDidLoad() {
  // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
}

 @ViewChild('slider') slider: Slides;
 @ViewChild('innerSlider') innerSlider: Slides;
 @ViewChild('innerSlider2') innerSlider2: Slides;
 
  goToLogin() {
    
    this.slider.slideTo(1);
  }
  
  goToSignup() {
    this.slider.slideTo(2);
  }
  slideNext() {
    // this.slider.update();
    const loading = this.loadingCtrl.create({
      duration: 500
    });
    loading.present();
    this.loginprovider.checkPhone(this.phone).then(
      loginData => {
        if("error" in loginData){this.presentLoading("Phone Number doesn't exist please Sign up")
        this.goToSignup();}
        
        else{
          this.loginprovider.sendotp(this.phone).then(data=>{},error=>{});
          this.innerSlider.slideNext();
        }
        },
      error => {this.presentLoading("Phone Number doesn't exist please Sign up")
      this.goToSignup();}
    );
    
    
    
  }
  slideNextSignUP() {
    // this.slider.update();
    console.log("sdfasdfsdfasdfasdf");
    console.log(this.itemDate);
    const loading = this.loadingCtrl.create({
      duration: 500
    });
    loading.present();
    this.loginprovider.checkPhone(this.phone).then(
      loginData => {
        if("error" in loginData){}
        
        else{
          this.goToLogin();
          // this.loginprovider.sendotp(this.phone).then(data=>{},error=>{});
          this.innerSlider.slideNext();
        }
        },
      error => {}
    );
    this.loginprovider.sendotp(this.phone).then(data=>{},error=>{});
    this.innerSlider2.slideNext();
  }


  slidePrevious() {
    this.innerSlider.slidePrev();
  }
  slidePreviousSignUP() {
    this.innerSlider2.slidePrev();
  }


  presentLoading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }
  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  // if(){
  //   console.log("sdfsf");
  //   if(this.isNumeric(this.phone && this.phone.length==10)){
  //     this.isenabled = true;
  //   }
  // }

  checkenabled(val){
    if(this.isNumeric(val) && val.length==10){
      this.isenabled = true;
    }
    else{
      this.isenabled = false;
    }
  }
  getlocationsandagents(){
    
  }
  validateotptologin(){
    this.loginprovider.validateotp(this.phone,this.otp).then(
      loginData => {
        if(loginData.hasOwnProperty("error")){
          this.presentLoading("Invalid OTP")
        }
        
        else{this.login()}
        }
  ,
  error => this.presentLoading("Invalid OTP")
);
}
validateotptosignup(){
  this.loginprovider.validateotp(this.phone,this.otp).then(
    loginData => {
      if(loginData.hasOwnProperty("error")){
        this.presentLoading("Invalid OTP")
      }
      else{
      this.signup()}}
,
error => this.presentLoading("Invalid OTP")
);
}
  login() {
    this.gg = "Opt";
    const loading = this.loadingCtrl.create({
      
    });
    loading.present();
    
    this.loginprovider.login({"consumer_id":this.phone,"type":"phone","fcmId":this.fcmId}).then(
      loginData => {
        console.log(JSON.stringify(loginData));
        if("token" in loginData){this.nativeStorage.setItem('auth-token', loginData["auth-token"])
        this.nativeStorage.setItem('token', loginData["token"])
        this.nativeStorage.setItem('consumer', loginData)
      //   const config: BackgroundGeolocationConfig = {
      //     desiredAccuracy: 10,
      //     stationaryRadius: 20,
      //     distanceFilter: 30,
      //     debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      //     stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      // };
      
      // this.backgroundGeolocation.configure(config)
      // .subscribe((location: BackgroundGeolocationResponse) => {
      
      // console.log(JSON.stringify(location));
      
      // // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      // // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
      // // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      // this.backgroundGeolocation.finish(); // FOR IOS ONLY
      
      // });
      
      // // start recording location
      // this.backgroundGeolocation.start();
      
      // // If you wish to turn OFF background-tracking, call the #stop method.
      // this.backgroundGeolocation.stop();
      if (this.platform.is('android')) {
        this.platform.ready().then(() => {
          console.log("gg");
          
          
        })
      };
        this.agentsProvider.location().then((resp) => {
          this.lat = resp["lat"]
        this.long = resp['lon']
          if(this.lat!=null){
          console.log(this.lat,this.long);
          console.log("sdfasdf");
          this.nativeStorage.setItem('coordinates', {"lat":this.lat,"long":this.long});
          }
          else{
            this.lat = "17.3753"
      this.long = "78.4744"
            this.nativeStorage.setItem('coordinates', {"lat":this.lat,"long":this.long});
          
          }
          this.agentsProvider.getagentsbylocation(this.lat,this.long,0,10,loginData['auth-token'],loginData['token']).then(
            agentsData => {loading.dismiss();
              this.nativeStorage.setItem('agentsFullData', agentsData);
              this.nativeStorage.setItem('agents', agentsData["agents"]);
              this.navCtrl.push(TabsPage);
              
              },
            error => {console.log(JSON.stringify(error));}
          );
        
          
    
      },
      error => {console.log(JSON.stringify(error));}
    );
        }
        
        else{
          this.presentLoading("Phone Number doesn't exist please Sign up")
        }
        },
      error => this.presentLoading("Phone Number doesn't exist please Sign up")
    );
  //   this.nativeStorage.setItem('myitem', "ggg!")
  //   this.nativeStorage.getItem('myitem')
  // .then(
  //   data => console.log(data),
  //   error => console.error(error)
  // );
    
    // this.presentLoading('Thanks for signing up!');
    // this.navCtrl.push(HomePage);
  }

  signup() {
    const loading = this.loadingCtrl.create({
      
    });
    loading.present();
    this.fcm.getToken().then(token => {
      console.log(token);
      // Your best bet is to here store the token on the user's profile on the
      // Firebase database, so that when you want to send notifications to this 
      // specific user you can do it from Cloud Functions.
    
    this.loginprovider.signup({"fcm_id":token,"email":this.email,"phone":this.phone,"name":this.name,"birthday":this.itemDate.split("T")[0],"type":"phone","consumer_id":this.phone}).then(
      consumerData=>{
        this.loginprovider.login({"consumer_id":this.phone,"type":"phone","fcmId":this.fcmId}).then(
          loginData => {
            
            console.log(loginData);
            if("token" in loginData){this.nativeStorage.setItem('auth-token', loginData["auth-token"])
            this.nativeStorage.setItem('token', loginData["token"])
            this.nativeStorage.setItem('consumer', loginData)
            this.agentsProvider.location().then((resp) => {
              this.lat = resp["lat"]
              this.long = resp['lon']
              if(this.lat!=null){
                console.log(this.lat,this.long);
                console.log("sdfasdf");
                this.nativeStorage.setItem('coordinates', {"lat":this.lat,"long":this.long});
                }
                else{
                  this.lat = "17.3753"
            this.long = "78.4744"
                  this.nativeStorage.setItem('coordinates', {"lat":this.lat,"long":this.long});
                
                }
              console.log(this.lat,this.long);
              this.agentsProvider.getagentsbylocation(this.lat,this.long,0,10,loginData['auth-token'],loginData['token']).then(
                agentsData => {loading.dismiss();
                  this.nativeStorage.setItem('agentsFullData', agentsData);
                  this.nativeStorage.setItem('agents', agentsData["agents"]);
                  this.navCtrl.push(TabsPage);
                  
                  },
                error => {console.log(JSON.stringify(error));}
              );
            
              
            // document.getElementById("gg").innerText = location;
          });
          }
            
            else{
              this.presentLoading("Phone Number doesn't exist please Sign up")
            }
            },
          error => this.presentLoading("Phone Number doesn't exist please Sign up")
        );
      }
    );
    
    this.presentLoading('Thanks for signing up!');
    // this.navCtrl.push(HomePage);
  });
  }
  // signIn(){
  //   console.log(this.opt);
  //   // const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = "+" + "8466969090";
  //   this.firebase.onNotificationOpen()
  //   this.firebase.getToken()
  //   .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
  //   .catch(error => console.error('Error getting token', error));
  //   this.firebase.getVerificationID(phoneNumberString)
  //     .then( confirmationResult => {
  //       // this.code = confirmationResult
  //       console.log(confirmationResult);
  //       console.log(this.code);
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //   })
  //   .catch(function (error) {
  //     console.error("SMS not sent", error);
  //     console.log(JSON.stringify(error));
  //   });
  //   this.innerSlider.slideNext();
  
  // }

}

// sample http request
