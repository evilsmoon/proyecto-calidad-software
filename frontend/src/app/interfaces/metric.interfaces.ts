export interface SuccessBillingTime {
    user_id   : String;
    time      : Number;

    date: Date
}
export interface ErrorBilling {
    user_id   : String;

    date: Date
}

export interface Date {

    year    : String;
    month   : String;
    day     : String;
}