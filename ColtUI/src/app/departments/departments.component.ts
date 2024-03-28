import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { LayoutComponent } from '../core/layout/layout.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentsComponent implements OnInit {
  constructor(private layoutComponent: LayoutComponent) {}
  ngOnInit(): void {
    this.layoutComponent.cardHeader.update(() => 'Abteilungen');
  }
}
