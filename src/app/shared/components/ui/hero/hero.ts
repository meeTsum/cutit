import { Component } from '@angular/core';
import { Download } from "../download/download";

@Component({
  selector: 'app-hero',
  imports: [Download],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

}
