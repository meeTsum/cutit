import { Directive, ElementRef, HostListener, Input, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements AfterViewInit {
  @Input() ratio: number = 0.1;

  private initialTop: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    // On mémorise la position initiale de l'élément sur la page
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.initialTop = rect.top + window.pageYOffset;
    this.updatePosition();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.updatePosition();
  }

  private updatePosition() {
    const scrollPosition = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    
    // On calcule à quel point on a scrollé "à travers" l'élément
    // 0 quand l'élément entre en bas de l'écran, 1 quand il sort en haut
    const relativeScroll = (scrollPosition + viewportHeight - this.initialTop) / (viewportHeight + this.el.nativeElement.offsetHeight);
    
    // On applique le mouvement seulement si l'élément est visible (entre 0 et 1)
    if (relativeScroll >= 0 && relativeScroll <= 1) {
      const offset = (relativeScroll - 0.5) * (viewportHeight * this.ratio);
      
      requestAnimationFrame(() => {
        this.renderer.setStyle(
          this.el.nativeElement,
          'transform',
          `translateY(${offset}px)`
        );
      });
    }
  }
}
