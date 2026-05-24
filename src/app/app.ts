import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlreveleTranslatorModule, AlreveleTranslatorService } from '@alrevele/translator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlreveleTranslatorModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private translatorService = inject(AlreveleTranslatorService);
  
  protected readonly title = signal('cutit');
  protected language = 'fr';
  protected readonly software_key = 'JahMKdcRQETk2VPfB';

  ngOnInit() {
    this.translatorService.currentLanguage.subscribe(lang => {
      if (lang) {
        this.language = lang;
      }
    });
  }

}
