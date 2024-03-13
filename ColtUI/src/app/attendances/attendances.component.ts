import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../core/layout/layout.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Attendance, Department, User } from '../shared';

@Component({
  selector: 'app-attendances',
  standalone: true,
  imports: [TableModule, DropdownModule],
  templateUrl: './attendances.component.html',
  styleUrl: './attendances.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendancesComponent implements OnInit {
  constructor(private layoutComponent: LayoutComponent) {}

  attandences!: Attendance[];
  departments!: Department[];
  users!: User[];

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
