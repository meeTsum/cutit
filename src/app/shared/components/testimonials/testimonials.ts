import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LucideModule } from '../../lucide.module';
import { Testimonial } from '../../../core/interfaces/testimonials';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TrlFallbackPipe } from '../../pipes/trl-fallback.pipe';
import { TESTIMONIALS } from '../../utils/testimonials';

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

  testimonials: Testimonial[] = TESTIMONIALS;

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
