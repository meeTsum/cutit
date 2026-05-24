import { Component, signal, Renderer2, inject, OnInit } from '@angular/core';
import { LucideModule } from '../../lucide.module';

export type Type = 'light' | 'dark' ;

@Component({
  selector: 'app-theme-toggle',
  imports: [LucideModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle implements OnInit {

  private renderer = inject(Renderer2);
  currentTheme = signal<Type>('light');

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') as Type;
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.setTheme(isDark ? 'dark' : 'light');
  }

  toggleTheme(){
    let nextTheme: Type = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme)
  }

  setTheme(theme: Type) {
    this.currentTheme.set(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
    }
  }
}
