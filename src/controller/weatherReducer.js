import { FIND_WEATHER, SEARCH_CITY } from "../constant/Actions";




export function weatherReducer(state, action) {
    switch (action.type) {
        case SEARCH_CITY:
            return { ...state, currentWeather: null, city: action.payload?.city, cityList: action.payload?.cityList };
        case FIND_WEATHER:
            return { ...state, ...action.payload };

        default:
            break;
    }
}