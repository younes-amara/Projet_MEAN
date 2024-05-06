import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DecimalPipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Bien} from "../../../../types";
import {FormsModule} from "@angular/forms";
import {LocationService} from "../../services/location.service";
import {RatingModule} from "primeng/rating";
import Swal from "sweetalert2";
import {AuthentificationService} from "../../services/authentification.service";

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [
        CurrencyPipe,
        RouterLink,
        FormsModule,
        DecimalPipe,
        RatingModule
    ],
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {


    constructor(private router: Router, private locationService: LocationService, private authService: AuthentificationService) {

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
        let user: any = this.authService.getUser();
        if (this.reservation.dateDebutLocation !== undefined && !this.reservation.dateFinLocation !== undefined) {

            if (this.reservation.dateDebutLocation < this.reservation.dateFinLocation) {
                this.reservation.mailLoueur = user.mail
                this.reservation.idBien = this.bien.idBien
                this.locationService.book(this.reservation).subscribe(
                    () => {
                        this.storage.removeItem("bien")
                        this.router.navigateByUrl("/dashboard/bookings")
                    }
                )
            }
        }
    }
}
