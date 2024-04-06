import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { GlobalStore } from '../core/stores/global.store';
import { LayoutComponent } from '../core/layout/layout.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { AttendanceCreate, User } from '../shared';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataViewModule,
    TagModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    DividerModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  constructor(
    private layoutComponent: LayoutComponent,
    private router: Router,
    private messageService: MessageService
  ) {}

  readonly store = inject(GlobalStore);

  visible = signal<boolean>(false);
  progressBow = signal<number>(50);
  selectedDepartment = new FormControl();

  showDialog() {
    this.visible.update(() => true);
  }

  ngOnInit(): void {
    this.layoutComponent.cardHeader.update(() => 'Mitglieder');
  }

  createAttendanceToday(user: User): void {
    let departmentId = user.departments[0].id ?? 0;
    if (departmentId == 0) {
      return;
    }
    if (user.departments.length > 1 && this.selectedDepartment != null) {
      departmentId = this.selectedDepartment.getRawValue().id;
    }

    const newAttendance: AttendanceCreate = {
      date: new Date().toISOString(),
      user_id: user.id,
      department_id: departmentId,
    };
    this.store.createNewAttendance(newAttendance);
    this.messageService.add({
      severity: 'success',
      summary: 'Erfolg',
      detail: `Eintrag für ${user.first_name} ${user.last_name} erstellt`,
    });
  }

  onCreateUser(): void {
    this.router.navigate(['/mitgliederstellung']);
  }

  onDetails(user: User): void {
    this.store.setUser(user);
    this.router.navigate(['/details']);
  }


  checkAttendances(user: User): boolean {
    // Get all dates from attendances that are in department "Feuerwaffe"
    const dates = user.attendances
      .filter((att) => att.department.title === 'Feuerwaffen')
      .map((att) => new Date(att.date));

    // Sort the dates in ascending order
    dates.sort((a, b) => a.getTime() - b.getTime());
    
    // Check if there are 18 dates within any 12-month period
    if (dates.length >= 18) {
      const startDate = new Date(dates[0]);
      const endDate = new Date(dates[dates.length - 1]);

      let count = 0;
      for (const date of dates) {
        if (date >= startDate && date <= endDate) {
          count++;
        }
      }
      if (count >= 18) {
        return true;
      } 
    }

    // Check if there is a date in one month for 12 consecutive months
    const consecutiveMonths = new Map<number, Set<number>>(); // Map<year, Set<month>>
    for (const date of dates) {
      const year = date.getFullYear();
      const month = date.getMonth();

      if (!consecutiveMonths.has(year)) {
        consecutiveMonths.set(year, new Set<number>());
      }
      consecutiveMonths.get(year)!.add(month);
    
    }
    let currentYear = new Date().getFullYear();
    if (consecutiveMonths.size === 0) {
      return false
    }
    else if (consecutiveMonths.size < 2) {
      return consecutiveMonths.get(currentYear)!.size >= 12;
    } else {
      return consecutiveMonths.get(currentYear)!.size + consecutiveMonths.get(currentYear -1)!.size >= 12;
    }
  
    // If both conditions fail, return false
    return false;
  }

  hasBirthdayToday(user: User): boolean {
    const birthday = new Date(user.birthday);
    const today = new Date();
    return (
      birthday.getMonth() === today.getMonth() &&
      birthday.getDate() === today.getDate()
    );
  }
}
