import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../services/location.service";
import {AuthentificationService} from "../../services/authentification.service";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-reservation-list',
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: './reservation-list.component.html',
    styleUrl: './reservation-list.component.scss'
})
export class ReservationListComponent implements OnInit {

    bookings!: any[];


    constructor(private locationService: LocationService, private authService: AuthentificationService) {
    }

    ngOnInit(): void {
        this.getBookingList()
    }

    getBookingList() {

        let user: any = this.authService.getUser();
        this.locationService.getBookingList(user.mail).subscribe(data => {
            {
                console.log(data)
                this.bookings = (data as [])
            }
        })

    }

}
