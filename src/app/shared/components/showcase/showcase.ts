import { Component, ElementRef, ViewChild } from '@angular/core';
import { LucideModule } from '../../lucide.module';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { AlreveleTranslatorModule } from '@alrevele/translator';

@Component({
  selector: 'app-showcase',
  imports: [LucideModule, ScrollRevealDirective, AlreveleTranslatorModule],
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
