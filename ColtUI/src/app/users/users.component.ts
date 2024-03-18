import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { User } from '../shared';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DataViewModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  users: User[] = [];
}
