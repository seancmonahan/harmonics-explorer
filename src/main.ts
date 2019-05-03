/*
 * This is the main entry point of the application,
 * and has been configured as such in the Webpack config
 */
declare const IMAGINARY: any;
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

IMAGINARY.i18n.init({
  queryStringVariable: 'lang',
  translationsDirectory: 'tr',
  defaultLanguage: 'de',
  fallbackToDefaultLanguage: false // Current version of i18n is buggy unless this is set to false
}).then(function(){
  return IMAGINARY.i18n.loadLang('de');
}).then(function(){
  return IMAGINARY.i18n.loadLang('en');
}).then(function(){
  platformBrowserDynamic()
    .bootstrapModule(AppModule);
});
