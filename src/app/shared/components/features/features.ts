import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature } from '../../../core/interfaces/features';
import { LucideModule } from '../../lucide.module';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TrlFallbackPipe } from '../../pipes/trl-fallback.pipe';


@Component({
  selector: 'app-features',
  imports: [CommonModule, LucideModule, ScrollRevealDirective, TrlFallbackPipe],
  templateUrl: './features.html',
  styleUrl: './features.css',
})
export class Features {
  features: Feature[] = [
    {
      title: 'Découpe en 1 Clic',
      description: 'Importez votre vidéo, sélectionnez la durée idéale (15s, 30s, 60s...) et laissez Cutit faire le travail. Vos clips sont découpés avec une précision chirurgicale.',
      icon: 'scissors'
    },
    {
      title: 'Zéro Perte de Qualité',
      description: 'Pas de compression agressive. Vos vidéos conservent 100% de leur netteté d\'origine (Full HD & 4K) pour un rendu éclatant sur tous vos réseaux.',
      icon: 'star'
    },
    {
      title: 'Partage en un Clin d\'œil',
      description: 'Envoyez vos meilleurs extraits de vidéo à vos proches ou sur vos réseaux préférés. Une découpe propre et un export instantané pour vos statuts et stories.',
      icon: 'monitor'
    }
  ];
}
