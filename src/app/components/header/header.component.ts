import { Component } from '@angular/core';
import { HeadService } from '../../sevices/head.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
constructor(public headerService: HeadService){}
}
