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
import { AttendanceCreate, Department, User } from '../shared';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GlobalStore } from '../core/stores/global.store';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './attendances.component.html',
  styleUrl: './attendances.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendancesComponent implements OnInit {
  readonly store = inject(GlobalStore);

  constructor(
    private primengConfig: PrimeNGConfig,
    private layoutComponent: LayoutComponent,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  selectedUser = new FormControl<User | null>(null);
  selectedDate = new FormControl<Date | null>(null);
  selectedDepartment = new FormControl<Department | null>(null);
  currentDate!: Date;

  ngOnInit(): void {
    this.layoutComponent.cardHeader.update(() => 'Anwesenheiten');

    this.currentDate = new Date();
    this.selectedDate.setValue(this.currentDate);

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
    var newAttandance: AttendanceCreate = {
      date: this.selectedDate.getRawValue()!.toISOString(),
      user_id: this.selectedUser.getRawValue()!.id,
      department_id: this.selectedDepartment.getRawValue()!.id,
    };
    this.store.createNewAttendance(newAttandance);
    this.layoutComponent.messageService.add({
      severity: 'success',
      summary: 'Erfolg',
      detail: `Eintrag für ${this.selectedUser.getRawValue()?.first_name} ${
        this.selectedUser.getRawValue()?.last_name
      } erstellt`,
    });
    this.selectedUser.setValue(null);
    this.store.loadUsers();
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
      message: `Möchten Sie die Anwesenheit wirklich löschen?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.layoutComponent.messageService.add({
          severity: 'info',
          summary: 'Gelöscht',
          detail: 'Der Eintrag wurde gelöscht',
          life: 3000,
        });
        this.store.deleteAttendance(id);
      },
      reject: () => {
        this.layoutComponent.messageService.add({
          severity: 'error',
          summary: 'Abgebrochen',
          detail: 'Der Vorgang wurde von Ihnen abgebrochen',
          life: 3000,
        });
      },
    });
  }
}
