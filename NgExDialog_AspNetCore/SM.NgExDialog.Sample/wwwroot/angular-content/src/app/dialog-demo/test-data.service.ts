import { Injectable } from "@angular/core";

@Injectable()
export class TestDataService  {       
    constructor() {}

    getProduct(): any {
        return {
            ProductID: 2,
            ProductName: "Test Equipment 1",
            Category: "Office",
            UnitPrice: 67.89,
            AvailableSince: "04/28/2014",
            ProductStatus: "In Stock"
        }
    } 
}


