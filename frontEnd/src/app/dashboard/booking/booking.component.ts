import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Bien} from "../../../../types";
import {FormsModule} from "@angular/forms";
import {LocationService} from "../../services/location.service";

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [
        CurrencyPipe,
        RouterLink,
        FormsModule
    ],
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {


    constructor(private locationService: LocationService) {

    }


    ngOnInit(): void {
        this.getSelectedProp()
    }

    bien!: Bien;
    storage: Storage = localStorage;
    reservation: any = {};

    getSelectedProp() {
        this.bien = JSON.parse(this.storage.getItem("bien") ?? "");
    }

    book() {

        if (this.reservation.dateDebutLocation !== undefined && !this.reservation.dateFinLocation !== undefined) {

            if (this.reservation.dateDebutLocation < this.reservation.dateFinLocation) {

                this.reservation.mailLoueur = this.bien.mail
                this.reservation.idBien = this.bien.idBien
                console.log(this.reservation)

            }
        }
    }
}
