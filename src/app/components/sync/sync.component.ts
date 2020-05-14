import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import {
  AppState,
  selectAllPolling,
  selectAllSync,
  selectSyncLoaded,
} from 'src/app/reducers';
import * as actions from '../../actions/sync.actions';
import { PollingEntity } from 'src/app/reducers/polling.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss'],
})
export class SyncComponent implements OnInit {
  theForm: FormGroup;
  orders$: Observable<PollingEntity[]>;
  loaded$: Observable<boolean>;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.theForm = this.getForm();
  }

  getForm() {
    return this.formBuilder.group({
      for: ['', [Validators.required]],
      items: this.formBuilder.array([this.formBuilder.control('')]),
    });
  }
  get for() {
    return this.theForm.get('for');
  }

  get items() {
    return this.theForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.formBuilder.control(''));
  }

  ngOnInit(): void {
    this.orders$ = this.store.pipe(select(selectAllSync));
    this.loaded$ = this.store.pipe(select(selectSyncLoaded));
  }

  submit() {
    if (this.theForm.valid && this.items.length >= 1) {
      this.store.dispatch(actions.curbsideOrderAdded(this.theForm.value));
      this.theForm = this.getForm();
    }
  }
}
