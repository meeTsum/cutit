import { Component } from '@angular/core';
import { Download } from "../download/download";
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TrlFallbackPipe } from '../../pipes/trl-fallback.pipe';

@Component({
  selector: 'app-hero',
  imports: [Download, ScrollRevealDirective, TrlFallbackPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

}
