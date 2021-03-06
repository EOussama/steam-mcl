import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Scopes } from 'src/app/enums/scopes.enum';

/**
 * The translation helper
 */
export class TranslateHelper {

  //#region Properties

  /**
   * The current language
   */
  static currentLanguage: string = '';

  //#endregion

  //#region Methods

  /**
   * Initializes the translation service
   *
   * @param translate The translation service
   */
  static init = (translate: TranslateService): Promise<any> =>
    new Promise((resolve, reject) => {
      translate.addLangs(['en']);
      translate.setDefaultLang('en');
      translate.use('en')
        .toPromise()
        .then(() => {
          TranslateHelper.currentLanguage = translate.currentLang;
          resolve(TranslateHelper.currentLanguage);
        })
        .catch((err: any) => {
          reject(err);
        });
    })


  /**
   * Returns translations given their scope
   *
   * @param scope The scope of the translation
   */
  static loader(scope: Scopes): any {
    return (http: HttpClient) => new TranslateHttpLoader(http, `./assets/i18n/${scope}/`, '.json');
  }

  //#endregion
}
