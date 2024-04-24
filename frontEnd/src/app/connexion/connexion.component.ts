import {Component} from '@angular/core';
import {AuthentificationService} from '../services/authentification.service';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../layout/header/header.component';
import {FooterComponent} from '../layout/footer/footer.component';
import {FormSearchComponent} from '../form-search/form-search.component';
import {CommonModule} from '@angular/common';
import {PropertyListComponent} from '../property-list/property-list.component';
import {PaginatorModule} from 'primeng/paginator';
import {PropertyDetailComponent} from '../property-detail/property-detail.component';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Credentials} from "../../../types";
import {LoginValidator} from "../validators/loginValidator";
import Swal from "sweetalert2";

@Component({
    selector: 'app-connexion',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './connexion.component.html',
    styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
    loginFormGroup!: FormGroup;

    constructor(private formBuilder: FormBuilder, private auth: AuthentificationService) {
    }

    ngOnInit(): void {
        this.buildLoginForm();
    }

    onSubmit() {
        if (this.loginFormGroup.invalid) {
            this.loginFormGroup.markAllAsTouched();
            return;
        }

        let credentials: Credentials;
        credentials = this.loginFormGroup.controls['login'].value;
        console.log(credentials)
        this.auth.verification(credentials).subscribe(
            res => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully',
                    timer: 2000
                }).then(
                    // void this.router.navigate(["/"])
                )
            }
        )
    }

    buildLoginForm() {
        this.loginFormGroup = this.formBuilder.group(
            {
                login: this.formBuilder.group({
                    login: new FormControl("", [
                        Validators.required,
                        LoginValidator.notOnlyWhiteSpace
                    ]),
                    password: new FormControl("", [
                        Validators.required,
                        LoginValidator.notOnlyWhiteSpace
                    ])
                })
            }
        )
    }

    get login() {
        return this.loginFormGroup.get("login.login");
    }

    get password() {
        return this.loginFormGroup.get("login.password");
    }

    Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })


}
