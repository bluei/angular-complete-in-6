import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../_models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  // constructor(private formBuilder: FormBuilder){}
  formBuilder = inject(FormBuilder);
  reservationService = inject(ReservationService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {

    // If more than one validator then you need an array within an array.
    // The form group attaches these per the formControlName in the HTML
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      let reservation = this.reservationService.getReservation(id);

      if (reservation)
        this.reservationForm.patchValue(reservation);
    }
  }


  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        // UPDATE if we have an ID (means we are editing)
        console.log('There is an ID in the route:' + id);
        this.reservationService.updateReservation(id, reservation);
      } else {
        // ADD if there is no id 
        console.log('No ID');
        this.reservationService.addReservation(reservation);
      }


      this.router.navigate(['/list']);
    }
  }

}
