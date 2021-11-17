import { Images } from "@assets";

export const CATEGORIES = [
    { id: 1, image: Images.course, name: "category 1", cols: 4, select_count: 1, title: "Title", subtitle: "sub title" },
    { id: 2, image: Images.course, name: "category 2 ", cols: 2, select_count: -1, title: "Title1", subtitle: "sub title 1" },
    { id: 3, image: Images.course, name: "category 3", cols: 4, select_count: 1, title: "Title2", subtitle: "sub title2" },
    { id: 4, image: Images.course, name: "category 4", cols: 4, select_count: 2, subtitle: "sub title3" },
    { id: 5, image: Images.course, name: "category 5", cols: 3, select_count: 1, title: "Title4", subtitle: "sub title4" },
    { id: 6, image: Images.course, name: "category 6", cols: 4, select_count: 2, title: "Title5", subtitle: "sub title5" },
];
export const TMPSUBPRODUCT = [
    { id: 1, image: Images.course, name: "sub product 1", price: 1.5 },
    { id: 2, image: Images.course, name: "sub product 2", price: 2.5 },
    { id: 3, image: Images.course, name: "sub product 3", price: 3.5 },
    { id: 4, image: Images.course, name: "sub product 4", price: 1.5 },
    { id: 5, image: Images.course, name: "sub product 5", price: 4.0 },
    { id: 6, image: Images.course, name: "sub product 6", price: 1.0 },
    { id: 7, image: Images.course, name: "sub product 7", price: 1.1 },
    { id: 8, image: Images.course, name: "sub product 8", price: 1.2 },
    { id: 9, image: Images.course, name: "sub product 9", price: 1.3 },
    { id: 10, image: Images.course, name: "sub product 10", price: 1.4 },
];
export const PRODUCTS = [
    { id: 1, categoryid: 1, image: Images.course, name: "product 1 1", cols: 2, customize: true, subproduct: TMPSUBPRODUCT },
    { id: 2, categoryid: 1, image: Images.course, name: "product 1 2", price: 1.5 },
    { id: 3, categoryid: 1, image: Images.course, name: "product 1 3", price: 1.4 },
    { id: 4, categoryid: 1, image: Images.course, name: "product 1 4", price: 2 },
    { id: 5, categoryid: 1, image: Images.course, name: "product 1 5", cols: 2, customize: true, subproduct: TMPSUBPRODUCT },
    { id: 6, categoryid: 1, image: Images.course, name: "product 1 6", price: 4 },

    { id: 7, categoryid: 2, image: Images.course, name: "product 2 7", price: 5 },
    { id: 8, categoryid: 2, image: Images.course, name: "product 2 8", price: 1 },
    { id: 9, categoryid: 2, image: Images.course, name: "product 2 9", price: 2.4 },
    { id: 10, categoryid: 2, image: Images.course, name: "product 2 10", price: 3.4 },
    { id: 11, categoryid: 2, image: Images.course, name: "product 2 11", price: 5.4 },
    { id: 12, categoryid: 2, image: Images.course, name: "product 2 12", price: 6.4 },

    { id: 13, categoryid: 3, image: Images.course, name: "product 3 1", price: 1.4 },
    { id: 14, categoryid: 3, image: Images.course, name: "product 3 2", price: 1.4 },
    { id: 15, categoryid: 3, image: Images.course, name: "product 3 3", price: 1.5 },
    { id: 16, categoryid: 3, image: Images.course, name: "product 3 4", price: 1.4 },
    { id: 17, categoryid: 3, image: Images.course, name: "product 3 5", price: 1.4 },
    { id: 18, categoryid: 3, image: Images.course, name: "product 3 6", price: 1.4 },

    { id: 19, categoryid: 4, image: Images.course, name: "product 4 1", price: 1.4 },
    { id: 20, categoryid: 4, image: Images.course, name: "product 4 2", price: 1.4 },
    { id: 21, categoryid: 4, image: Images.course, name: "product 4 3", price: 1.4 },
    { id: 22, categoryid: 4, image: Images.course, name: "product 4 4", price: 1.4 },
    { id: 23, categoryid: 4, image: Images.course, name: "product 4 5", price: 1.4 },
    { id: 24, categoryid: 4, image: Images.course, name: "product 4 6", price: 1.4 },

    { id: 25, categoryid: 5, image: Images.course, name: "product 5 1", price: 1.4 },
    { id: 26, categoryid: 5, image: Images.course, name: "product 5 2", price: 1.4 },
    { id: 27, categoryid: 5, image: Images.course, name: "product 5 3", price: 1.4 },
    { id: 28, categoryid: 5, image: Images.course, name: "product 5 4", price: 1.4 },
    { id: 29, categoryid: 5, image: Images.course, name: "product 5 5", price: 1.4 },
    { id: 30, categoryid: 5, image: Images.course, name: "product 5 6", price: 1.4 },

    { id: 31, categoryid: 6, image: Images.course, name: "product 6 1", price: 1.4 },
    { id: 32, categoryid: 6, image: Images.course, name: "product 6 2", price: 1.4 },
    { id: 33, categoryid: 6, image: Images.course, name: "product 6 3", price: 1.4 },
    { id: 34, categoryid: 6, image: Images.course, name: "product 6 4", price: 1.4 },
    { id: 35, categoryid: 6, image: Images.course, name: "product 6 5", price: 1.4 },
    { id: 36, categoryid: 6, image: Images.course, name: "product 6 6", price: 1.4 },
];