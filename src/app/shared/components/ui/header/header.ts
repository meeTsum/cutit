import { Component, signal, HostListener } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { ThemeToggle } from '../../ui/theme-toggle/theme-toggle';
import { LanguageSwitcher } from '../../ui/language-switcher/language-switcher';
import { Footer } from '../footer/footer';
import { Download } from '../../ui/download/download';
import { Logo } from '../../ui/logo/logo';

@Component({
  selector: 'app-header',
  imports: [
    LucideDynamicIcon,
    ThemeToggle,
    LanguageSwitcher,
    Footer,
    Download,
    Logo
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  isOpenMenu = signal(false);
  isScrolled = signal(false);


  toggleMenu(){
    this.isOpenMenu.update(value=> !value)
  }

  @HostListener('window:scroll', [])
  onWindowScroll(){
    this.isScrolled.set(window.scrollY> 20)
  }

}
