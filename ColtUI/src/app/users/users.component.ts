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
import { ProgressBarModule } from 'primeng/progressbar';
import { AttendanceCreate, AttendanceUpdate, User } from '../shared';

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
    ProgressBarModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  constructor(private layoutComponent: LayoutComponent) {}

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
  }
}
