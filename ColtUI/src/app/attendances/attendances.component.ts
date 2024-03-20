import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
  constructor(
    private primengConfig: PrimeNGConfig,
    private layoutComponent: LayoutComponent
  ) {}

  attandences!: Attendance[];
  departments!: Department[];
  users!: User[];
  selectedDate = new FormControl<Date | null>(null);
  currentDate!: Date;

  ngOnInit(): void {
    this.layoutComponent.cardHeader = 'Anwesenheiten';

    this.currentDate = new Date();
    this.selectedDate.setValue(this.currentDate);

    this.attandences = [
      // {
      //   user_id: 1,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 1,
      // },
      // {
      //   user_id: 2,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 2,
      // },
      // {
      //   user_id: 3,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 3,
      // },
      // {
      //   user_id: 4,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 4,
      // },
      // {
      //   user_id: 5,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 5,
      // },
      // {
      //   user_id: 6,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 6,
      // },
      // {
      //   user_id: 7,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 7,
      // },
      // {
      //   user_id: 8,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 8,
      // },
      // {
      //   user_id: 9,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 9,
      // },
      // {
      //   user_id: 10,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 10,
      // },
      // {
      //   user_id: 11,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 11,
      // },
      // {
      //   user_id: 12,
      //   date: '13.03.2024',
      //   month: 'März',
      //   department_id: 1,
      //   id: 12,
      // },
    ];

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
