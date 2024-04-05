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
import { Department, UserUpdate } from '../shared';

// PrimeNG imports
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';

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
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private layoutComponent: LayoutComponent,
    private router: Router
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

  onBack(): void {
    this.router.navigate(['/mitglieder']);
  }

  onAttendance(): void {
    this.router.navigate(['/anwesenheiten']);
  }

  onDepartments(): void {
    this.router.navigate(['/abteilungen']);
  }

  toggleEdit(): void {
    this.isEditView()
      ? this.isEditView.update(() => false)
      : this.isEditView.update(() => true);
  }

  onChangeSwitchDepartment(i: number): void {}

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
}
