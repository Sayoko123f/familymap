export interface ShopData {
    oldPKey: string;
    name: string;
    longitude: number;
    latitude: number;
    address: string;
    updateDate: string;
    info: {
        code: string;
        qty: number;
        groupName?: string;
        categories: {
            code: string;
            qty: number;
            categoryName?: string;
            products: {
                code: string;
                qty: number;
                productName?: string;
            }[];
        }[];
    }[];
}

export interface Cache {
    classification: {
        code: number;
        message: string;
        data: {
            groupCode: string;
            groupName: string;
            categories: {
                categoryCode: string;
                categoryName: string;
                products: {
                    productCode: string;
                    productName: string;
                }[];
            }[];
        }[];
    };
    post: {
        [key: string]: { code: number; message: string; data: Array<ShopData> };
    };
    oldP: {
        [key: string]: ShopData;
    };
}
