import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../core/layout/layout.component';
import { GlobalStore } from '../core/stores/global.store';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Department, User, UserUpdate } from '../shared';

// PrimeNG imports
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    TagModule,
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    KeyFilterModule,
    CalendarModule,
    InputSwitchModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private layoutComponent: LayoutComponent,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  readonly store = inject(GlobalStore);

  isEditView = signal<boolean>(false);

  firstName = new FormControl<string>(this.store.user().first_name);
  lastName = new FormControl<string>(this.store.user().last_name);
  email = new FormControl<string>(this.store.user().email);
  birthday = new FormControl<Date | null>(new Date(this.store.user().birthday));
  street = new FormControl<string>(this.store.user().street);
  houseNumber = new FormControl<number | null>(this.store.user().house_number);
  postcode = new FormControl<number | null>(this.store.user().postcode);
  city = new FormControl<string>(this.store.user().city);
  isActive = new FormControl<boolean>(this.store.user().is_active);
  departments = new FormControl<Department[]>(this.store.user().departments);

  ngOnInit(): void {
    this.layoutComponent.cardHeader.update(() => 'Mitglieder-Details');
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Wollen Sie das Mitglied wirklich löschen?',
      header: '',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Ja',
      rejectLabel: 'Nein',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Mitglied wurde gelöscht!',
          life: 3000,
        });
        this.onDelete(this.store.user());
        this.onBack();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Löschen abgebrochen',
          life: 3000,
        });
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/mitglieder']);
    this.store.loadUsers();
  }

  toggleEdit(): void {
    this.isEditView()
      ? this.isEditView.update(() => false)
      : this.isEditView.update(() => true);
  }

  findDepartment(department: Department): boolean {
    if (this.store.user().departments.find((dep) => dep.id === department.id)) {
      return true;
    }
    return false;
  }

  onSave(): void {
    if (
      !this.store.user() ||
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.birthday ||
      !this.street ||
      !this.houseNumber ||
      !this.postcode ||
      !this.city
    ) {
      return;
    }
    const newUser: UserUpdate = {
      first_name: this.firstName.getRawValue()!,
      last_name: this.lastName.getRawValue()!,
      email: this.email.getRawValue()!,
      birthday: this.birthday.getRawValue()!.toISOString(),
      street: this.street.getRawValue()!,
      house_number: this.houseNumber.getRawValue()!,
      postcode: this.postcode.getRawValue()!,
      city: this.city.getRawValue()!,
    };

    this.store.changeUser(this.store.user().id, newUser);
    this.isEditView.update(() => false);
  }

  onDelete(user: User): void {
    this.store.deleteUser(user.id);
  }

  onSubscribeDepartment(department: Department): void {
    this.store.createDepartmentOfUser(this.store.user().id, department.id);
    this.store.updateUser(this.store.user().id, this.store.user());
  }

  onUnsubscribeDepartment(department: Department): void {
    this.store.deleteDepartmentOfUser(this.store.user().id, department.id);
    this.store.updateUser(this.store.user().id, this.store.user());
  }
}
