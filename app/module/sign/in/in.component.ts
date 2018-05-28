import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sign-in-cmp',
  moduleId: module.id.toString(),
  animations: [CollapseAnimation],
  templateUrl: './in.component.html'
})

export class SignInComponent implements OnInit, OnDestroy {
}
