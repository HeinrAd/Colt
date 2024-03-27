import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  Attendance,
  AttendanceCreate,
  AttendanceUpdate,
  DefaultService,
  Department,
  DepartmentCreate,
  DepartmentUpdate,
  User,
  UserCreate,
  UserUpdate,
} from 'src/app/shared/';

export const GlobalStore = signalStore(
  { providedIn: 'root' },

  withState({
    users: [] as User[],
    user: {} as User,
    attendances: [] as Attendance[],
    userAttendances: [] as Attendance[],
    attendance: {} as Attendance,
    departments: [] as Department[],
    department: {} as Department,
    isLoading: true as boolean,
  }),

  withMethods((store, defaultService = inject(DefaultService)) => ({
    loadUsers(): void {
      defaultService
        .readUsers()
        .subscribe((newUsers) =>
          patchState(store, { users: newUsers, isLoading: false })
        );
    },
    loadAttendances(): void {
      defaultService
        .readAttendences()
        .subscribe((newAttendances) =>
          patchState(store, { attendances: newAttendances, isLoading: false })
        );
    },
    loadDepartments(): void {
      defaultService
        .readDepartments()
        .subscribe((newDepartments) =>
          patchState(store, { departments: newDepartments, isLoading: false })
        );
    },

    getUserById(id: number): void {
      const newUser = store.users().find((user) => user.id === id);
      patchState(store, { user: newUser });
    },
    // getDepartmentById(id: number): void {},

    getAttendancesByUserId(id: number): void {
      defaultService
        .getAttendancesByUserId(id)
        .subscribe((attendances) =>
          patchState(store, { userAttendances: attendances })
        );
    },
    // getAttendanceById(id: number): void {},

    createNewUser(user: UserCreate): void {
      defaultService
        .createUser(user)
        .subscribe((user) =>
          patchState(store, { users: [...store.users(), user] })
        );
    },
    createNewAttendance(attendance: AttendanceCreate): void {
      defaultService.createAttendance(attendance).subscribe((attendance) =>
        patchState(store, {
          attendances: [...store.attendances(), attendance],
        })
      );
    },
    createNewDepartment(department: DepartmentCreate): void {
      defaultService.createDepartment(department).subscribe((department) =>
        patchState(store, {
          departments: [...store.departments(), department],
        })
      );
    },

    changeUser(id: number, user: UserUpdate): void {
      defaultService.updateUser(id, user).subscribe((updatedUser) =>
        patchState(store, {
          user: updatedUser,
          users: store.users().map((user) => {
            if (user.id === id) {
              return { ...user, updatedUser };
            }
            return user;
          }),
        })
      );
    },
    changeAttendance(id: number, attendance: AttendanceUpdate): void {
      defaultService
        .updateAttendance(id, attendance)
        .subscribe((updatedAttendance) =>
          patchState(store, {
            attendance: updatedAttendance,
            attendances: store.attendances().map((attendance) => {
              if (attendance.id === id) {
                return { ...attendance, updatedAttendance };
              }
              return attendance;
            }),
          })
        );
    },
    changeDepartment(id: number, department: DepartmentUpdate): void {
      defaultService
        .updateDepartment(id, department)
        .subscribe((updatedDepartment) =>
          patchState(store, {
            department: updatedDepartment,
            departments: store.departments().map((attendance) => {
              if (attendance.id === id) {
                return { ...attendance, updatedDepartment };
              }
              return attendance;
            }),
          })
        );
    },

    deleteUser(id: number): void {
      defaultService.deleteUser(id).subscribe(
        (deletedResponse) => (
          patchState(store, {
            users: store.users().filter((user) => user.id != id),
          }),
          console.log('Deleted User: ', deletedResponse)
        )
      );
    },
    deleteAttendance(id: number): void {
      defaultService.deleteAttendance(id).subscribe(
        (deletedResponse) => (
          patchState(store, {
            attendances: store
              .attendances()
              .filter((attendance) => attendance.id != id),
          }),
          console.log('Deleted Attendance: ', deletedResponse)
        )
      );
    },

    deleteDepartment(id: number): void {
      defaultService.deleteDepartment(id).subscribe(
        (deletedResponse) => (
          patchState(store, {
            departments: store
              .departments()
              .filter((department) => department.id != id),
          }),
          console.log('Deleted Department: ', deletedResponse)
        )
      );
    },

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
