import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.css']
})
export class FormFieldsComponent implements OnInit {
  @Input() EditData: Observable<any>;
  form: FormGroup;
  loading: boolean;
  update: boolean;
  constructor( private CarsService: CarsService) { }

  ngOnInit(): void {
    this.update = false;
    console.log('From forms modules', this.EditData);
    
    this.loading = false;
    this.form = new FormGroup({
      id: new FormControl({ value: null, disabled: false }),
      name: new FormControl(null, {validators: [Validators.required]}),
      manufact: new FormControl(null, {validators: [Validators.required]}),
      types: new FormControl(null, {validators: [Validators.required]}),
      milage: new FormControl(null, {validators: [Validators.required]}),
      price: new FormControl(null, {validators: [Validators.required]}),
    });
    this.form.controls.id.setValue('C' + this.CarsService.randomString(3));
  }

  ngOnChanges(): void {
    console.log('From forms modules', this.EditData);
    if(this.EditData !== undefined){
      this.update = true;
      this.EditData.forEach(data => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.name.setValue(data.name);
        this.form.controls.manufact.setValue(data.manufacturer);
        this.form.controls.types.setValue(data.type);
        this.form.controls.milage.setValue(data.mileage);
        this.form.controls.price.setValue(data.price);
      });
    }
  }

  editThis(data){
  }

  add(){

  }

  updateInfo(){
    this.CarsService.updateCars(this.form.value).subscribe(ele => {
      console.log(ele);
    });
    this.CarsService.fetchAllCares();
  }

}
