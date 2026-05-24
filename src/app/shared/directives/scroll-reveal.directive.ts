import { Directive, ElementRef, OnInit, Renderer2, Input, inject } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() revealDelay: number = 0;

  ngOnInit() {
    // Configuration initiale avec les classes de transition de Tailwind CSS
    this.renderer.addClass(this.el.nativeElement, 'transition-all');
    this.renderer.addClass(this.el.nativeElement, 'duration-700');
    this.renderer.addClass(this.el.nativeElement, 'ease-out');
    this.renderer.addClass(this.el.nativeElement, 'transform');
    this.renderer.addClass(this.el.nativeElement, 'opacity-0');
    this.renderer.addClass(this.el.nativeElement, 'translate-y-8');
    this.renderer.addClass(this.el.nativeElement, 'scale-95');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.renderer.removeClass(this.el.nativeElement, 'opacity-0');
            this.renderer.removeClass(this.el.nativeElement, 'translate-y-8');
            this.renderer.removeClass(this.el.nativeElement, 'scale-95');

            this.renderer.addClass(this.el.nativeElement, 'opacity-100');
            this.renderer.addClass(this.el.nativeElement, 'translate-y-0');
            this.renderer.addClass(this.el.nativeElement, 'scale-100');
          }, this.revealDelay);
        } else {
          // Remettre l'élément dans son état initial masqué lorsqu'il sort de l'écran
          // afin que l'animation se rejoue lors du prochain défilement !
          this.renderer.removeClass(this.el.nativeElement, 'opacity-100');
          this.renderer.removeClass(this.el.nativeElement, 'translate-y-0');
          this.renderer.removeClass(this.el.nativeElement, 'scale-100');

          this.renderer.addClass(this.el.nativeElement, 'opacity-0');
          this.renderer.addClass(this.el.nativeElement, 'translate-y-8');
          this.renderer.addClass(this.el.nativeElement, 'scale-95');
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.el.nativeElement);
  }
}
