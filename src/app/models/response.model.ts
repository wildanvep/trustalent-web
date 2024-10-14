export interface GlobalResponse<T> {
    status: number;
    message: string;
    data: T;
}
