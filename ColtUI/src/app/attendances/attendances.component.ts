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
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-attendances',
  standalone: true,
  imports: [
    TableModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './attendances.component.html',
  styleUrl: './attendances.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendancesComponent implements OnInit {
  constructor(private layoutComponent: LayoutComponent) {}

  attandences!: Attendance[];
  departments!: Department[];
  users!: User[];
  selectedDate = signal<Date | null>(null);

  ngOnInit(): void {
    this.layoutComponent.cardHeader = 'Anwesenheiten';

    this.attandences = [
      {
        user_id: 1,
        date: '13.03.2024',
        month: 'März',
        department_id: 1,
        id: 1,
      },
    ];
  }
}
