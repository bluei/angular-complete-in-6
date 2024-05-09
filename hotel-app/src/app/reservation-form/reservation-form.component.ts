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
      // if there is an id it means we are editing. patchValues fills in the form with the object where values match

      // Original way of using local storage
      // let reservation = this.reservationService.getReservation(id);
      this.reservationService.getReservation(id).subscribe(reservation => {
        this.reservationForm.patchValue(reservation);
      })
    }
  }


  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        // UPDATE if we have an ID (means we are editing)
        console.log('There is an ID in the route:' + id);
        this.reservationService.updateReservation(id, reservation).subscribe( () => {
          console.log("On Submit - UPDATE Processed");
        });
      } else {
        // CREATE if there is no id 
        // console.log('No ID');
        this.reservationService.addReservation(reservation).subscribe( () => {
          console.log("On Submit - CREATE Reservation Processed");
        });
      }


      this.router.navigate(['/list']);
    }
  }

}
