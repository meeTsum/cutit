import { Component } from '@angular/core';
import { Download } from "../download/download";
import { LucideModule } from '../../lucide.module';

import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-how-it-works',
  imports: [Download, LucideModule, ScrollRevealDirective],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class HowItWorks {
  steps = [
    {
      title: 'Sélectionnez',
      description: 'Choisissez n\'importe quelle vidéo depuis votre galerie.',
      icon: 'circle-plus'
    },
    {
      title: 'Réglez',
      description: 'Déterminez la durée souhaitée (15s, 30s, 60s...) en un seul clic.',
      icon: 'circle-plus'
    },
    {
      title: 'Découpage Auto',
      description: 'Cutit segmente votre vidéo avec une précision chirurgicale.',
      icon: 'scissors'
    },
    {
      title: 'Sauvegarder',
      description: 'Enregistrez tous les clips ou sélectionnez uniquement vos préférés.',
      icon: 'arrow-down-to-line'
    },
    {
      title: 'Partagez !',
      description: 'Publiez directement sur WhatsApp, TikTok, Instagram ou YouTube.',
      icon: 'globe'
    }
  ];
}
