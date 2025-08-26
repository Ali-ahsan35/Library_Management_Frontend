export type Genre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';


export interface IBook {
_id?: string;
title: string;
author: string;
genre: Genre;
isbn: string;
description?: string;
copies: number;
available?: boolean;
createdAt?: string;
updatedAt?: string;
}


export interface IBorrowInput {
book: string; // book _id
quantity: number;
dueDate: string; // ISO date string
}


export interface IBorrowSummaryItem {
book: { title: string; isbn: string };
totalQuantity: number;
}