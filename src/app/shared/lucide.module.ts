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
  CirclePlus
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
    })
  ],
  exports: [LucideAngularModule]
})
export class LucideModule { }







