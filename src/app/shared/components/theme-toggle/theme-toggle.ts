import { Component, signal, Renderer2, inject } from '@angular/core';
import { LucideModule } from '../../lucide.module';

export type Type = 'light' | 'dark' ;


@Component({
  selector: 'app-theme-toggle',
  imports: [LucideModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle {

  private renderer = inject(Renderer2);
  currentTheme = signal<Type>('light');

  toggleTheme(){
    let nextTheme: Type = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme)
  }

  setTheme(theme: Type) {
    this.currentTheme.set(theme);

    if (theme === 'dark') {
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
    }
  }
}
