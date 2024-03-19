import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, TopbarComponent, CardModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  cardHeader: string | undefined;
}
