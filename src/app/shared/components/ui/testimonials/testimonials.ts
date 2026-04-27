import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LucideModule } from '../../../lucide.module';
import { Testimonial } from '../../../../core/interfaces/testimonials';

@Component({
  selector: 'app-testimonials',
  imports: [LucideModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit, OnDestroy {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  currentIndex = 0;
  // progress va de 0 à 1 (flottant) pour éviter tout problème d'arrondi
  progress = 0;
  groupSize = 3;

  private autoPlayInterval: any;
  private pauseTimeout: any;
  private isPaused = false;

  // 2 secondes par témoignage, tick toutes les 30ms
  private readonly TICK_MS = 30;
  private readonly ITEM_DURATION_MS = 2000;
  private readonly PAUSE_DURATION_MS = 2000;

  testimonials: Testimonial[] = [
    { name: 'Sarah L.',    role: 'Community Manager',    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.', initials: 'SL', rating: 5 },
    { name: 'Thomas D.',   role: 'Chef de projet',        content: 'Une interface fluide et intuitive. Exactement ce dont nous avions besoin pour notre flux de travail quotidien.',              initials: 'TD', rating: 4 },
    { name: 'Marc A.',     role: 'Freelance Design',      content: 'Le carrousel est incroyablement fluide. La réactivité sur mobile est un vrai plus par rapport aux autres solutions.',         initials: 'MA', rating: 5 },
    { name: 'Julie R.',    role: 'Marketing Lead',        content: 'Excellent support et fonctionnalités au top. Je recommande vivement pour toutes les équipes créatives.',                      initials: 'JR', rating: 5 },
    { name: 'Sophie G.',   role: 'Product Owner',         content: 'Un gain de temps incroyable. L\'intégration est simple et le résultat est très professionnel.',                              initials: 'SG', rating: 4 },
    { name: 'Kevin B.',    role: 'Développeur Fullstack', content: 'La stack technique est propre et les performances sont au rendez-vous. Très satisfait !',                                     initials: 'KB', rating: 5 },
    { name: 'Claire M.',   role: 'UI/UX Designer',        content: 'Le souci du détail est impressionnant. Un produit fini et poli qui fait la différence.',                                      initials: 'CM', rating: 5 },
    { name: 'Antoine P.',  role: 'Content Creator',       content: 'L\'outil qui a transformé ma production. Simple, efficace et visuellement impeccable.',                                       initials: 'AP', rating: 5 },
    { name: 'Léa V.',      role: 'Social Media Expert',   content: 'La gestion des témoignages est super intuitive. Mes clients adorent le rendu final sur le site.',                            initials: 'LV', rating: 4 },
    { name: 'Nicolas W.',  role: 'Tech Lead',             content: 'Code de qualité et architecture robuste. C\'est un plaisir d\'intégrer ce genre de composants.',                             initials: 'NW', rating: 5 },
    { name: 'Emma B.',     role: 'Digital Nomad',         content: 'Parfait pour travailler de n\'importe où. L\'interface légère ne consomme rien et reste rapide.',                            initials: 'EB', rating: 5 },
    { name: 'David K.',    role: 'Agency Founder',        content: 'Nous utilisons cette solution pour tous nos clients. Le gain de productivité est réel.',                                      initials: 'DK', rating: 4 },
    { name: 'Chloé S.',    role: 'Brand Manager',         content: 'Le design respecte parfaitement notre charte graphique. Très flexible et personnalisable.',                                   initials: 'CS', rating: 5 },
    { name: 'Hugo R.',     role: 'Video Editor',          content: 'Rapide, précis et très stable. Je ne peux plus m\'en passer pour mes projets.',                                               initials: 'HR', rating: 5 },
    { name: 'Mathilde F.', role: 'E-commerce Manager',    content: 'Nos conversions ont augmenté depuis que nous affichons ces témoignages. Un must-have !',                                      initials: 'MF', rating: 5 },
    { name: 'Romain L.',   role: 'Startup Founder',       content: 'La meilleure décision que nous ayons prise cette année pour notre landing page.',                                             initials: 'RL', rating: 5 },
    { name: 'Alice D.',    role: 'Journaliste',           content: 'Une expérience utilisateur sans faute. Tout est pensé pour la simplicité.',                                                   initials: 'AD', rating: 4 },
    { name: 'Paul H.',     role: 'Consultant',            content: 'Efficacité redoutable. Le carrousel automatique attire l\'œil sans être intrusif.',                                           initials: 'PH', rating: 5 },
    { name: 'Inès T.',     role: 'Photographe',           content: 'Très beau rendu visuel. Les animations sont fluides et professionnelles.',                                                    initials: 'IT', rating: 5 },
    { name: 'Lucas B.',    role: 'Data Scientist',        content: 'L\'analyse des retours utilisateurs montre une satisfaction globale en nette hausse.',                                        initials: 'LB', rating: 4 },
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

      this.progress += this.TICK_MS / this.ITEM_DURATION_MS;  // incrémente entre 0 et 1

      if (this.progress >= 1) {
        this.progress = 1;  // on cap à 1 pour éviter tout dépassement

        const groupStart    = this.currentIndicator * this.groupSize;
        const actualSize    = Math.min(this.groupSize, this.totalItems - groupStart);
        const posInGroup    = this.currentIndex % this.groupSize;
        const isLastInGroup = posInGroup === actualSize - 1;

        if (isLastInGroup) {
          // Fin du groupe : pause de 2s avec barre à 100%, puis on bascule
          this.isPaused = true;
          this.pauseTimeout = setTimeout(() => {
            this.isPaused = false;
            this.progress = 0;
            this.nextSlide();
          }, this.PAUSE_DURATION_MS);
        } else {
          // Slide suivant dans le même groupe
          this.progress = 0;
          this.nextSlide();
        }
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
    this.currentIndex = (this.currentIndex + 1) % this.totalItems;
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
