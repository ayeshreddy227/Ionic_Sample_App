import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  apiUrl = "http://localhost:3000"
  
  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

login(content){
  
  return new Promise(resolve => {
    this.http.post(this.apiUrl+'/login/consumer',content,{"headers":{"api-key":"9MSkGq32VLjzs2Sv"}}).subscribe(data => {
      console.log(data);
      resolve(data);
    }, err => {
      console.log(err);
    });
  });

}

checkPhone(content){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/consumer/phone/'+content,{"headers":{"api-key":"9MSkGq32VLjzs2Sv"}}).subscribe(data => {
      console.log(data);
      resolve(data);
    }, err => {
      console.log(JSON.stringify(err));
    });
  });
}
sendotp(phone){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/sendotp',{"headers":{"api-key":"9MSkGq32VLjzs2Sv","phone":phone}}).subscribe(data => {
      console.log(data);
      resolve(data);
    }, err => {
      console.log(JSON.stringify(err));
    });
  });
}
validateotp(phone,otp){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/validateotp',{"headers":{"api-key":"9MSkGq32VLjzs2Sv","phone":phone,"otp":otp}}).subscribe(data => {
      console.log(data);
      resolve(data);
    }, err => {
      console.log(JSON.stringify(err));
    });
  });
}
signup(content){
  return new Promise(resolve => {
    this.http.post(this.apiUrl+'/consumer',content,{"headers":{"api-key":"9MSkGq32VLjzs2Sv"}}).subscribe(data => {
      console.log(data);
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
}
// this.http.get('http://ionic.io', {}, {})
//   .then(data => {

//     console.log(data.status);
//     console.log(data.data); // data received by server
//     console.log(data.headers);

//   })
//   .catch(error => {

//     console.log(error.status);
//     console.log(error.error); // error message as string
//     console.log(error.headers);

//   });