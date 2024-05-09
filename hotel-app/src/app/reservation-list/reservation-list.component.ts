import { Component, OnInit, inject } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../_models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  
  reservations: Reservation[] = [];
  reservationService = inject(ReservationService);

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe( reservations => {
      this.reservations = reservations;
    });
    // Original way of using local storage
    // this.reservations = this.reservationService.getReservations();
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id).subscribe( () => {
      console.log("The DELETE Reservation was Processed");
    });
  }


}
