import React from 'react';
import DocumentItem from "../Document/Document";
import './ListDocuments.scss';
import {Document} from "../../data";

interface ListDocumentsProps {
    documents: Document[]
}

const ListDocuments : React.FC<ListDocumentsProps> = ({documents}) => {

    return(
        <div className="list-document">
            {documents.map((val : Document) => {
                return(
                    <DocumentItem document={val} key={val.id}/>
                );
            })}
        </div>
    );
};

export default ListDocuments;