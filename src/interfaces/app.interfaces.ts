export interface IApp {
    id: string;
    name: string;
    description: string;
    categories: string[];
    subscriptions: ISubscription[];
}

export interface ISubscription {
    name: string;
    price: number;
}