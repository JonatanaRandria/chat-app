export interface User {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  }
  export interface LoginUser {
    email?: string;
    password?: string;
  }
  export interface User extends LoginUser {
    userName?: string;
  }
  
  export interface CreateUser extends User {
    confirmPassword?: string;
  }
  export interface DomainUser {
    bio?: string;
    createdAt?: string;
    email?: string;
    googleId?: string;
    id?: number;
    name?: string;
    status?: string;
  }
  export interface UsertoREST extends DomainUser {
    deletedAt?: string;
    token?: string;
    updatedAt?: string;
  }
