export class User {
    constructor(
        private token : string,
        private _tokenExpirationTime : number 
    ){}

    get gettoken(){
        // getting expairation date from token
        if(this.token){

            if(this._tokenExpirationTime && new Date() > new Date(this._tokenExpirationTime)){
                return ''
            }
            return this.token;
        }
        return ''
    }
}