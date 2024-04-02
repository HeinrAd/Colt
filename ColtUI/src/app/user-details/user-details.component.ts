import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { LayoutComponent } from '../core/layout/layout.component';
import { GlobalStore } from '../core/stores/global.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private layoutComponent: LayoutComponent,
    private router: Router
  ) {}

  readonly store = inject(GlobalStore);

  ngOnInit(): void {
    this.layoutComponent.cardHeader.update(() => 'Details');
  }

  onBack(): void {
    this.router.navigate(['/mitglieder']);
  }
}
