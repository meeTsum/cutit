import { Component } from '@angular/core';
import { Download } from "../download/download";

import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  imports: [Download, ScrollRevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

}
