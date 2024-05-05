import {Routes} from '@angular/router';
import {PropertyListComponent} from "./property-list/property-list.component";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BookingComponent} from "./dashboard/booking/booking.component";

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [
            {path: 'properties', component: PropertyListComponent},
            {path: 'properties/:id', component: PropertyDetailComponent},
            {path: 'search', component: PropertyListComponent},
            {path: '', redirectTo: "properties", pathMatch: "full"},
            {path: "**", redirectTo: "properties", pathMatch: "full"}
        ]
    },
    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            {path: 'book', component: BookingComponent},
            {path: '', redirectTo: "book", pathMatch: "full"},
            {path: "**", redirectTo: "book", pathMatch: "full"}
        ]
    },
    {path: 'login', component: ConnexionComponent},
    {path: 'dashboard', component: DashboardComponent},

    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "**", redirectTo: "/home", pathMatch: "full"}
];
