import { Component, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';

import { PathSVG } from '../../static-func';

@Component({
  selector: 'icon-cmp',
  moduleId: module.id.toString(),
  templateUrl: './icon.component.html',
  encapsulation: ViewEncapsulation.None
})

export class IconComponent implements OnInit, OnChanges {
  @Input() public name: string = '';
  public path: string = '';

  public ngOnInit(): void {
    this.create();
  }

  public ngOnChanges(): void {
    this.create();
  }

  private create(): void {
    this.path = this.name.length ? PathSVG(this.name) : '';
  }
}
