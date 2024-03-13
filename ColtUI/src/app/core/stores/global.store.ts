import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { DefaultService } from 'src/app/shared';

export const GlobalStore = signalStore(
  { providedIn: 'root' },

  withState({
    users: [],
    user: {},
    attendances: [],
    attendance: {},
    departments: [],
    department: {},
    isLoading: true,
  }),

  withComputed((store) => ({})),

  withMethods((store, defaultSercice = inject(DefaultService)) => ({
    loadUsers(): void {},
    loadAttendances(): void {},
    loadDepartments(): void {},

    getUserById(id: number): void {},
    getDepartmentById(id: number): void {},
    getAttendancesByUserId(id: number): void {},
    getAttendanceById(id: number): void {},

    createNewUser(user: any): void {},
    createNewAttendance(attendance: any): void {},
    createNewDepartment(department: any): void {},

    changeUser(user: any): void {},
    changeAttendance(attendance: any): void {},
    changeDepartment(department: any): void {},

    checkIfCertified(user: any): boolean {
      return false;
    },
  })),

  withHooks({
    onInit(store) {
      store.loadUsers();
      store.loadAttendances();
      store.loadDepartments();
    },
  })
);
