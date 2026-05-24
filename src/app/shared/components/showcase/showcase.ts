import { Component, ElementRef, ViewChild } from '@angular/core';
import { LucideModule } from '../../lucide.module';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TrlFallbackPipe } from '../../pipes/trl-fallback.pipe';

@Component({
  selector: 'app-showcase',
  imports: [LucideModule, ScrollRevealDirective, TrlFallbackPipe],
  templateUrl: './showcase.html',
  styleUrl: './showcase.css',
})
export class Showcase {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
