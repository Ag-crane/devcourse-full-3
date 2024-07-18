export interface Order {
    id: number;
    created_at: string;
    address: string;
    receiver: string;
    contact: string;
    first_book: string;
    total_quantity: number;
    total_price: number;
}