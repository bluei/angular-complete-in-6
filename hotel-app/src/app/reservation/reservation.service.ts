import { Inject, Injectable } from '@angular/core';
import { Reservation } from '../_models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // reservationService = Inject(ReservationService);
  private reservations: Reservation[] = [];

  // the constructor is invoked when we create an instance of the 
  // reservation service.  So it ensures there is data in the service before 
  // ngOnInit lifecycle hook uses the service.
  constructor(){
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }


  //CRUD
  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(r => r.id === id)
  }

  addReservation(reservation: Reservation): void {
    let uuid = self.crypto.randomUUID();

    reservation.id = uuid; // Date.now().toString();
    this.reservations.push(reservation);
    console.log('ADDING RESERVATION:'+JSON.stringify(reservation));
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(r => r.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  updateReservation(id: string, updatedReservation: Reservation): void {

    // get the array index of the current reservation 
    let index = this.reservations.findIndex(r => r.id === id);

    // since there is no form field for id, it is not part of the updatedReservation
    // we have to add back the id to the array object
    updatedReservation.id = id;

    // replace the reservation with the updated one
    this.reservations[index] = updatedReservation;

    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }


}
