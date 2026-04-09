import { Component, ElementRef, ViewChild } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [LucideDynamicIcon],
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
