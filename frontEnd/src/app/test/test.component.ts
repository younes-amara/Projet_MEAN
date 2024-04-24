import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginValidator} from "../validators/loginValidator";
import Swal from 'sweetalert2'
import {NgIf} from "@angular/common";
import {Credentials} from "../../../types";
import {AuthentificationService} from "../services/authentification.service";

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [
        RouterLink,
        NgxSkeletonLoaderModule,
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {

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
