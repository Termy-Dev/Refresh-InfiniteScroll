import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Creator {
  id: string;
  phone: string;
  nickname: string;
}

export interface RootObject {
  id: string;
  message: string;
  creator: Creator;
  imageUrl: string;
  date: Date;
  likes: any[];
  comments: any[];
}

//creo una mia interfaccia 
export type Countable = {
  limit: number;
  skip: number;
}

@Injectable({
  providedIn: 'root'
})
export class FeedsService {


  apiUrl:string = "https://feeds-fake.herokuapp.com/feeds";
  constructor(private http : HttpClient) { }

  getFeeds(countable: Countable){
    const {limit = 10 , skip = 0} = countable

    return this.http.get<RootObject[]>(`${this.apiUrl}?limit=${limit}&skip=${skip}`).toPromise();
  }

  

}
