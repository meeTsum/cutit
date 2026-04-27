import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature } from '../../../../core/interfaces/features';
import { LucideModule } from '../../../lucide.module';

@Component({
  selector: 'app-features',
  imports: [CommonModule, LucideModule],
  templateUrl: './features.html',
  styleUrl: './features.css',
})
export class Features {
  features: Feature[] = [
    {
      title: 'Découpe automatique',
      decription: 'Cutit découpe automatiquement les vidéos longues en segments d\'une minute, parfaitement adaptés aux réseaux sociaux.',
      icon: 'scissors'
    },
    {
      title: 'Optimisation IA',
      decription: 'Notre intelligence artificielle analyse vos vidéos pour extraire les moments les plus engageants automatiquement.',
      icon: 'star'
    },
    {
      title: 'Multi-format',
      decription: 'Exportez vos créations en un clic vers TikTok, Instagram Reels et YouTube Shorts sans perte de qualité.',
      icon: 'monitor'
    }
  ];
}
