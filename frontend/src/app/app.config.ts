import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideBEServices } from './services/be-services.provide';
import { provideInterceptors } from './services/interceptors.provide';
import { provideMaterialCustomServices } from './shared/material-custom-services.provide';
import { provideSharedServices } from './shared/shared-services.provide';

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withInterceptorsFromDi()),
		provideBEServices(),
		provideInterceptors(),
		provideSharedServices(),
		provideMaterialCustomServices(),
		provideRouter(routes),
		provideAnimationsAsync()
	]
};
