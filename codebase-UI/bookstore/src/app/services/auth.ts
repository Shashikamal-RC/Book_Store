import { EmailValidator } from '@angular/forms';


export interface SIGNIN {
    username : EmailValidator;
    password: string;
}

export interface SIGNUP {
    first_name: string,
    last_name: string,
    username: string,
    email: EmailValidator,
    phone_number: number,
    password: string
}

export interface authResponseData {
    token : string,
    user : {
        _id : string,
        name : string,
        email : EmailValidator,
        role : string
    }
}
