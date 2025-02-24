import { CommonModule } from '@angular/common';
import { Component, Renderer2} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private readonly renderer: Renderer2){}

  isMenuOpenned: boolean = false;

  openMobile() {
    this.isMenuOpenned ? this.isMenuOpenned = false : this.isMenuOpenned = true;
    this.isMenuOpenned ? this.renderer.addClass(document.body, 'mobile-nav-active'): this.renderer.removeClass(document.body, 'mobile-nav-active');
  }
}
