import { Component } from '@angular/core';
import { Hero } from '../../shared/components/ui/hero/hero';
import { Features } from '../../shared/components/ui/features/features';
import { Showcase } from '../../shared/components/ui/showcase/showcase';
import { HowItWorks } from '../../shared/components/ui/how-it-works/how-it-works';
import { Testimonials } from '../../shared/components/ui/testimonials/testimonials';

@Component({
  selector: 'app-landing-page',
  imports: [
    Hero,
    Features,
    Showcase,
    HowItWorks,
    Testimonials
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {

}
