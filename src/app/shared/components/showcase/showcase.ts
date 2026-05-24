import { Component, ElementRef, ViewChild } from '@angular/core';
import { LucideModule } from '../../lucide.module';

@Component({
  selector: 'app-showcase',
  imports: [LucideModule],
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
