import { useEffect } from 'react'
import useHttp from "../hooks/use-http";
import { useDispatch } from 'react-redux';
import * as appactions from "../store/modules/app/slices/app.slice"
// import { renderSubjects, renderPresentSem } from "../../api";

const Apicalling = (props) => {
    const dispatch = useDispatch();
    console.log(props);
    const api = props.api;
    const payload= props.payload
    const { sendRequest, status, data: loadedData, error } = useHttp(api, true);


    useEffect(() =>(
        sendRequest(payload)
    ), [status])

    console.log(status, loadedData, error);

    const Output = [status, loadedData, error];
     let cout = 0
    if (status === "completed"){
        console.log("yes");
        cout = cout + 1;
        console.log(cout);
        dispatch(appactions.apiresponse(Output))
    }

    console.log(Output);
    // return status;
}

export default Apicalling;
