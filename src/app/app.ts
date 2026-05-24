import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { AlreveleTranslatorModule, AlreveleTranslatorService } from '@alrevele/translator';
import { TranslateService } from '@ngx-translate/core';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlreveleTranslatorModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private translatorService = inject(AlreveleTranslatorService);
  private translateService = inject(TranslateService);
  private router = inject(Router);
  
  protected readonly title = signal('cutit');
  protected language = 'fr';
  protected readonly software_key = 'JahMKdcRQETk2VPfB';

  ngOnInit() {
    // Détecter la langue préférée (localStorage en premier, puis navigateur)
    const savedLang = localStorage.getItem('user-lang');
    const browserLang = (navigator.language || 'fr').split('-')[0].toLowerCase();
    const supportedLanguages = ['fr', 'en', 'es', 'pt', 'ar'];
    const defaultLang = savedLang || (supportedLanguages.includes(browserLang) ? browserLang : 'fr');

    this.translateService.setDefaultLang(defaultLang);
    this.translatorService.changeLanguage(defaultLang);

    this.translatorService.currentLanguage.subscribe(lang => {
      if (lang) {
        this.language = lang;
        // Synchroniser le choix de langue d'Alrevele vers ngx-translate
        this.translateService.use(lang);
        // Sauvegarder localement pour persister au rechargement
        localStorage.setItem('user-lang', lang);
      }
    });

    // Masquer le preloader en douceur dès que la première route est chargée et affichée
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      first()
    ).subscribe(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => preloader.remove(), 500);
      }
    });
  }

}
