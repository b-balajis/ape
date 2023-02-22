import { useEffect } from 'react'
import useHttp from "../hooks/use-http";
// import { renderSubjects, renderPresentSem } from "../../api";

const Apicalling = (props) => {
    const api = props.api;
    const payload= props.payload
    const { sendRequest, status, data: loadedData, error } = useHttp(api, true);
    
    useEffect(() => {
        sendRequest(payload)
    }, [sendRequest, payload])

    console.log(status, loadedData, error);

    const Output = [status, error];

    console.log(Output);
    return status;
}

export default Apicalling;
