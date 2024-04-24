import {FormControl, ValidationErrors} from "@angular/forms";

export class LoginValidator {


    static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {

        if (control.value != null && control.value.trim().length === 0)
            return {"notOnlyWhiteSpace": true};
        else
            return null;
    }
}
