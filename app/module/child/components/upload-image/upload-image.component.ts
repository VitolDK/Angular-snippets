import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';

import { UtilsService } from '../../service';
import { ImageCropModalComponent } from '../../modals';
import { CollapseAnimation, OpacityAnimation } from '../../../../animation';

const defaultParams = {
  size: 1.5e+6,
  types: ['image/png', 'image/jpeg', 'image/gif'],
  pixel: 'off',
  pixels: 1024
};
const component: string = 'UPLOAD_IMAGE';
const errorMessageType: string = `${component}.NOT_ACCEPT_TYPE`;
const errorMessageSize: string = `${component}.LARGE_SIZE`;
const errorMessagePixelsOnly: string = `${component}.ONLY_PIXELS`;
const errorMessagePixelsMax: string = `${component}.MAX_PIXELS`;

@Component({
  selector: 'upload-image-cmp',
  moduleId: module.id.toString(),
  styleUrls: ['./upload-image.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './upload-image.component.html',
  animations: [CollapseAnimation, OpacityAnimation]
})

export class UploadImageComponent implements OnInit, OnChanges {
  @Input() public imageTitle: string = '';
  @Input() public imageSubTitle: string = '';

  @Output() public save: EventEmitter<File> = new EventEmitter<File>();
  @Output() public remove: EventEmitter<null> = new EventEmitter<null>();

  public image = {
    results: null,
    property: '',
    size: defaultParams.size,
    types: defaultParams.types,
    pixel: defaultParams.pixel,
    pixels: [defaultParams.pixels, defaultParams.pixels]
  };

  public status = {
    invalid: false,
    message: null
  };

  public contentIsAddClassFlash: boolean = false;

  @Input() private imageUrl: string | any;
  @Input() private imageSize: number;
  @Input() private imageTypes: string[];
  @Input() private imagePixel: 'off' | 'only' | 'max';
  @Input() private imagePixels: [number, number];
  @Input() private imageProperty: string;

  constructor(private utils: UtilsService,
              private bsModalService: BsModalService) {
  }

  public ngOnInit(): void {
    if (this.imageSize) {
      this.image.size = this.imageSize;
    }
    if (this.imageTypes) {
      this.image.types = this.imageTypes;
    }
    if (this.imagePixel) {
      this.image.pixel = this.imagePixel;
    }
    if (this.imagePixels) {
      this.image.pixels = this.imagePixels;
    }
    if (this.imageProperty) {
      this.image.property = this.imageProperty;
    }
    if (this.imageUrl) {
      this.image.results = this.imageUrl;
    }
  }

  public ngOnChanges(): void {
    if (this.imageUrl) {
      if (typeof this.imageUrl === 'object') {
        let image = new Image();
        let reader = new FileReader();
        reader.readAsDataURL(this.imageUrl);
        reader.onloadend = () => {
          image.src = reader.result;
          image.onload = () => this.image.results = reader.result;
        };
      } else {
        this.image.results = this.imageUrl;
      }
    }
  }

  public onChanges(event: any): void {
    this.flashField(false);
    this.bsModalService.show(ImageCropModalComponent, {
      class: 'work-time__modal',
      ignoreBackdropClick: true,
      initialState: {
        image: this.image,
        file: event.target.files[0],
        text: {
          header: this.imageTitle,
          confirm: this.utils.translate('COMMON.SAVE'),
          cancel: this.utils.translate('COMMON.CANCEL')
        }
      }
    });
    let modal = this.bsModalService.onHidden.subscribe((image: any) => {
      if (image) {
        this.setStatus(false, null);
        this.image.results = image;
        this.save.emit(image);
      }
      setTimeout(() => event.target.value = null);
      modal.unsubscribe();
    });
  }

  public flashField(status: boolean): void {
    this.contentIsAddClassFlash = status;
  }

  public removeImage(): void {
    this.image.results = '';
    this.remove.emit(null);
  }

  private render(data: any): void {
    let invalid: boolean = false;
    if (!data.type.match(this.image.types.join('|'))) {
      invalid = true;
      this.setStatus(invalid, [errorMessageType]);
    }
    if (data.size > this.image.size) {
      invalid = true;
      this.setStatus(invalid, [errorMessageSize]);
    }
    let newImage = new Image();
    let reader = new FileReader();
    let finishFn = () => {
      this.setStatus(false, null);
      this.image.results = reader.result;
      this.save.emit(data);
    };
    if (!invalid) {
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        newImage.src = reader.result;
        newImage.onload = () => {
          let onlyWidth = this.image.pixels[0];
          let onlyHeight = this.image.pixels[1];
          if (this.image.pixel === 'off') {
            finishFn();
          }
          if (this.image.pixel === 'only') {
            if (onlyWidth === newImage.naturalWidth && onlyHeight === newImage.naturalHeight) {
              finishFn();
            } else {
              this.setStatus(true, [errorMessagePixelsOnly, {pixels: this.image.pixels.join('x') + 'px'}]);
            }
          }
          if (this.image.pixel === 'max') {
            if (onlyWidth >= newImage.naturalWidth && onlyHeight >= newImage.naturalHeight) {
              finishFn();
            } else {
              this.setStatus(true, [errorMessagePixelsMax, {pixels: this.image.pixels.join('x') + 'px'}]);
            }
          }
        };
      };
    }
  }

  private setStatus(invalid: boolean, message: any[]): void {
    this.status = {invalid, message};
    if (invalid) {
      this.utils.addNotify({
        icon: 'error',
        type: 'danger',
        timeout: 3 * 1000,
        dismissible: true,
        text: `<h2>${this.utils.translate(message[0], message[1])}</h2>`
      });
    }
  }
}
