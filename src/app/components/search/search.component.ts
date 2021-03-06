import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SearchService } from 'src/app/services/search/search.service';
import { TranslateHelper } from 'src/app/helpers/translate/translate.helper';

import { collapseAnimation } from 'src/app/animations/searchcollapse';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: collapseAnimation
})
export class SearchComponent implements OnInit {

  //#region Properties

  /**
   * The search component collapse state
   */
  collapse: boolean = false;

  /**
   * The loading state
   */
  loading: boolean = false;

  //#endregion

  //#region View children

  /**
   * The search input's reference
   */
  @ViewChild('searchInputRef', { static: true }) searchInputRef: ElementRef;

  //#endregion

  //#region Constructor

  /**
   * The search component constructor
   * @param search The search service
   */
  constructor(
    private search: SearchService,
    private router: Router
  ) { }

  //#endregion

  //#region Functions

  /**
   * Gets the proper state of the collapse trigger
   */
  getState = () => this.collapse ? 'closed' : 'opened';

  //#endregion

  //#region Lifecycle

  ngOnInit(): void {

    // Getting the search input
    const searchInput: HTMLInputElement = this.searchInputRef.nativeElement;

    // Getting the current URL
    const url: string = document.location.pathname;

    // Extracting URL fragments
    const urlFragments: string[] = url.split('/').filter((uf: string) => uf.length > 0);

    // Extracting the route name
    const route: string = urlFragments[0] || null;

    // Extracting the Steam ID
    const steamID: string = decodeURIComponent(urlFragments[1]) || null;

    // Checking if the route is pointing to the lookup page
    if (route === 'lookup') {

      // Populating the search input
      searchInput.value = steamID;

      // Firing the change event
      searchInput.dispatchEvent(new Event('change'));
    }

    // Subscribing to the URL change event
    this.router.events.subscribe((e) => {

      // Checking if the navigation has ended
      if (e instanceof NavigationEnd) {

        // Getting the current URL
        const navUrl: string = document.location.pathname;

        // Extracting URL fragments
        const navUrlFragments: string[] = navUrl.split('/').filter((uf: string) => uf.length > 0);

        // Extracting the route name
        const navRoute: string = navUrlFragments[0] || null;

        // Updating the collapse state
        this.collapse = navRoute === 'lookup';
      }
    });
  }

  //#endregion

  //#region Event listeners

  /**
   * The event listener of the search input
   *
   * @param e The event object
   */
  onSearchChanged(e: Event) {

    // Getting the input
    const searchInput: HTMLInputElement = this.searchInputRef.nativeElement;

    // Getting the search term
    const searchTerm = searchInput.value;

    // Checking if the search term is valid
    if (searchTerm && searchTerm.length > 0) {

      // Updating the loading state
      this.search.searchActivated = this.loading = true;

      // Starting the search event
      this.search
        .start(searchTerm)
        .finally(() => {

          // Updating the loading state
          this.loading = false;
        });
    }
  }

  /**
   * The event listener of the back button click
   */
  onBackClicked(): void {

    // Getting the input
    const searchInput: HTMLInputElement = this.searchInputRef.nativeElement;

    // Clearing the input
    searchInput.value = '';

    // Updating the loading state
    this.search.searchActivated = this.loading = false;
  }

  //#endregion

  //#region Methods

  /**
   * Gets the current language
   */
  getLanguage = () => TranslateHelper.currentLanguage;

  //#endregion
}
