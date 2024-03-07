import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState({ isLoading: false })
);
