import User from "./User";

export default interface Institutions{
    id:number;
    name:string;
    address:string;
    email:string;
    logo: string;
    description: string;
    user?: {
        name: string;
        email: string;
        rol: string;
    }
}