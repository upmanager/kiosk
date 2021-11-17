import { LOADING, SELECT, UNSELECT, CLEAR, GETCATEGORIS, GETPRODUCTS } from "@constants";
const initialState = {
    loading: false,
    selectedList: [],
    categories: [],
    products: []
};

export default (state = initialState, action) => {
    var { selectedList, categories } = state;
    if (selectedList == null) selectedList = [];
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.data };
        case SELECT:
            selectedList = [...selectedList, action.data];
            selectedList = selectedList.sort((a, b) => a?.categoryid - b?.categoryid);
            return { ...state, selectedList }
        case UNSELECT:
            selectedList = selectedList.filter(item => item?.id && item?.id != action.data.id);
            return { ...state, selectedList };
        case CLEAR:
            if (action.data > 0) {
                var idx = categories.findIndex(item => item.id == action.data);
                var cateids = categories.slice(0, idx).map(item => item.id);
                selectedList = selectedList.filter(item => cateids.some(catid => catid == item.categoryid));
            } else {
                selectedList = [];
            }
            return { ...state, selectedList };
        case GETCATEGORIS:
            return { ...state, categories: action.data };
        case GETPRODUCTS:
            return { ...state, products: action.data };
        default:
            return state;
    }
};
