import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlreveleTranslatorModule, AlreveleTranslatorService } from '@alrevele/translator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlreveleTranslatorModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private translatorService = inject(AlreveleTranslatorService);
  private translateService = inject(TranslateService);
  
  protected readonly title = signal('cutit');
  protected language = 'fr';
  protected readonly software_key = 'JahMKdcRQETk2VPfB';

  ngOnInit() {
    // Définir le français comme langue par défaut pour ngx-translate
    this.translateService.setDefaultLang('fr');

    this.translatorService.currentLanguage.subscribe(lang => {
      if (lang) {
        this.language = lang;
        // Synchroniser le choix de langue d'Alrevele vers ngx-translate
        this.translateService.use(lang);
      }
    });
  }

}
