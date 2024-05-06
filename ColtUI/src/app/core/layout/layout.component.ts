import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, TopbarComponent, CardModule, ToastModule],
  providers: [MessageService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  constructor(public messageService: MessageService) {}

  cardHeader = signal('');
}
