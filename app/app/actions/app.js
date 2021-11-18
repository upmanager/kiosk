import { LOADING, SELECT, CLEAR, UNSELECT, GETCATEGORIS } from "@constants";
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
            dispatch({ type: GETCATEGORIS, data: res.data });
        }).catch(err => {
            console.error(err);
            dispatch({ type: GETCATEGORIS, data: [] });
        })
        .finally(() => {
            loading(false, dispatch);
        });
}