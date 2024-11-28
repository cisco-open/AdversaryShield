import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideMaterialCustomServices } from './shared/material-custom-services.provide';
import { provideSharedServices } from './shared/shared-services.provide';

export const appConfig: ApplicationConfig = {
	providers: [provideSharedServices(), provideMaterialCustomServices(), provideRouter(routes), provideAnimationsAsync()]
};
