import { Component, inject, signal, HostListener, OnInit } from '@angular/core';
import { AlreveleTranslatorService } from '@alrevele/translator';
import { LucideModule } from '../../lucide.module';
import { CommonModule } from '@angular/common';
import { LANGUAGES } from '../../utils/languages';

@Component({
  selector: 'app-language-switcher',
  imports: [LucideModule, CommonModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher implements OnInit {

  private translatorService = inject(AlreveleTranslatorService);

  isOpen = signal(false);

  languages = LANGUAGES;

  selectedLang = signal(this.languages[0]);

  ngOnInit() {
    const savedLang = localStorage.getItem('user-lang');
    const browserLang = (navigator.language || 'fr').split('-')[0].toLowerCase();
    const supportedLanguages = ['fr', 'en', 'es', 'pt', 'ar'];
    const defaultLangCode = savedLang || (supportedLanguages.includes(browserLang) ? browserLang : 'fr');

    const initialLang = this.languages.find(l => l.code.toLowerCase() === defaultLangCode) || this.languages[0];
    this.selectedLang.set(initialLang);
  }

  toggleDropdown() {
    this.isOpen.update(v => !v);
  }

  selectLanguage(lang: any) {
    this.selectedLang.set(lang);
    this.translatorService.changeLanguage(lang.code.toLowerCase());
    this.isOpen.set(false);
  }

  // Optionnel: fermer au clic ailleurs
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('app-language-switcher')) {
      this.isOpen.set(false);
    }
  }

}
