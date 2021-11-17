import { LOADING, SELECT, CLEAR, UNSELECT, GETCATEGORIS, GETPRODUCTS } from "@constants";
import * as ApiActions from './api';

export const selectProd = (data) => ({ type: SELECT, data })
export const unSelectProd = (data) => ({ type: UNSELECT, data })
const loading = (isLoading, dispatch) => {
    dispatch({ type: LOADING, data: isLoading });
}
export const clearProd = (index) => ({ type: CLEAR, data: index });
export const getCategories = () => dispatch => {
    loading(true, dispatch);
    ApiActions.getCategories()
        .then(res => {
            dispatch({ type: GETCATEGORIS, data: res });
        }).catch(err => {
            dispatch({ type: GETCATEGORIS, data: [] });
        })
        .finally(() => {
            loading(false, dispatch);
        });
}
export const getProducts = () => dispatch => {
    loading(true, dispatch);
    ApiActions.getProducts()
        .then(res => {
            dispatch({ type: GETPRODUCTS, data: res });
        }).catch(err => {
            dispatch({ type: GETPRODUCTS, data: [] });
        })
        .finally(() => {
            loading(false, dispatch);
        });
}