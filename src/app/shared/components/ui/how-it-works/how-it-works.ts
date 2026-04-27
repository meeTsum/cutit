import { Component } from '@angular/core';
import { Download } from "../download/download";
import { LucideModule } from '../../../lucide.module';

@Component({
  selector: 'app-how-it-works',
  imports: [Download, LucideModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class HowItWorks {

}
