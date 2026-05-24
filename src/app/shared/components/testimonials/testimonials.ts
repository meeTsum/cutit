import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  groupSize = 3;

  private direction = 1; // 1 pour avancer, -1 pour reculer
  private autoPlayInterval: any;
  private pauseTimeout: any;
  private isPaused = false;

  // 2 secondes par témoignage, tick toutes les 30ms
  private readonly TICK_MS = 30;
  private readonly ITEM_DURATION_MS = 2000;
  private readonly PAUSE_DURATION_MS = 2000;

  testimonials: Testimonial[] = [
    { name: 'Inès L.',      role: 'Influenceuse Instagram', content: 'J\'utilise Cutit pour toutes mes Stories et Instagram Reels. Avant, je passais 15 minutes à découper manuellement mes vidéos. Maintenant, c\'est fait en 5 secondes chrono et la qualité reste parfaite ! 🔥', initials: 'IL', rating: 5 },
    { name: 'Maxime R.',    role: 'Community Manager',      content: 'Indispensable pour alimenter nos comptes TikTok et Shorts. L\'interface est ultra-fluide et l\'export groupé nous fait gagner un temps précieux au quotidien.', initials: 'MR', rating: 5 },
    { name: 'Lucas D.',     role: 'Vlogueur & Voyageur',    content: 'Le meilleur outil pour partager mes vlogs de voyage sur mes statuts WhatsApp sans que ce soit coupé n\'importe comment. Simple, gratuit et redoutablement efficace.', initials: 'LD', rating: 5 },
    { name: 'Julie B.',     role: 'Créatrice TikTok',       content: 'Je ne comprenais jamais pourquoi mes clips perdaient en qualité sur les autres applis. Avec Cutit, le rendu reste net et limpide. Je recommande à 100% !', initials: 'JB', rating: 5 },
    { name: 'Thomas P.',    role: 'Podcasteur',             content: 'Je filme des épisodes de 2 heures et Cutit me permet d\'en extraire très rapidement des clips courts d\'une minute pour faire du teasing sur les réseaux. Un vrai bonheur.', initials: 'TP', rating: 5 },
    { name: 'Sarah M.',     role: 'Coach Fitness',          content: 'Mes séances d\'entraînement font souvent plus de 10 minutes. Cutit me permet de les segmenter proprement en clips de 30 secondes pour mes abonnés. Gain de temps incroyable.', initials: 'SM', rating: 5 },
    { name: 'Alexandre G.', role: 'Social Media Manager',   content: 'L\'interface de Cutit est d\'une fluidité incroyable. Il n\'y a aucune publicité intrusive, l\'application fait exactement ce qu\'elle promet.', initials: 'AG', rating: 5 },
    { name: 'Sophie K.',    role: 'Formatrice en ligne',    content: 'J\'avais besoin d\'un outil simple pour envoyer des extraits de mes cours à mes élèves via WhatsApp. Cutit a résolu mon problème en deux clics.', initials: 'SK', rating: 5 },
    { name: 'Nicolas H.',   role: 'Vidéaste Indépendant',   content: 'J\'apprécie particulièrement le fait qu\'il n\'y ait aucun filigrane (watermark) forcé sur les clips exportés. Une superbe application respectueuse de ses utilisateurs.', initials: 'NH', rating: 5 },
    { name: 'Chloé V.',     role: 'Entrepreneuse',          content: 'Un gain de productivité énorme pour notre marque de vêtements. Nous publions 5 fois plus de contenu qu\'avant sur nos réseaux sociaux !', initials: 'CV', rating: 5 }
  ];

  // ─── Getters ─────────────────────────────────────────────────────────────────

  get totalItems() { return this.testimonials.length; }

  get indicators() { return Array(Math.ceil(this.totalItems / this.groupSize)); }

  get currentIndicator() { return Math.floor(this.currentIndex / this.groupSize); }

  /**
   * Retourne la largeur de la barre en % (0 à 100).
   * Paliers : 1er élément → 0→33%, 2ème → 33→66%, 3ème → 66→100%.
   * Si en pause forcée, on retourne 100 pour que la barre soit visuellement pleine.
   */
  get displayProgress(): number {
    if (this.isPaused) return 100;

    const groupStart = this.currentIndicator * this.groupSize;
    const actualSize = Math.min(this.groupSize, this.totalItems - groupStart);
    const posInGroup = this.currentIndex % this.groupSize;      // 0, 1 ou 2
    const tierSize   = 100 / actualSize;                        // ex: 33.33 ou 50

    // (items déjà completés × taille d'un tier) + (portion du tier actuel)
    return (posInGroup * tierSize) + (this.progress * tierSize);
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

      this.progress += this.TICK_MS / this.ITEM_DURATION_MS; // incrémente entre 0 et 1

      if (this.progress >= 1) {
        this.progress = 0; // Réinitialise la portion de progression
        this.nextSlide();
      }
    }, this.TICK_MS);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
    clearTimeout(this.pauseTimeout);
    this.isPaused = false;
  }

  // ─── Navigation ──────────────────────────────────────────────────────────────

  nextSlide() {
    // Calcule le prochain index selon la direction
    let nextIndex = this.currentIndex + this.direction;

    // Défilement circulaire infini (wrap around) selon le sens de défilement
    if (nextIndex >= this.totalItems) {
      nextIndex = 0; // Retourne au début si on dépasse la fin
    } else if (nextIndex < 0) {
      nextIndex = this.totalItems - 1; // Va à la fin si on dépasse le début
    }

    this.currentIndex = nextIndex;
    this.scrollToIndex(this.currentIndex);
  }

  scrollToIndex(index: number) {
    this.currentIndex = index;
    const container = this.scrollContainer?.nativeElement;
    if (!container) return;
    const child = container.children[index] as HTMLElement;
    if (!child) return;
    const targetScroll = child.offsetLeft - (container.offsetWidth / 2) + (child.offsetWidth / 2);
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }

  onIndicatorClick(indicatorIndex: number) {
    this.currentIndex = indicatorIndex * this.groupSize;
    this.scrollToIndex(this.currentIndex);
    this.startAutoPlay();
  }

  onScroll(event: Event) {
    if (this.isPaused) return;
    const container = event.target as HTMLElement;
    const itemWidth = (container.children[0] as HTMLElement)?.offsetWidth || container.offsetWidth;
    const newIndex  = Math.round(container.scrollLeft / itemWidth);
    if (newIndex !== this.currentIndex) {
      this.currentIndex = newIndex;
    }
  }
}
