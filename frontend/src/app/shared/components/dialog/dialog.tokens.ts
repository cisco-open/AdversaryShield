import { InjectionToken } from '@angular/core';
import { DialogConfig } from './models/interfaces/dialog-config.interface';

export const DIALOG_DATA = new InjectionToken<DialogConfig<unknown>>('DIALOG_DATA');
