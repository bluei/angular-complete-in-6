import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {
  
  newAppointmentTitle: string = ""
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];
  
  
  appointment2: Appointment = {
    id: 1,
    title: "Take dog out",
    date: new Date('2024-04-20')
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
    }
  }


  deleteAppointment(index: number){
    this.appointments.splice(index, 1);
  }
}
