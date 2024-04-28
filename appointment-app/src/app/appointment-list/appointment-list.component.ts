import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit{
  
  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  // example of setting an appointment before creating an array and 2-way binding
  appointmentOrig: Appointment = {
    id: 1,
    title: "Take dog out",
    date: new Date('2024-04-20')
  }

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments");
    
    // if there are saved appointments, initialize to that, otherwise empty array
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment() {
    //alert(this.newAppointmentTitle + " - " + this.newAppointmentDate);

    // only add if there is a date and title
    if (this.newAppointmentTitle.trim().length){
      let newAppt: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      };
      this.appointments.push(newAppt);

      // clear the fields
      this.newAppointmentDate = new Date();
      this.newAppointmentTitle = "";

      // save in local storage (key, value format)
      localStorage.setItem("appointments", JSON.stringify(this.appointments));
    }
  }


  deleteAppointment(index: number){
    this.appointments.splice(index, 1);

    // update local storage with the new array (now minus the deleted item)
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }
}
