import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Bien} from '../../../types';
import {BiensService} from '../services/biens.service';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-property-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './property-detail.component.html',
    styleUrl: './property-detail.component.scss'
})
export class PropertyDetailComponent implements OnInit {
    bien: Bien = {
        "idBien": 1,
        "commune": "Paris",
        "rue": "Rue de Rivoli",
        "cp": "75001",
        "nbCouchages": 2,
        "nbChambres": 1,
        "distance": 1000,
        "prix": 100,
        "mail": "john.doe@example.com",
        "image": "assets/images/image-1.png"
    };

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
}
