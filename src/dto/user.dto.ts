export class CreateUserDTO {
    fullName: string;
    email: string;
    password: string;
}

export class LoginUserDTO {
    email: string;
    password: string;
}