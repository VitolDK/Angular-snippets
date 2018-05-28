import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  moduleId: module.id.toString(),
  selector: 'bool-result-modal-cmp',
  templateUrl: './bool-result.modal.component.html'
})

export class BoolResultModalComponent {
  public text: any = {};
  constructor(public bsModalRef: BsModalRef,
              private bsModalService: BsModalService) {
  }

  public closeAndSave(status): void {
    this.bsModalService.setDismissReason(status);
    this.bsModalRef.hide();
  }
}
