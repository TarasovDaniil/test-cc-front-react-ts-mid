import React, {useEffect, useState} from "react";
import {Document, DocumentParticipant, getFakeData} from "./data";
import "./styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import './filter/filter';
import CurrentUser from "./components/CurrentUser/CurrentUser";
import {useDispatch, useSelector} from "react-redux";
import {change_filter, change_filtered_doc, change_page, init, loading} from "./store/actions";
import Container from "@material-ui/core/Container";
import Input from "./components/Input/Input";
import {FilterState, IRootState} from "./store/reducer";
import ListDocuments from "./components/ListDocuments/ListDocuments";
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import Switch from "./components/Switch/Switch";
import {Pagination} from '@material-ui/lab';
import Filter from "./filter/filter";
import {FilterOperator} from "./filter/types";
import CircularProgress from "@material-ui/core/CircularProgress";

export const App : React.FC = () => {
  
  const listDocument = useSelector<IRootState, Document[]>(state => state.currentDocuments);
  const listUsers = useSelector<IRootState, DocumentParticipant[]>(state => state.initUsers);
  const maxPages = useSelector<IRootState, number>(state => state.maxPage);
  const page = useSelector<IRootState, number>(state => state.currentPage);
  const filter = useSelector<IRootState, FilterState>(state => state.filter);
  const initDocs = useSelector<IRootState, Document[]>(state => state.initDocuments);
  const load = useSelector<IRootState, boolean>(state => state.loading);
  const user = useSelector<IRootState, DocumentParticipant>(state => state.currentUser);

  const dispatch = useDispatch();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const matches = (dataVal: any, searchVal: any) => {
    if(searchVal instanceof Array){
      if(searchVal.length === 0 || searchVal[0] === ''){
        return true;
      }
      return searchVal.reduce((accum, value) => {
        if(value !== '') {
          return dataVal.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1 || accum;
        }
        return accum;
      }, false);
    }
    return false;
  };

  const matchesUser = (dataVal: any, searchVal: any, object : Map<string, any>) => {
    if(object.has('firstname')){
      return dataVal === searchVal;
    }
    return false;
  };

  const matchesParticipant = (dataVal: any, searchVal: any, object : Map<string, any>) => {
    if(object.has('firstname')){
      return object.get('id') === searchVal && object.get('signedDate') !== null;
    }
    return false;
  };

  const clear = () => {
    if(timer !== null) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getFakeData();
      dispatch(init(response));
      console.log(response);
    })();
  }, []);

  useEffect(() => {
    if(initDocs.length === 0){
      return;
    }
    clear();

    dispatch(loading(true));

    setTimer(setTimeout(async () => {
      let filterObj = new Filter<Document>().setData(initDocs);
      if(filter.isAllDocuments) {
        filterObj.buildFilter(FilterOperator.OR, [
              {key: 'firstname', search: filter.search.split(' '), rule: matches},
              {key: 'lastname', search: filter.search.split(' '), rule: matches},
              {key: 'title', search: filter.search.split(' '), rule: matches}
            ]);
      }else{
        filterObj.buildFilter(FilterOperator.AND, [
              {key: 'id', search: user.id, rule: matchesUser}
            ]).buildFilter(FilterOperator.OR, [
              {key: 'firstname', search: filter.search.split(' '), rule: matches},
              {key: 'lastname', search: filter.search.split(' '), rule: matches},
              {key: 'title', search: filter.search.split(' '), rule: matches}
            ]);
      }

      if(filter.participant !== null){
        filterObj.buildFilter(FilterOperator.AND, [
          {key: 'signedDate', search: filter.participant.id, rule: matchesParticipant}
        ]);
      }

      dispatch(change_filtered_doc(filterObj.get()));
      dispatch(loading(false));
    }, 1500));

    return () => {
      clear();
      dispatch(loading(false));
    }
  }, [filter]);


  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let user = listUsers.filter((val : DocumentParticipant) => val.id === event.target.value);
    dispatch(change_filter('participant', user[0] || null));
  };

  return <Container maxWidth="md">
      <CurrentUser/>
      <Input value={filter.search} onChange={(val : any) => dispatch(change_filter('search', val.target.value))}/>

      <div className="area-list">
        <div className="area-filter">
          <FormControl >
            <InputLabel id="demo-customized-select-label">Signed</InputLabel>
            <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={filter.participant !== null ? filter.participant.id : ''}
                onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {listUsers !== null && listUsers.map((val : DocumentParticipant) =>{
                return(<MenuItem value={val.id} key={val.id}>{val.firstname+' '+val.lastname}</MenuItem>)
              })}
            </Select>
          </FormControl>
          <Switch left={"All"} right={"By me"} value={filter.isAllDocuments} onChange={(val) => dispatch(change_filter('isAllDocuments', val))}/>
        </div>
        { load ?
            <div className="area-progress">
              <CircularProgress size={80}/>
            </div> : listDocument.length > 0 ?
          <ListDocuments documents={listDocument}/> :
                <div className="area-progress">
                  <Typography variant="h3">
                    Nothing found
                  </Typography>
                </div>
        }
      </div>
    <div className="area-fixed">
      <Container maxWidth="md">
        <Pagination count={maxPages} variant="outlined" shape="rounded" page={page+1} onChange={(event: object, page: number) => dispatch(change_page(page))}/>
      </Container>
    </div>
  </Container>;
};
