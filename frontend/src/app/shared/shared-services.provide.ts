import { Provider } from '@angular/core';
import { DialogService } from './components/dialog';
import { DrawerService } from './components/drawer';

export function provideSharedServices(): Provider[] {
	return [DrawerService, DialogService];
}
