import axios from "axios"
import config from "../config"

const fetchActivitys = async (dispatch) => {
    dispatch({
        type: "LOADING",
        payload: true,
    })
    await axios.get(`${config.baseUrl}/activity-controller`).then((data) => {
        dispatch({
            type: "SET_ACTIVITYS",
            payload: data.data
        })
    })
    dispatch({
        type: "LOADING",
        payload: false,
    })
}

const addActivity = async (data, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.post(`${config.baseUrl}/activity-controller`, data)
        .then((value) => {
            dispatch({
                type: "SET_ACTIVITY",
                payload: value,
            })
        })
        .catch(Error => {
            dispatch({
                type: "ERROR",
                payload: Error,
            })
        })
    dispatch({
        type: "LOADING",
        payload: true,
    })
}


const updateActivity = async (id, data, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.put(`${config.baseUrl}/activity-controller/${id}`, data)
    await fetchActivitys(dispatch)
        .catch(err => {
            dispatch({
                type: "ERROR",
                payload: err,
            })
        })
    dispatch({
        type: "LOADING",
        payload: true,
    })
}

const deleteActivity = async (id, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.delete(`${config.baseUrl}/activity-controller/${id}`).then((val) => {
        dispatch({
            type: "DELETE_ACTIVITY",
            payload: id,
        })
    })
        .catch(err => {
            dispatch({
                type: "ERROR",
                payload: err,
            })
        })
    dispatch({
        type: "LOADING",
        payload: true,
    })
}


export default { fetchActivitys, updateActivity, addActivity, deleteActivity }