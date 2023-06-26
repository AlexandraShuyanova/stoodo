export interface IUser {
    createdBy: string | null,
    createdAt: string,
    lastModifiedBy: string | null,
    lastModifiedAt: string,
    id: string,
    firstName: string,
    lastName: string,
    email: string
}