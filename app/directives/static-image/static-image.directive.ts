import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PathAssets } from '../../static-func';

@Directive({selector: '[image][static]'})

export class StaticImageDirective implements OnChanges {
  @Input() public image: string;
  @Input() public static: string;

  constructor(private el: ElementRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.create();
  }

  private create(): void {
    this.el.nativeElement.src = this.static ? PathAssets(this.image || 'img/none-photo.jpg') : this.image;
  }
}
