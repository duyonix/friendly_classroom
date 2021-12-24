import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

export const actFetchSubmission = (homeworkId, studentId) => {
    
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;
    return (dispatch) => {
        dispatch(actSubmissionRequest());
        axios({
            url: pathAPI + "submission/getSubmission",
            method: "POST",
            data: { homeworkId, studentId },
            headers: {
                "Authorization": "Bearer " + accessToken,
                
            },
        })
            .then((res) => {

                dispatch(actSubmissionSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actSubmissionFailed(err));
            })
    }
}

export const resetSubmission = () => {
    return (dispatch) => {
        dispatch(actSubmissionReset());
    }
}

export const actSubmissionRequest = () => {
    return {
        type: actionTypes.SUBMISSION_REQUEST,
    }
}

export const actSubmissionReset = () => {
    return {
        type: actionTypes.SUBMISSION_RESET,
    }
}

export const actSubmissionSuccess = (data) => {
    return {
        type: actionTypes.SUBMISSION_SUCCESS,
        payload: data
    }
}
export const actSubmissionFailed = (err) => {
    return {
        type: actionTypes.SUBMISSION_FAILED,
        payload: err
    }
}






export const actSubmitHomework = (file, homeworkId) => {
    let formData = new FormData();    
    formData.append("file",file);
    
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;
    return (dispatch) => {
        dispatch(actSubmitHomeworkRequest());
        axios({
            url: pathAPI + "submission/submitSubmission",
            method: "POST",
            data: { file, homeworkId },
            headers: {
                "Authorization": "Bearer " + accessToken,
                "content-type": "multipart/form-data"
            },
        })
            .then((res) => {

                dispatch(actSubmitHomeworkSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actSubmitHomeworkFailed(err));
            })
    }
}

export const resetSubmitHomework = () => {
    return (dispatch) => {
        dispatch(actSubmitHomeworkReset());
    }
}

export const actSubmitHomeworkRequest = () => {
    return {
        type: actionTypes.SUBMIT_HOMEWORK_REQUEST,
    }
}

export const actSubmitHomeworkReset = () => {
    return {
        type: actionTypes.SUBMIT_HOMEWORK_RESET,
    }
}

export const actSubmitHomeworkSuccess = (data) => {
    return {
        type: actionTypes.SUBMIT_HOMEWORK_SUCCESS,
        payload: data
    }
}
export const actSubmitHomeworkFailed = (err) => {
    return {
        type: actionTypes.SUBMIT_HOMEWORK_FAILED,
        payload: err
    }
}