import React from 'react';
import './Document.scss';
import {Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {Document, DocumentParticipant} from "../../data";
import CreateIcon from '@material-ui/icons/Create';

interface DocumentProps {
    document: Document
}

const DocumentItem : React.FC<DocumentProps> = ({document : {title, signedDate, participants}}) => {

    return(
        <div className="document">
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {title}
                    </Typography>
                    {signedDate !== null &&
                    <Typography color="textSecondary">
                        Date of signing: {signedDate.toLocaleString()}
                    </Typography>
                    }
                    <List>
                    {participants.map((val : DocumentParticipant) => {
                        return(
                            <ListItem key={val.id} selected={val.signedDate !== null}>
                                {val.signedDate !== null &&
                                    <ListItemIcon>
                                        <CreateIcon />
                                    </ListItemIcon>
                                }
                                <ListItemText primary={val.firstname+' '+val.lastname} />
                            </ListItem>
                        );
                    })}
                    </List>
                </CardContent>
            </Card>
        </div>
    );
};

export default DocumentItem;