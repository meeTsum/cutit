import { Component } from '@angular/core';
import { Header } from "../ui/header/header";
import { Footer } from "../ui/footer/footer";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
