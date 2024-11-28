import { Provider } from '@angular/core';
import { DrawerService } from './components/drawer';

export function provideSharedServices(): Provider[] {
	return [DrawerService];
}
