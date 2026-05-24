import { Component } from '@angular/core';
import { Logo } from '../logo/logo';
import { TrlFallbackPipe } from '../../pipes/trl-fallback.pipe';


@Component({
  selector: 'app-footer',
  imports: [Logo, TrlFallbackPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

}
