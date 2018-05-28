import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  moduleId: module.id.toString(),
  selector: 'image-crop-modal-cmp',
  templateUrl: './image-crop.modal.component.html'
})

export class ImageCropModalComponent implements OnInit {
  public image: any;
  public text: any = null;
  public file: File = null;

  public loading: boolean = false;
  public result: any = null;
  public cropped: any = {};
  public options: any = {};

  constructor(public bsModalRef: BsModalRef,
              private bsModalService: BsModalService) {
  }

  public ngOnInit(): void {
    let newImage = new Image();
    let reader = new FileReader();
    this.loading = true;
    reader.readAsDataURL(this.file);
    reader.onloadend = () => {
      newImage.src = reader.result;
      newImage.onload = () => {
        let aspectRatio: number = this.image.pixel === 'only' ? (this.image.pixels[0] / this.image.pixels[1]) : (16 / 9);
        this.loading = false;
        this.result = reader.result;
        this.options = {
          viewMode: 1,
          aspectRatio,
          responsive: true,
          type: this.file.type,
          width: this.image.pixels[0],
          height: this.image.pixels[1],
          pixelSize: this.image.pixel
        };
      };
    };
  }

  public cropEvent(event: any): void {
    this.cropped = event;
  }

  public closeAndSave(status): void {
    this.bsModalService.setDismissReason(status);
    this.bsModalRef.hide();
  }
}
