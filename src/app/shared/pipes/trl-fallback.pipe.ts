import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlreveleTranslatorService } from '@alrevele/translator';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'trl',
  pure: false // Conserve sa réactivité lors des changements de langue
})
export class TrlFallbackPipe implements PipeTransform, OnDestroy {
  private alreveleService = inject(AlreveleTranslatorService);
  private translateService = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);

  private languageSubscription?: Subscription;

  constructor() {
    // S'abonner aux changements de langue d'Alrevele et synchroniser avec ngx-translate
    this.languageSubscription = this.alreveleService.currentLanguage.subscribe(
      (language) => {
        if (language) {
          this.translateService.use(language); // Synchronisation !
          this.cdr.markForCheck();
        }
      }
    );
  }

  transform(key: string): string {
    if (!key) return '';

    try {
      // 1. Essayer d'abord Alrevele en ligne (sessionStorage)
      const translationsJson = sessionStorage.getItem('alrevele-traduction');
      if (translationsJson) {
        const translations = JSON.parse(translationsJson);
        const found = translations.find(
          (item: { key: string; translation: string }) => item.key === key
        );

        if (found && found.translation) {
          return found.translation; // Retourne la traduction en ligne d'Alrevele
        }
      }

      // 2. Si absent ou indisponible, Fallback sur ngx-translate (fichiers JSON locaux)
      const translationNgx = this.translateService.instant(key);
      
      // Si ngx-translate a trouvé une traduction valide (différente de la clé elle-même)
      if (translationNgx && translationNgx !== key) {
        return translationNgx;
      }

      // 3. Fallback final : renvoyer la clé originale (Français)
      return key;
    } catch (error) {
      console.error('Erreur dans TrlFallbackPipe :', error);
      return key;
    }
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
