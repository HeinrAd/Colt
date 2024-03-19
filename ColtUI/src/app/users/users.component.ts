import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { GlobalStore } from '../core/stores/global.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, DataViewModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  store = inject(GlobalStore);
}
