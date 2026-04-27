import { Component } from '@angular/core';
import { Download } from "../download/download";
import { LucideModule } from '../../../lucide.module';

@Component({
  selector: 'app-how-it-works',
  imports: [Download, LucideModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class HowItWorks {
  steps = [
    {
      title: 'Sélectionner une vidéo',
      description: 'Importer depuis votre galerie',
      icon: 'circle-plus'
    },
    {
      title: 'Ajustez la durée',
      description: 'Définissez vos préférence de temps en un clic',
      icon: 'circle-plus'
    },
    {
      title: 'Découpage automatique',
      description: "Cutit s'occupe de découper avec précision vos vidéos",
      icon: 'scissors'
    },
    {
      title: 'Sauvegarder',
      description: 'Choisissez vos segments à enregistrer ou exporter',
      icon: 'circle-plus'
    },
    {
      title: 'Partager',
      description: 'Directement sur vos réseaux Whatsapp, tiktok, Youtube, Insta, FB etc...',
      icon: 'circle-plus'
    }
  ];
}
