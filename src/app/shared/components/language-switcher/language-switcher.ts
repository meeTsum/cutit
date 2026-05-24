import { Component, inject, signal, HostListener } from '@angular/core';
import { AlreveleTranslatorService } from '@alrevele/translator';
import { LucideModule } from '../../lucide.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  imports: [LucideModule, CommonModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {

  private translatorService = inject(AlreveleTranslatorService);

  isOpen = signal(false);

  languages = [
    { code: 'EN', label: 'Anglais' },
    { code: 'FR', label: 'Français' },
  ];

  selectedLang = signal(this.languages[0]);

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
