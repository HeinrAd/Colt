import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { LayoutComponent } from '../core/layout/layout.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Attendance, Department, User } from '../shared';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GlobalStore } from '../core/stores/global.store';

@Component({
  selector: 'app-attendances',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './attendances.component.html',
  styleUrl: './attendances.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendancesComponent implements OnInit {
  readonly store = inject(GlobalStore);

  constructor(
    private primengConfig: PrimeNGConfig,
    private layoutComponent: LayoutComponent
  ) {
    this.attandences = this.store.attendances();
    this.departments = this.store.departments();
    this.users = this.store.users();
  }

  attandences!: Attendance[];
  departments!: Department[];
  users!: User[];
  userNames!: string[];
  selectedDate = new FormControl<Date | null>(null);
  currentDate!: Date;

  ngOnInit(): void {
    this.layoutComponent.cardHeader = 'Anwesenheiten';

    this.currentDate = new Date();
    this.selectedDate.setValue(this.currentDate);

    this.users.forEach((user) =>
      this.userNames.push(user.first_name + user.last_name)
    );
    console.log(this.users);

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

  saveAttendance(): void {
    console.log(this.selectedDate.getRawValue());
  }
}
