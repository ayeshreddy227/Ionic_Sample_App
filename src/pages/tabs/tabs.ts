import { Component } from '@angular/core';

import { PromotionsPage } from '../promotions/promotions';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PromotionsPage;
  tab3Root = SearchPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
