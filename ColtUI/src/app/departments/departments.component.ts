import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { LayoutComponent } from '../core/layout/layout.component';
import { GlobalStore } from '../core/stores/global.store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Department, DepartmentCreate, DepartmentUpdate } from '../shared';

// PrimeNg imports
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    LayoutComponent,
    CommonModule,
    DividerModule,
    ButtonModule,
    InputSwitchModule,
    InputTextModule,
    KeyFilterModule,
    ReactiveFormsModule,
    DropdownModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentsComponent implements OnInit {
  constructor(
    private layoutComponent: LayoutComponent,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  readonly store = inject(GlobalStore);

  isAddDepartment = signal<boolean>(false);
  isEditDepartment = signal<boolean>(false);

  title = new FormControl<string>('');
  description = new FormControl<string>('');
  price = new FormControl<number | null>(null);

  dropdown = new FormControl<Department | null>(null);

  ngOnInit(): void {
    this.layoutComponent.cardHeader.update(() => 'Abteilungen');
  }

  resetDepartment(): void {
    this.title.setValue('');
    this.description.setValue('');
    this.price.setValue(null);
    this.dropdown.setValue(null);
  }

  onChangeEditDepartment(): void {
    this.title.setValue(this.dropdown.getRawValue()?.title ?? '');
    this.description.setValue(this.dropdown.getRawValue()?.description ?? '');
    this.price.setValue(this.dropdown.getRawValue()?.price ?? null);

    this.store.setDepartment(this.dropdown.getRawValue()!);
  }

  toggleIsAddDepartment(): void {
    this.isAddDepartment()
      ? this.isAddDepartment.update(() => false)
      : this.isAddDepartment.update(() => true);
  }

  toggleIsEditDepartment(): void {
    if (this.isEditDepartment()) {
      this.isEditDepartment.update(() => false);
      this.resetDepartment();
    } else {
      this.isEditDepartment.update(() => true);
    }
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Wollen Sie die Abteilung wirklich löschen?',
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
          detail: 'You have accepted',
          life: 3000,
        });
        this.store.deleteDepartment(this.dropdown.getRawValue()!.id);
        this.toggleIsEditDepartment();
        this.resetDepartment();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  onSaveDepartment(): void {
    if (!this.title || !this.price) {
      return;
    }

    const newDepartment: DepartmentCreate = {
      title: this.title.getRawValue()!,
      description: this.description.getRawValue() ?? ' ',
      price: this.price.getRawValue()!,
    };

    this.store.createNewDepartment(newDepartment);
    this.toggleIsAddDepartment();
  }

  onEditDepartment(): void {
    if (!this.title || !this.price || !this.dropdown.getRawValue()) {
      return;
    }

    const editedDepartment: DepartmentUpdate = {
      title: this.title.getRawValue()!,
      description: this.description.getRawValue() ?? ' ',
      price: this.price.getRawValue()!,
    };

    this.store.changeDepartment(
      this.dropdown.getRawValue()!.id,
      editedDepartment
    );
    this.toggleIsEditDepartment();
  }
}
