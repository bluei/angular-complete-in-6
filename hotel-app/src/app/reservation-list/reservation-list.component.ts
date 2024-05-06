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
    this.reservations = this.reservationService.getReservations();
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id);
  }


}
