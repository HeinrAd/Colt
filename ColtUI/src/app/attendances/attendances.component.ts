import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-attendances',
  standalone: true,
  imports: [],
  templateUrl: './attendances.component.html',
  styleUrl: './attendances.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendancesComponent {}
