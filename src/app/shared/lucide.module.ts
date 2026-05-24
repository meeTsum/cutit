import { NgModule } from '@angular/core';
import {
  LucideAngularModule,
  SquareCheck,
  CircleAlert,
  Sun,
  PenOff,
  MoonStar,
  Monitor,
  ArrowDownToLine,
  ArrowBigDown,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Scissors,
  CirclePlus,
  ChartNoAxesGantt,
  Globe,
  ChevronDown
} from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      SquareCheck,
      CircleAlert,
      Sun,
      PenOff,
      MoonStar,
      Monitor,
      ArrowDownToLine,
      ArrowBigDown,
      X,
      Star,
      ChevronLeft,
      ChevronRight,
      Scissors,
      CirclePlus,
      ChartNoAxesGantt,
      Globe,
      ChevronDown
    })
  ],
  exports: [LucideAngularModule]
})
export class LucideModule { }







