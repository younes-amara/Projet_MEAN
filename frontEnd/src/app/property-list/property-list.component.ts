import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, RouterLink} from '@angular/router';
import {BiensService} from '../services/biens.service';
import {Bien, Biens} from '../../../types';
import {RatingModule} from 'primeng/rating';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {MessagesModule} from "primeng/messages";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@Component({
    selector: 'app-property-list',
    standalone: true,
    imports: [RatingModule, CommonModule, FormsModule, RouterLink, PaginatorModule, MessagesModule, NgxSkeletonLoaderModule],
    templateUrl: './property-list.component.html',
    styleUrl: './property-list.component.scss'
})


export class PropertyListComponent implements OnInit {

    biensList: Bien[] = [
            {
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
            },
            {
                "idBien": 2,
                "commune": "Lyon",
                "rue": "Rue de la République",
                "cp": "69001",
                "nbCouchages": 4,
                "nbChambres": 2,
                "distance": 2000,
                "prix": 150,
                "mail": "jane.smith@example.com",
                "image": "assets/images/image-2.png"
            },
            {
                "idBien": 3,
                "commune": "Marseille",
                "rue": "Avenue du Prado",
                "cp": "13006",
                "nbCouchages": 3,
                "nbChambres": 1,
                "distance": 1500,
                "prix": 120,
                "mail": "alice.johnson@example.com",
                "image": "assets/images/image-3.png"
            },
            {
                "idBien": 4,
                "commune": "Bordeaux",
                "rue": "Rue Sainte-Catherine",
                "cp": "33000",
                "nbCouchages": 2,
                "nbChambres": 1,
                "distance": 800,
                "prix": 90,
                "mail": "bob.williams@example.com",
                "image": "assets/images/image-4.png"
            },
            {
                "idBien": 5,
                "commune": "Lille",
                "rue": "Grand Place",
                "cp": "59000",
                "nbCouchages": 6,
                "nbChambres": 3,
                "distance": 1200,
                "prix": 200,
                "mail": "emily.brown@example.com",
                "image": "assets/images/image-5.png"
            },
            {
                "idBien": 6,
                "commune": "Toulouse",
                "rue": "Place du Capitole",
                "cp": "31000",
                "nbCouchages": 4,
                "nbChambres": 2,
                "distance": 1800,
                "prix": 160,
                "mail": "john.doe@example.com",
                "image": "assets/images/image-6.png"
            },
            {
                "idBien": 7,
                "commune": "Nantes",
                "rue": "Rue Crébillon",
                "cp": "44000",
                "nbCouchages": 2,
                "nbChambres": 1,
                "distance": 900,
                "prix": 95,
                "mail": "jane.smith@example.com",
                "image": "assets/images/image-7.png"
            },
            {
                "idBien": 8,
                "commune": "Strasbourg",
                "rue": "Rue du Vieux Marché aux Poissons",
                "cp": "67000",
                "nbCouchages": 3,
                "nbChambres": 1,
                "distance": 1100,
                "prix": 110,
                "mail": "alice.johnson@example.com",
                "image": "assets/images/image-8.png"
            },
            {
                "idBien": 9,
                "commune": "Nice",
                "rue": "Promenade des Anglais",
                "cp": "06000",
                "nbCouchages": 2,
                "nbChambres": 1,
                "distance": 1300,
                "prix": 130,
                "mail": "bob.williams@example.com",
                "image": "assets/images/image-9.png"
            },
            {
                "idBien": 10,
                "commune": "Montpellier",
                "rue": "Place de la Comédie",
                "cp": "34000",
                "nbCouchages": 5,
                "nbChambres": 3,
                "distance": 1400,
                "prix": 180,
                "mail": "emily.brown@example.com",
                "image": "assets/images/image-10.png"
            },

            {
                "idBien": 11,
                "commune": "Rennes",
                "rue": "Rue de la Visitation",
                "cp": "35000",
                "nbCouchages": 3,
                "nbChambres": 2,
                "distance": 800,
                "prix": 120,
                "mail": "john.doe@example.com",
                "image": "assets/images/image-11.png"
            },
            {
                "idBien": 12,
                "commune": "Brest",
                "rue": "Rue de Siam",
                "cp": "29200",
                "nbCouchages": 4,
                "nbChambres": 2,
                "distance": 1200,
                "prix": 140,
                "mail": "jane.smith@example.com",
                "image": "assets/images/image-12.png"
            },
            {
                "idBien": 13,
                "commune": "Saint-Étienne",
                "rue": "Rue de la République",
                "cp": "42000",
                "nbCouchages": 2,
                "nbChambres": 1,
                "distance": 1000,
                "prix": 90,
                "mail": "alice.johnson@example.com",
                "image": "assets/images/image-13.png"
            },
            {
                "idBien": 14,
                "commune": "Grenoble",
                "rue": "Rue Félix Poulat",
                "cp": "38000",
                "nbCouchages": 5,
                "nbChambres": 3,
                "distance": 1500,
                "prix": 180,
                "mail": "bob.williams@example.com",
                "image": "assets/images/image-14.png"
            },
            {
                "idBien": 15,
                "commune": "Reims",
                "rue": "Rue de Vesle",
                "cp": "51100",
                "nbCouchages": 2,
                "nbChambres": 1,
                "distance": 700,
                "prix": 100,
                "mail": "emily.brown@example.com",
                "image": "assets/images/image-15.png"
            },
            {
                "idBien": 16,
                "commune": "Dijon",
                "rue": "Rue de la Liberté",
                "cp": "21000",
                "nbCouchages": 3,
                "nbChambres": 2,
                "distance": 900,
                "prix": 130,
                "mail": "john.doe@example.com",
                "image": "assets/images/image-16.png"
            },
            {
                "idBien": 17,
                "commune": "Le Havre",
                "rue": "Rue de Paris",
                "cp": "76600",
                "nbCouchages": 4,
                "nbChambres": 2,
                "distance": 1200,
                "prix": 150,
                "mail": "jane.smith@example.com",
                "image": "assets/images/image-17.png"
            },
            {
                "idBien": 18,
                "commune": "Toulon",
                "rue": "Avenue de la République",
                "cp": "83000",
                "nbCouchages": 3,
                "nbChambres": 1,
                "distance": 1100,
                "prix": 110,
                "mail": "alice.johnson@example.com",
                "image": "assets/images/image-18.png"
            },
            {
                "idBien": 19,
                "commune": "Angers",
                "rue": "Boulevard du Roi René",
                "cp": "49000",
                "nbCouchages": 2,
                "nbChambres": 1,
                "distance": 800,
                "prix": 95,
                "mail": "bob.williams@example.com",
                "image": "assets/images/image-19.png"
            },
            {
                "idBien": 20,
                "commune": "Limoges",
                "rue": "Avenue Garibaldi",
                "cp": "87000",
                "nbCouchages": 6,
                "nbChambres": 3,
                "distance": 1300,
                "prix": 200,
                "mail": "emily.brown@example.com",
                "image": "assets/images/image-20.png"
            },

            {
                "idBien": 11,
                "commune": "Montpellier",
                "rue": "Rue de la Loge",
                "cp": "34000",
                "nbCouchages": 3,
                "nbChambres": 2,
                "distance": 900,
                "prix": 130,
                "mail": "john.doe@example.com",
                "image": "assets/images/image-21.png"
            },
            {
                "idBien": 12,
                "commune": "Montpellier",
                "rue": "Rue de l'Ancien Courrier",
                "cp": "34000",
                "nbCouchages": 4,
                "nbChambres": 2,
                "distance": 1200,
                "prix": 150,
                "mail": "jane.smith@example.com",
                "image": "assets/images/image-22.png"
            },
            {
                "idBien": 13,
                "commune": "Montpellier",
                "rue": "Rue de l'Université",
                "cp": "34000",
                "nbCouchages": 2,
                "nbChambres": 1,
                "distance": 800,
                "prix": 110,
                "mail": "alice.johnson@example.com",
                "image": "assets/images/image-23.png"
            },
            {
                "idBien": 14,
                "commune": "Montpellier",
                "rue": "Rue Saint-Guilhem",
                "cp": "34000",
                "nbCouchages": 5,
                "nbChambres": 3,
                "distance": 1500,
                "prix": 180,
                "mail": "bob.williams@example.com",
                "image": "assets/images/image-24.png"
            },
            {
                "idBien": 15,
                "commune": "Montpellier",
                "rue": "Rue de l'Aiguillerie",
                "cp": "34000",
                "nbCouchages": 2,
                "nbChambres": 1,
                "distance": 1000,
                "prix": 120,
                "mail": "emily.brown@example.com",
                "image": "assets/images/image-25.png"
            },


            {
                "idBien": 16,
                "commune": "Paris",
                "rue": "Avenue des Champs-Élysées",
                "cp": "75008",
                "nbCouchages": 4,
                "nbChambres": 2,
                "distance": 1200,
                "prix": 250,
                "mail": "john.doe@example.com",
                "image": "assets/images/image-26.png"
            },
            {
                "idBien": 17,
                "commune": "Paris",
                "rue": "Rue du Faubourg Saint-Honoré",
                "cp": "75001",
                "nbCouchages": 3,
                "nbChambres": 1,
                "distance": 1000,
                "prix": 180,
                "mail": "jane.smith@example.com",
                "image": "assets/images/image-27.png"
            },
            {
                "idBien": 18,
                "commune": "Paris",
                "rue": "Rue de Rivoli",
                "cp": "75004",
                "nbCouchages": 2,
                "nbChambres": 1,
                "distance": 800,
                "prix": 150,
                "mail": "alice.johnson@example.com",
                "image": "assets/images/image-28.png"
            },
            {
                "idBien": 19,
                "commune": "Paris",
                "rue": "Boulevard Saint-Germain",
                "cp": "75006",
                "nbCouchages": 3,
                "nbChambres": 2,
                "distance": 1100,
                "prix": 200,
                "mail": "bob.williams@example.com",
                "image": "assets/images/image-29.png"
            },
            {
                "idBien": 20,
                "commune": "Paris",
                "rue": "Rue de la Paix",
                "cp": "75002",
                "nbCouchages": 2,
                "nbChambres": 1,
                "distance": 900,
                "prix": 180,
                "mail": "emily.brown@example.com",
                "image": "assets/images/image-30.png"
            }
        ];

    bien_ratting = 5;
    items = new Array(6);

    onBienOutput(bien: Bien) {
        console.log(bien, 'Output');
    }

    constructor(private route: ActivatedRoute, private biensService: BiensService, private router: Router) {


    }

    ngOnInit(): void {

    }


    getProperties() {
    }
}
