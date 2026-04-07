import { Component, signal} from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular'


export type Type = 'light' | 'dark' ;


@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [LucideDynamicIcon],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle {

  currentTheme = signal<Type>('light');

  setTheme(theme: Type) {

    console.log("theme")

    this.currentTheme.set(theme);

    if (theme === 'dark') {
      console.log("theme dark", theme)
      document.documentElement.classList.add('dark');
    } else {
      console.log("theme light", theme)
      document.documentElement.classList.remove('dark');
    }
  }
}
