import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Bien} from '../../../types';
import {BiensService} from '../services/biens.service';
import {CommonModule} from '@angular/common';
import {GoogleMap, MapMarker} from "@angular/google-maps";

@Component({
    selector: 'app-property-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, GoogleMap, MapMarker],
    templateUrl: './property-detail.component.html',
    styleUrl: './property-detail.component.scss'
})


export class PropertyDetailComponent implements OnInit {


    bien!: Bien;
    storage: Storage = localStorage;

    mapOptions: google.maps.MapOptions = {
        center: {lat: 38.9987208, lng: -77.2538699},
        zoom: 14
    }
    marker = {
        position: {lat: 38.9987208, lng: -77.2538699},
    }


    constructor(private route: ActivatedRoute, private biensService: BiensService) {
    }

    ngOnInit(): void {

        this.route.paramMap.subscribe(() =>
            this.getPropertyDetails()
        );

    }

    getPropertyDetails() {
        const hasPropertyId: boolean = this.route.snapshot.paramMap.has("id");
        if (hasPropertyId) {
            const propertyId: number = +this.route.snapshot.paramMap.get("id")!;
            this.biensService.getBienById(propertyId).subscribe(
                data => this.bien = data
            );
        }
    }

    persistProperty(bien: Bien) {
        this.storage.setItem("bien", JSON.stringify(bien));
    }


}
