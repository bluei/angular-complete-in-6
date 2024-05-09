import { Inject, Injectable, inject } from '@angular/core';
import { Reservation } from '../_models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // reservationService = Inject(ReservationService);
  private reservations: Reservation[] = [];

  private apiUrl = "http://localhost:3001"
  http = inject(HttpClient);

  // the constructor is invoked when we create an instance of the 
  // reservation service.  So it ensures there is data in the service before 
  // ngOnInit lifecycle hook uses the service.

  // Original way of using local storage (required this constructor)
  // constructor(){
  //   let savedReservations = localStorage.getItem("reservations");
  //   this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  // }


  //CRUD

  getReservations(): Observable<Reservation[]> {
    // Now that it's an observable, the client module can subscribe to thie service
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations");
  }

  // Original way of using local storage
  // getReservations(): Reservation[] {
  //   return this.reservations;
  // }

  // Original way of using local storage
  // getReservation(id: string): Reservation | undefined {
  //   return this.reservations.find(r => r.id === id)
  // }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + "/reservation/" + id);
  }

  addReservation(reservation: Reservation): Observable<void> {
    let uuid = self.crypto.randomUUID();

    reservation.id = uuid; // Date.now().toString();
    this.reservations.push(reservation);
    console.log('ADD RESERVATION Processed'+JSON.stringify(reservation));

    return this.http.post<void>(this.apiUrl + "/reservation", reservation);
    
    // Original way of using local storage
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));
    
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/reservation/" + id);

    // Original way of using local storage
    //let index = this.reservations.findIndex(r => r.id === id);
    //this.reservations.splice(index, 1);
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  updateReservation(id: string, updatedReservation: Reservation): Observable<void> {
    return this.http.put<void>(this.apiUrl + "/reservation/" + id, updatedReservation);

    // get the array index of the current reservation 
    // let index = this.reservations.findIndex(r => r.id === id);

    // since there is no form field for id, it is not part of the updatedReservation
    // we have to add back the id to the array object
    updatedReservation.id = id;

    // replace the reservation with the updated one
    //this.reservations[index] = updatedReservation;


    // Original way of using local storage
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }


}
