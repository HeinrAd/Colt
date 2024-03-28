import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../core/layout/layout.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  constructor(private layoutComponent: LayoutComponent) {}

  ngOnInit(): void {}
}
