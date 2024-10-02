/**
 * @file main.ts
 * @description This is the main entry point for the Angular application. It bootstraps the AppModule and handles any startup errors.
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

/**
 * @function bootstrapModule
 * @description Bootstraps the Angular AppModule. The `ngZoneEventCoalescing` option is used to improve performance by coalescing events.
 * @param {AppModule} AppModule - The root Angular module to bootstrap.
 */

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err)); // Handle any errors during app initialization.
