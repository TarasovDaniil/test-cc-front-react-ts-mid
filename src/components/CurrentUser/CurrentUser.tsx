import React from 'react';
import {useSelector} from "react-redux";
import {IRootState} from "../../store/reducer";
import PersonIcon from '@material-ui/icons/Person';
import {DocumentParticipant} from "../../data";
import './CurrentUser.scss';
import Chip from '@material-ui/core/Chip';

const CurrentUser : React.FC = () => {

    const user = useSelector<IRootState, DocumentParticipant>(state => state.currentUser);

    return(
        <div className="current-user">
            { user !== null &&
                <div className="area-user">
                    <Chip label={user.firstname + ' ' + user.lastname} variant="outlined" avatar={<PersonIcon />}/>
                </div>
            }
        </div>
    );
};

export default CurrentUser;