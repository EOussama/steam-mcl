import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  // The cards
  cards = [
    {
      icon: 'games',
      title: 'Games',
      description: 'Lookup prequels, sequels, spin-offs, and everything related to the games you already own.\
      Putting together a collection has never been easier.'
    },
    {
      icon: 'widgets',
      title: 'DLCs',
      description: 'Lookup missing DLCs for the games you already own by the press of a button. \
      Line up together every piece of extra content of the games you own. Svae up the pain of manually looking \
      them up, and invest more time and energy in enjoying them instead.'
    },
    {
      icon: 'apps',
      title: 'Packages',
      description: 'Lookup packages that your games are part of for easier related content consumption.\
       You never want to bother with manually looking up the games that make your favorite franchise. \
       Have them all reported to you with no more hassle.'
    }
  ];
}
