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
  AttendanceUser,
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
    attendances: [] as AttendanceUser[],
    userAttendances: [] as AttendanceUser[],
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

    getAttendancesByUserId(id: number): void {
      defaultService
        .getAttendancesByUserId(id)
        .subscribe((attendances) =>
          patchState(store, { userAttendances: attendances })
        );
    },

    createNewUser(user: UserCreate): void {
      defaultService
        .createUser(user)
        .subscribe((user) =>
          patchState(store, { users: [...store.users(), user] })
        );
    },
    createNewAttendance(attendance: AttendanceCreate): void {
      defaultService
        .createAttendance(attendance)
        .subscribe(() => this.loadAttendances());
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
            attendances: store
              .attendances()
              .map((attendance) =>
                attendance.id === id
                  ? { ...attendance, ...updatedAttendance }
                  : attendance
              ),
          })
        );
    },

    changeDepartment(id: number, department: DepartmentUpdate): void {
      defaultService
        .updateDepartment(id, department)
        .subscribe((updatedDepartment) =>
          patchState(store, {
            department: updatedDepartment,
            departments: store
              .departments()
              .map((department) =>
                department.id === id
                  ? { ...department, ...updatedDepartment }
                  : department
              ),
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
      defaultService.deleteDepartment(id).subscribe(() =>
        patchState(store, {
          departments: store
            .departments()
            .filter((department) => department.id != id),
        })
      );
    },

    createDepartmentOfUser(userId: number, departmentId: number): void {
      defaultService
        .createUserDepartment(userId, departmentId)
        .subscribe((departmentsResponse) =>
          patchState(store, {
            user: {
              ...store.user(),
              departments: departmentsResponse,
            },
          })
        );
    },

    deleteDepartmentOfUser(userId: number, departmentId: number): void {
      defaultService.deleteUserDepartment(userId, departmentId).subscribe(() =>
        patchState(store, {
          user: {
            ...store.user(),
            departments: store
              .user()
              .departments.filter((dep) => dep.id != departmentId),
          },
        })
      );
    },

    setUser(newUser: User): void {
      patchState(store, { user: newUser });
    },

    updateUser(id: number, user: UserUpdate): void {
      defaultService.updateUser(id, user).subscribe((updatedUser) =>
        patchState(store, {
          user: updatedUser,
        })
      );
    },

    setDepartment(newDepartment: Department): void {
      patchState(store, { department: newDepartment });
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
