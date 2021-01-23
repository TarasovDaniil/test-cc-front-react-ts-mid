import {Action} from "./actions";
import {CHANGE_FILTER_VAL, CHANGE_FILTERED_DOCUMENTS, CHANGE_PAGE, INIT, LOADING, MAX_DOCUMENTS_PAGE} from "./consts";
import {DocumentParticipant, Document} from "../data";
const { Map } = require('immutable');

export type FilterState = {
    search: string,
    isAllDocuments: boolean,
    participant : DocumentParticipant | null
}

type InitState = {
    initUsers: Array<DocumentParticipant>,
    initDocuments: Array<Document>,
    filteredDocuments: Array<Document>,
    currentDocuments: Array<Document>,
    currentUser: DocumentParticipant | null,
    currentPage: number,
    maxPage: number,
    loading: boolean,
    filter: FilterState
}

const initVal : InitState = {
    initUsers: [],
    initDocuments: [],
    currentDocuments: [],
    filteredDocuments: [],
    currentUser: null,
    currentPage: 0,
    maxPage: 0,
    loading: false,
    filter:{
        search: '',
        isAllDocuments: true,
        participant : null
    }
};

export function reducer(state = initVal, action : Action) {
    let values = new Map(action.payload);
    switch (action.type) {
        case INIT: {
            return  {
                ...state,
                initUsers: values.get('initUsers') || [],
                initDocuments: values.get('initDocuments') || [],
                filteredDocuments: values.get('initDocuments') || [],
                currentDocuments: values.get('currentDocuments') || [],
                currentUser : values.get('currentUser') || null,
                currentPage: values.get('currentPage') || 0,
                maxPage: values.get('maxPage') || 0,
            };
        }
        case CHANGE_FILTER_VAL: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [values.get('key')]: values.get('value')
                }
            };
        }
        case CHANGE_PAGE:{
            let current = values.get('page') > state.maxPage ? state.currentPage : values.get('page') < 0 ? 0 : values.get('page');
            return{
                ...state,
                currentPage: current,
                currentDocuments: state.filteredDocuments.slice(current * MAX_DOCUMENTS_PAGE, current * MAX_DOCUMENTS_PAGE + MAX_DOCUMENTS_PAGE)
            };
        }
        case CHANGE_FILTERED_DOCUMENTS:{
            return {
                ...state,
                filteredDocuments: values.get('filteredDocuments'),
                currentPage: values.get('currentPage'),
                maxPage: values.get('maxPage'),
                currentDocuments: values.get('currentDocuments')
            }
        }
        case LOADING: {
            return {
                ...state,
                loading: values.get('load')
            };
        }
        default:{
            return state;
        }
    }
}

export type IRootState = ReturnType<typeof reducer>