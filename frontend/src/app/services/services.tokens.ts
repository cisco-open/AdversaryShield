import { InjectionToken } from '@angular/core';
import { Client } from './client/client';

export const CLIENT = new InjectionToken<Client>('CLIENT');
