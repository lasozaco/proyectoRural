export default interface User {
    data: {
        id: number;
        name: string;
        email: string;
    }
    token: string;
}