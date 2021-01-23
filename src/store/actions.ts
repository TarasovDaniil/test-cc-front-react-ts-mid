import {Data, Document} from "../data";
import {CHANGE_FILTER_VAL, CHANGE_FILTERED_DOCUMENTS, CHANGE_PAGE, INIT, LOADING, MAX_DOCUMENTS_PAGE} from "./consts";

export type Action = {
    type: string,
    payload: any
}

const getRandom = (min : number, max : number) => {
    return Math.random() * (max - min) + min;
};

export const init = (val : Data) => {
    return{
        type: INIT,
        payload: {
            initUsers: val.participants,
            initDocuments: val.documents,
            currentDocuments: val.documents.slice(0, MAX_DOCUMENTS_PAGE),
            currentUser: val.participants[Math.floor(getRandom(0, val.participants.length - 1))],
            currentPage: 0,
            maxPage: Math.ceil(val.documents.length / MAX_DOCUMENTS_PAGE)
        }
    }
};

export const change_filter = (key: string, value: any) => {
    return{
        type: CHANGE_FILTER_VAL,
        payload: {
            key,
            value
        }
    }
};

export const change_page = (page: number) => {
    window.scrollTo(0,0);
   return{
       type: CHANGE_PAGE,
       payload: {
           page: page-1
       }
   }
};

export const change_filtered_doc = (docs: Document[]) => {
    return{
        type: CHANGE_FILTERED_DOCUMENTS,
        payload: {
            filteredDocuments: docs,
            currentPage: 0,
            maxPage: Math.ceil(docs.length / MAX_DOCUMENTS_PAGE),
            currentDocuments: docs.slice(0, MAX_DOCUMENTS_PAGE),
        }
    }
};

export const loading = (load: boolean) => {
    return{
        type: LOADING,
        payload: {
            load: load
        }
    }
};