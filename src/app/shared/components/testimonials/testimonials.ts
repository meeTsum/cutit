import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LucideModule } from '../../lucide.module';
import { Testimonial } from '../../../core/interfaces/testimonials';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TrlFallbackPipe } from '../../pipes/trl-fallback.pipe';

@Component({
  selector: 'app-testimonials',
  imports: [LucideModule, ScrollRevealDirective, TrlFallbackPipe],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit, OnDestroy {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  currentIndex = 0;
  // progress va de 0 à 1 (flottant) pour éviter tout problème d'arrondi
  progress = 0;
  groupSize = 4;

  private direction = 1; // 1 pour avancer, -1 pour reculer
  private autoPlayInterval: any;
  private pauseTimeout: any;
  private isPaused = false;
  private isProgrammaticScroll = false;

  // Tick toutes les 30ms, durée totale du groupe = groupSize × 2s = 8s, pause 3s à 100%
  private readonly TICK_MS = 30;
  private readonly GROUP_DURATION_MS = 8000;
  private readonly PAUSE_AT_100_MS = 3000;

  constructor(private cdr: ChangeDetectorRef) {}

  testimonials: Testimonial[] = [
    { name: 'Inès L.',      role: 'Influenceuse Instagram', content: 'J\'utilise Cutit pour toutes mes Stories et Instagram Reels. Avant, je passais 15 minutes à découper manuellement mes vidéos. Maintenant, c\'est fait en 5 secondes chrono et la qualité reste parfaite ! 🔥', initials: 'IL', rating: 5 },
    { name: 'Maxime R.',    role: 'Community Manager',      content: 'Indispensable pour alimenter nos comptes TikTok et Shorts. L\'interface est ultra-fluide et l\'export groupé nous fait gagner un temps précieux au quotidien.', initials: 'MR', rating: 5 },
    { name: 'Lucas D.',     role: 'Vlogueur & Voyageur',    content: 'Le meilleur outil pour partager mes vlogs de voyage sur mes statuts WhatsApp sans que ce soit coupé n\'importe comment. Simple, gratuit et redoutablement efficace.', initials: 'LD', rating: 5 },
    { name: 'Julie B.',     role: 'Créatrice TikTok',       content: 'Je ne comprenais jamais pourquoi mes clips persoient en qualité sur les autres applis. Avec Cutit, le rendu reste net et limpide. Je recommande à 100% !', initials: 'JB', rating: 5 },
    { name: 'Thomas P.',    role: 'Podcasteur',             content: 'Je filme des épisodes de 2 heures et Cutit me permet d\'en extraire très rapidement des clips courts d\'une minute pour faire du teasing sur les réseaux. Un vrai bonheur.', initials: 'TP', rating: 5 },
    { name: 'Sarah M.',     role: 'Coach Fitness',          content: 'Mes séances d\'entraînement font souvent plus de 10 minutes. Cutit me permet de les segmenter proprement en clips de 30 secondes pour mes abonnés. Gain de temps incroyable.', initials: 'SM', rating: 5 },
    { name: 'Alexandre G.', role: 'Social Media Manager',   content: 'L\'interface de Cutit est d\'une fluidité incroyable. Il n\'y a aucune publicité intrusive, l\'application fait exactement ce qu\'elle promet.', initials: 'AG', rating: 5 },
    { name: 'Sophie K.',    role: 'Formatrice en ligne',    content: 'J\'avais besoin d\'un outil simple pour envoyer des extraits de mes cours à mes élèves via WhatsApp. Cutit a résolu mon problème en deux clics.', initials: 'SK', rating: 5 },
    { name: 'Nicolas H.',   role: 'Vidéaste Indépendant',   content: 'J\'apprécie particulièrement le fait qu\'il n\'y ait aucun filigrane (watermark) forcé sur les clips exportés. Une superbe application respectueuse de ses utilisateurs.', initials: 'NH', rating: 5 },
    { name: 'Chloé V.',     role: 'Entrepreneuse',          content: 'Un gain de productivité énorme pour notre marque de vêtements. Nous publions 5 fois plus de contenu qu\'avant sur nos réseaux sociaux !', initials: 'CV', rating: 5 },
    { name: 'David M.',     role: 'Youtuber Tech',          content: 'Parfait pour recycler mes longues reviews en formats courts pour Shorts. L\'outil est d\'une rapidité bluffante.', initials: 'DM', rating: 5 },
    { name: 'Emma T.',      role: 'Influenceuse Beauté',    content: 'Couper mes tutos maquillage en petits clips n\'a jamais été aussi facile. Cutit a littéralement changé mon flux de travail !', initials: 'ET', rating: 5 },
    { name: 'Julien F.',    role: 'Streamer Twitch',        content: 'J\'extrais les meilleurs moments de mes streams en quelques clics. La qualité d\'export est irréprochable et ça va super vite.', initials: 'JF', rating: 5 },
    { name: 'Clara S.',     role: 'Blogueuse Culinaire',    content: 'Mes recettes vidéos sont découpées proprement pour Instagram et TikTok. Mes abonnés adorent la fluidité des transitions.', initials: 'CS', rating: 5 },
    { name: 'Marc E.',      role: 'Consultant Marketing',   content: 'L\'outil indispensable pour toute équipe de communication. L\'absence de filigrane est un énorme point fort par rapport à la concurrence.', initials: 'ME', rating: 5 },
    { name: 'Léa P.',       role: 'Photographe & Vidéaste', content: 'Une interface minimaliste mais redoutable d\'efficacité. L\'exportation est instantanée, c\'est un vrai plaisir à utiliser.', initials: 'LP', rating: 5 }
  ];

  // ─── Getters ─────────────────────────────────────────────────────────────────

  get totalItems() { return this.testimonials.length; }

  get indicators() { return Array(Math.ceil(this.totalItems / this.groupSize)); }

  get currentIndicator() { return Math.floor(this.currentIndex / this.groupSize); }

  /**
   * Retourne la largeur de la barre en % (0 à 100).
   * Remplissage linéaire continu sur toute la durée du groupe.
   */
  get displayProgress(): number {
    if (this.isPaused) return 100;
    return this.progress * 100;
  }

  // ─── Lifecycle ───────────────────────────────────────────────────────────────

  ngOnInit() { this.startAutoPlay(); }

  ngOnDestroy() { this.stopAutoPlay(); }

  // ─── AutoPlay ────────────────────────────────────────────────────────────────

  startAutoPlay() {
    this.stopAutoPlay();
    this.progress = 0;

    this.autoPlayInterval = setInterval(() => {
      if (this.isPaused) return;

      this.progress += this.TICK_MS / this.GROUP_DURATION_MS; // incrémente de 0 à 1 sur 8s

      if (this.progress >= 1) {
        this.progress = 1; // Force l'affichage à 100%
        this.isPaused = true;
        this.cdr.detectChanges();

        this.pauseTimeout = setTimeout(() => {
          this.isPaused = false;
          this.progress = 0;
          this.advanceGroup();
          this.cdr.detectChanges();
        }, this.PAUSE_AT_100_MS); // 3s de pause à 100%
      }
      this.cdr.detectChanges();
    }, this.TICK_MS);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
    clearTimeout(this.pauseTimeout);
    this.isPaused = false;
  }

  // ─── Navigation ──────────────────────────────────────────────────────────────

  /** Avance d'un groupe entier (4 cartes) avec logique ping-pong */
  advanceGroup() {
    const totalGroups = Math.ceil(this.totalItems / this.groupSize);
    const currentGroup = this.currentIndicator;

    // Détermine le sens de lecture aux extrémités (ping-pong)
    if (this.direction === 1 && currentGroup >= totalGroups - 1) {
      this.direction = -1;
    } else if (this.direction === -1 && currentGroup <= 0) {
      this.direction = 1;
    }

    const nextGroup = currentGroup + this.direction;
    this.currentIndex = nextGroup * this.groupSize;
    this.scrollToGroup(nextGroup);
  }

  scrollToGroup(groupIndex: number) {
    const container = this.scrollContainer?.nativeElement;
    if (!container) return;

    const firstChildIndex = groupIndex * this.groupSize;
    const child = container.children[firstChildIndex] as HTMLElement;
    if (!child) return;

    this.isProgrammaticScroll = true;
    const targetScroll = child.offsetLeft - (container.offsetWidth / 2) + (child.offsetWidth / 2);
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });

    setTimeout(() => {
      this.isProgrammaticScroll = false;
      this.cdr.detectChanges();
    }, 1000); // 1000ms pour garantir la fin du scroll fluide
  }

  onIndicatorClick(indicatorIndex: number) {
    this.currentIndex = indicatorIndex * this.groupSize;
    
    // Aligne la direction selon l'indicateur cliqué
    const totalGroups = Math.ceil(this.totalItems / this.groupSize);
    if (indicatorIndex >= totalGroups - 1) {
      this.direction = -1;
    } else if (indicatorIndex <= 0) {
      this.direction = 1;
    }

    this.scrollToGroup(indicatorIndex);
    this.startAutoPlay();
  }

  onScroll(event: Event) {
    if (this.isPaused || this.isProgrammaticScroll) return;
    
    // Les mises à jour de défilement manuel ne concernent que le tactile/swipe sur Mobile
    if (window.innerWidth >= 768) return;

    const container = event.target as HTMLElement;
    const itemWidth = (container.children[0] as HTMLElement)?.offsetWidth || container.offsetWidth;
    if (!itemWidth) return;

    const newIndex  = Math.round(container.scrollLeft / itemWidth);
    if (newIndex !== this.currentIndex && newIndex >= 0 && newIndex < this.totalItems) {
      this.currentIndex = newIndex;
      this.progress = 0; // Réinitialise la progression pour la carte glissée manuellement
    }
  }
}
