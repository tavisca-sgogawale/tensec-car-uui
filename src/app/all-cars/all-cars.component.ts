import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {CarsService} from '../services/cars.service';

export interface PeriodicElement {
  carName: string;
  id: number;
  manufat: number;
  types: string;
  milage: string;
  action: string;
}

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent implements OnInit {
  @Output() msgToSibling = new EventEmitter<any>();
  currentMsgToSibling: any;
  confirmation: boolean;
  carsData: any;
  displayedColumns: string[] = ['id', 'name', 'manufacturer', 'type', 'mileage', 'price', 'action'];
  dataSource: Observable<any>;

  constructor(private CarsService: CarsService) { }

  ngOnInit(): void {
    this.confirmation = false;
    this.CarsService.fetchAllCares().subscribe(data => {
      console.log(data);
      this.dataSource = data.cars;      
    });
  }

  edit(data){
    this.msgToSibling.emit(data);
    
  }

  delete(id){
    console.log(id);
    if (confirm('Are you sure you want to delete this record?')) {
      this.CarsService.deleteCars(id).subscribe(data => {
        console.log(data);
      });
      this.ngOnInit();
      
    }
  }
  

}
