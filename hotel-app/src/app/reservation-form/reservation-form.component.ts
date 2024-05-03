import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  
  reservationForm: FormGroup = new FormGroup({});

  // constructor(private formBuilder: FormBuilder){}
  formBuilder = inject(FormBuilder);

  ngOnInit(): void {

    // If more than one validator then you need an array within an array.
    // The form group attaches these per the formControlName in the HTML
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })
  }
  

  onSubmit() {
    if(this.reservationForm.valid) {
      console.log('valid');
    }
  }

}
