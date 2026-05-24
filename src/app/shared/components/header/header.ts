import { Component, signal, HostListener } from '@angular/core';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { Footer } from '../footer/footer';
import { Download } from '../download/download';
import { Logo } from '../logo/logo';
import { LucideModule } from '../../lucide.module';
import { AlreveleTranslatorModule } from '@alrevele/translator';

@Component({
  selector: 'app-header',
  imports: [
    LucideModule,
    ThemeToggle,
    LanguageSwitcher,
    Footer,
    Download,
    Logo,
    AlreveleTranslatorModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  protected isOpenMenu = signal(false);
  protected isScrolled = signal(false);


  toggleMenu(){
    this.isOpenMenu.update(value=> !value)
  }

  @HostListener('window:scroll', [])
  onWindowScroll(){
    this.isScrolled.set(window.scrollY> 20)
  }

}
