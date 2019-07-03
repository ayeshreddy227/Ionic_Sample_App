import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginProvider } from '../login/login';
async function sleep(ms: number) {
  await _sleep(ms);
}

function _sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
/*
  Generated class for the AgentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgentsProvider {
  apiUrl = "http://localhost:3000"

  constructor(public http: HttpClient) {
    console.log('Hello AgentsProvider Provider');
  }

  searchagents(substr,skip,total,auth_token,token){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/agents/search',{"headers":{"search-str":substr,"skip":skip.toString(),"total":total.toString(),"auth-token":auth_token,"token":token}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(JSON.stringify(err));
      });
    });
  }
  
  dummy(){
    return new Promise(resolve => {
      
      this.http.get(this.apiUrl+'/dummy').subscribe(data => {
  
        resolve(data);
      }, err => {
        console.log(JSON.stringify(err));
      });
    });
  }
  getoffers(auth_token,token,agentId,rewardpoints){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/offers/'+agentId,{"headers":{"auth-token":auth_token,"token":token,"rewardpoints":rewardpoints}}).subscribe(data => {
  
        resolve(data);
      }, err => {
        console.log(JSON.stringify(err));
      });
    });
  }
  getpromotions(auth_token,token){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/promotions',{"headers":{"auth-token":auth_token,"token":token}}).subscribe(data => {
  
        resolve(data);
      }, err => {
        console.log(JSON.stringify(err));
      });
    });
  }
  getagentsbylocation(lat,long,skip,total,auth_token,token){
    // console.log(lat,long,skip,total)
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/agents/location',{"headers":{"latitude":lat.toString(),"longitude":long.toString(),"skip":skip.toString(),"total":total.toString(),"auth-token":auth_token,"token":token}}).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  }
  recenttransactions(skip,total,auth_token,token){
    console.log(auth_token);
    console.log(token);
    console.log(total);
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/consumer/transactions',{"headers":{"skip":skip.toString(),"limit":total.toString(),"auth-token":auth_token,"token":token}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(JSON.stringify(err));
      });
    });
  }
  feedback(content,auth_token,token){
    console.log(auth_token);
    console.log(token);
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/feedback',content,{"headers":{"auth-token":auth_token,"token":token}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(JSON.stringify(err));
      });
    });
  }
  getConsumerAgent(agentId,auth_token,token){

    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/consumeragent/'+agentId,{"headers":{"auth-token":auth_token,"token":token}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(JSON.stringify(err));
      });
    });
  }
  updatefeedback(content,id,auth_token,token){
    console.log(auth_token);
    console.log(token);
    return new Promise(resolve => {
      this.http.put(this.apiUrl+'/feedback/'+id,content,{"headers":{"auth-token":auth_token,"token":token}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(JSON.stringify(err));
      });
    });
  }

  location(){
    
    return new Promise(resolve => {
      this.http.get('http://ip-api.com/json/',).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  }
  logout(auth_token,token){
    console.log(auth_token);
    console.log(token);
    return new Promise(resolve => {
      this.http.delete(this.apiUrl+'/logout',{"headers":{"auth-token":auth_token,"token":token}}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(JSON.stringify(err));
      });
    });
  }
}
