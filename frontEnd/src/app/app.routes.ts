import {Routes} from '@angular/router';
import {PropertyListComponent} from "./property-list/property-list.component";
import {TestComponent} from "./test/test.component";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";
import {ConnexionComponent} from "./connexion/connexion.component";

export const routes: Routes = [
    {path: 'test', component: TestComponent},
    {path: 'login', component:ConnexionComponent},
    {path: 'properties', component: PropertyListComponent},
    {path: 'properties/:id', component: PropertyDetailComponent},
    {path: "", redirectTo: "/properties", pathMatch: "full"},
    {path: "**", redirectTo: "/properties", pathMatch: "full"}
];
