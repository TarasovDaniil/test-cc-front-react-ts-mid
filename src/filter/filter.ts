import {FilterOperator, SearchRule} from "./types";
const { Map } = require('immutable');

export default class Filter<T> {
    data: Array<T>;

    constructor() {
        this.data = [];
    }

    setData(data: Array<T>) : this{
        this.data = data;
        return this;
    }

    get() : Array<T>{
        return this.data;
    }

    buildFilter(operator: FilterOperator,search: Array<SearchRule>) : this {
        this.data =  this.searchInArray(this.data, search, operator);
        return this;
    }

    searchInArray(value : Array<T>, search: Array<SearchRule>, operator: FilterOperator) {
        return value.filter((val : T) => {
            return this.searchInObject(val, search, operator);
        });
    };
    searchInObject(value: any, search: Array<SearchRule>, operator: FilterOperator) {
        let result : boolean = operator === FilterOperator.AND;
        const map = new Map(value);

        search.forEach((val : SearchRule) => {
            if(map.has(val.key) && !Array.isArray(map.get(val.key))){
                if(operator === FilterOperator.AND){
                    result = result && val.rule(map.get(val.key), val.search, map);
                }else{
                    result = result || val.rule(map.get(val.key), val.search, map);
                }
            }
        });

        if(!result){
            result = map.reduce((accum : boolean, current : any) => {
                if(Array.isArray(current) && current.length > 0){
                    return accum || current.some(child => this.searchInObject(child, search, operator));
                }
                return accum;
            }, false);
        }
        return result;
    };
}