import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/layout.component';
import { GlobalStore } from 'src/app/core/stores/global.store';
import { UserCreate } from '../shared';

// PrimeNg Imports
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    KeyFilterModule,
    ButtonModule,
    CalendarModule,
    ToastModule,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private layoutComponent: LayoutComponent,
    private router: Router
  ) {}

  readonly store = inject(GlobalStore);

  firstName = new FormControl<string>('');
  lastName = new FormControl<string>('');
  email = new FormControl<string>('');
  birthday = new FormControl<Date | null>(null);
  street = new FormControl<string>('');
  houseNumber = new FormControl<number | null>(null);
  postcode = new FormControl<number | null>(null);
  city = new FormControl<string>('');

  ngOnInit(): void {
    this.layoutComponent.cardHeader.update(() => 'Neues Mitglied anlegen');

    this.primengConfig.setTranslation({
      firstDayOfWeek: 1,
      dayNames: [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
      ],
      dayNamesShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
      dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      monthNames: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mär',
        'Apr',
        'Mai',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Dez',
      ],
      today: 'Heute',
      clear: 'Leeren',
      dateFormat: 'dd.mm.yy',
      weekHeader: 'Wo',
    });
  }

  onAbort(): void {
    this.router.navigate(['/mitglieder']);
  }

  onSave(): void {
    if (
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

    this.birthday
      .getRawValue()!
      .setHours(this.birthday.getRawValue()!.getHours() + 12);

    const newUser: UserCreate = {
      first_name: this.firstName.getRawValue()!,
      last_name: this.lastName.getRawValue()!,
      email: this.email.getRawValue()!,
      birthday: this.birthday.getRawValue()!.toISOString(),
      street: this.street.getRawValue()!,
      house_number: this.houseNumber.getRawValue()!,
      postcode: this.postcode.getRawValue()!,
      city: this.city.getRawValue()!,
    };

    this.store.createNewUser(newUser);

    this.layoutComponent.messageService.add({
      severity: 'success',
      summary: 'Erfolg',
      detail: `Neues Mitglied ${newUser.first_name} ${newUser.last_name} angelegt`,
    });

    this.firstName.setValue('');
    this.lastName.setValue('');
    this.email.setValue('');
    this.birthday.setValue(null);
    this.street.setValue('');
    this.houseNumber.setValue(null);
    this.postcode.setValue(null);
    this.city.setValue('');

    this.router.navigate(['/mitglieder']);
  }
}
