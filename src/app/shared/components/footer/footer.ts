import { Component } from '@angular/core';
import { Logo } from '../logo/logo';
import { AlreveleTranslatorModule } from '@alrevele/translator';


@Component({
  selector: 'app-footer',
  imports: [Logo, AlreveleTranslatorModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

}
