export interface History {
    _id?:string;
    userId?: string;
    records:  {
        _id: string;
        numbers: number[];
        calculate: string;
    }[];
};