import { Directive, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';

import Cropper from 'cropperjs';

@Directive({
  selector: '[ngx-cropper]'
})

export class NgxCropperJsDirective implements OnInit {

  @Input('ngx-cropper') public options: any = {};
  @Output() public cropEvent: EventEmitter<any> = new EventEmitter<any>();
  private cropper;

  constructor(private element: ElementRef) {
  }

  public ngOnInit(): void {
    let outer = this;
    let crop = () => {
      let cropper = outer.cropper;
      let cropperOptions = cropper.options;
      let onlySize: boolean = cropperOptions.pixelSize === 'only';
      outer.cropEvent.emit({
        preview: cropper.getCroppedCanvas({
          width: 225,
          height: 225
        }).toDataURL(),
        result: cropper.getCroppedCanvas(Object.assign(
          (onlySize ? {
            width: cropperOptions.width,
            height: cropperOptions.height
          } : {
            maxWidth: cropperOptions.width,
            maxHeight: cropperOptions.height
          }), {
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
          })).toDataURL(cropperOptions.type, 1)
      });
    };
    setTimeout(() => this.cropper = new Cropper(this.element.nativeElement, Object.assign({crop}, this.options)));
  }
}
