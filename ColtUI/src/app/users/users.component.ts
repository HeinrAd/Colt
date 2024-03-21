import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { GlobalStore } from '../core/stores/global.store';
import { LayoutComponent } from '../core/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataViewModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  constructor(private layoutComponent: LayoutComponent) {}

  readonly store = inject(GlobalStore);

  ngOnInit(): void {
    this.layoutComponent.cardHeader = 'Mitglieder';
  }
}
