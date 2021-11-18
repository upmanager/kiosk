import { BaseConfig } from "@config";

const _REQUEST2SERVER = (url, params = null, isFormdata = false) => {
    const isGet = (params == null);
    return new Promise(function (resolve, reject) {
        fetch(`${BaseConfig.SERVER_HOST}/api/${url}`, {
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
   return _REQUEST2SERVER('categories');
}