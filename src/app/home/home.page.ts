import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedsService, RootObject } from '../service/feeds.service';
import { IonInfiniteScroll } from '@ionic/angular';


//interfaccia per Refresh
interface RefresherEventDetail {
  complete(): void;
}
interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail;
  target: HTMLIonRefresherElement;
}


//interfaccia per Infinite Scroll
interface InfiniteScrollCustomEvent extends CustomEvent {
  target: HTMLIonInfiniteScrollElement;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //Robe da Importare per Infinite Scroll
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  feeds: RootObject[];

  defaultOptions = {skip: 0 , limit: 10};
  currentSkip = 0 ;

  constructor(private feedService : FeedsService) {}

  async ngOnInit() {
    this.feeds = await this.feedService.getFeeds(this.defaultOptions);
  }

  //refresh
  async doRefresh(event:RefresherCustomEvent) {
    this.feeds = [];
    this.feeds = await this.feedService.getFeeds(this.defaultOptions);
    this.currentSkip=0;
    event.target.complete();
  }



  //infinite Scroll

  async loadData(event:InfiniteScrollCustomEvent){

    this.currentSkip = this.currentSkip + this.defaultOptions.limit;

    const newFeeds = await this.feedService.getFeeds({
      limit: this.defaultOptions.limit,
      skip: this.currentSkip 
    });

    this.feeds = [...this.feeds, ...newFeeds]
    
    
    event.target.complete()
  }

}
