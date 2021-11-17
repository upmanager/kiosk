import { BaseConfig } from "@config";
import { CATEGORIES, PRODUCTS } from "./tmpData";

const _REQUEST2SERVER = (url, params = null, isFormdata = false) => {
    const isGet = (params == null);
    return new Promise(function (resolve, reject) {
        fetch(`${BaseConfig.SERVER_HOST}/${url}`, {
            method: isFormdata ? "post" : isGet ? 'get' : 'post',
            headers: {
                'content-type': isFormdata ? 'multipart/form-data' : 'application/json'
            },
            ...(!isGet && { body: isFormdata ? params : JSON.stringify(params) })
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}
export const getCategories = () => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(CATEGORIES);
        }, 2000);
    });
}
export const getProducts = () => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(PRODUCTS);
        }, 2000);
    });
}