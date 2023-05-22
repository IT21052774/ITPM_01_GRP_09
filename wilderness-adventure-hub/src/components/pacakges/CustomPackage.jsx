// src/components/CustomPackage.js
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import config from '../../config';

const validationSchema = Yup.object({
    activities: Yup.array().required('At least one activity is required'),
    foods: Yup.array().required('At least one food is required'),
    room: Yup.string().required('Room is required'),
    safari: Yup.string(),
});

const CustomPackage = () => {
    const [activities, setActivities] = useState([]);
    const [foods, setFoods] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [safaris, setSafaris] = useState([]);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [selectedActivities, setSelectedActivities] = useState([])
    const [selectedFoods, setSelectedFoods] = useState([])
    const [selectedRooms, setSelectedRooms] = useState([])
    const [selectedSafaris, setSelectedSafaris] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/activity-controller').then(res => setActivities(res.data));
        axios.get('http://localhost:8080/food-controller').then(res => setFoods(res.data));
        axios.get('http://localhost:8080/room-controller').then(res => setRooms(res.data));
        axios.get('http://localhost:8080/safari-controller').then(res => setSafaris(res.data));
    }, []);



    const handleChange = (e) => {
        console.log(e.target.value)
    };


    const bookPackage = async (e) => {
        e.preventDefault()
        const data = {
            name, email, selectedActivities, selectedFoods, selectedRooms, selectedSafaris
        }
     
        await axios.post(`${config.baseUrl}/book-controller`, data).then((val) => {
            alert("Your pacakge created");
            setEmail("")
            setName("")
            setSelectedActivities([])
            setSelectedFoods([])
            setSelectedRooms([])
            setSelectedSafaris([])
        }).catch(err => {
            console.log("create package failed " + err)
        })

    }

    const styles = {
        formContainer: {
            width: "80vw",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#040C18',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#81AFDD',
            padding: '20px',
            margin: '32px auto',
            fontFamily: 'var(--font-family)'
        },
        input: {
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            margin: '10px 0',
            color: '#4d8ecf',
            backgroundColor: '#031B34',
        },
        label: {
            alignSelf: 'flex-start',
            margin: '10px 0',
            color: "#a4d3f2b5"
        },
        select: {
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            color: '#81AFDD',
            backgroundColor: '#042c54',
            cursor: 'pointer',
            margin: '10px 0',
        },
    };




    return (
        <>

            <form style={styles.formContainer}>
                <div className="gpt3__blog-heading">
                    <h1 className="gradient__text">Select Your Package</h1>
                </div>
                <label style={styles.label}>Name</label>
                <input
                    style={styles.input}
                    type="text"
                    name="name"

                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <label style={styles.label}>Email</label>
                <input
                    style={styles.input}
                    type="text"
                    name="email"

                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <label style={styles.label}>
                    Activities
                </label>
                <div
                    style={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "start",
                        alignSelf: "flex-start"
                    }}
                >
                  {
                        activities.map((activity, index) =>
                            <label
                                style={{ color: "white", fontSize: 16,margin : "0 16px" }}
                            >
                                {`${activity.name} : `}
                                <input
                                    style={{
                                        marginLeft: "8px"
                                    }}
                                    key={index}
                                    type="checkbox"
                                    name="activity"
                                    value={selectedActivities.includes(activity.name)}
                                    onChange={(e) => {
                                        if (selectedActivities.includes(activity.name)) {
                                            var index = selectedActivities.find((act) => act === activity.name)
                                            if (index !== -1) {
                                                selectedActivities.splice(index, 1)
                                            }
                                        } else {
                                            selectedActivities.push(activity.name)
                                        }
                                    }}
                                />
                            </label>
                        )
                    }
                </div>
                <label style={styles.label}>
                    Foods
                </label>
                <div
                    style={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "start",
                        alignSelf: "flex-start"
                    }}
                >
                    {
                        foods.map((activity, index) =>
                            <label
                                style={{ color: "white", fontSize: 16 }}
                            >
                                {`${activity.name} : `}
                                <input
                                    style={{
                                        marginLeft: "8px"
                                    }}
                                    key={index}
                                    type="checkbox"
                                    name="activity"
                                    value={selectedFoods.includes(activity.name)}
                                    onChange={(e) => {
                                        if (selectedFoods.includes(activity.name)) {
                                            var index = selectedFoods.find((act) => act === activity.name)
                                            if (index !== -1) {
                                                selectedFoods.splice(index, 1)
                                            }
                                        } else {
                                            selectedFoods.push(activity.name)
                                        }
                                    }}
                                />
                            </label>
                        )
                    }
                </div>
                <label style={styles.label}>
                    Room
                </label>
                <div
                    style={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "start",
                        alignSelf: "flex-start"
                    }}
                >
                    {
                        rooms.map((activity, index) =>
                            <label
                                style={{ color: "white", fontSize: 16 }}
                            >
                                {`${activity.name} : `}
                                <input
                                    style={{
                                        marginLeft: "8px"
                                    }}
                                    key={index}
                                    type="checkbox"
                                    name="activity"
                                    value={selectedRooms.includes(activity.name)}
                                    onChange={(e) => {
                                        if (selectedRooms.includes(activity.name)) {
                                            var index = selectedRooms.find((act) => act === activity.name)
                                            if (index !== -1) {
                                                selectedRooms.splice(index, 1)
                                            }
                                        } else {
                                            selectedRooms.push(activity.name)
                                        }
                                    }}

                                />
                            </label>
                        )
                    }
                </div>
                <label style={styles.label}>Options
                    Safari
                </label>
                <div
                    style={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "start",
                        alignSelf: "flex-start"
                    }}
                >
                    {
                        safaris.map((activity, index) =>
                            <label
                                style={{ color: "white", fontSize: 16 }}
                            >
                                {`${activity.name} : `}
                                <input
                                    style={{
                                        marginLeft: "8px"
                                    }}
                                    key={index}
                                    type="checkbox"
                                    name="activity"
                                    onChange={(e) => {
                                        if (selectedSafaris.includes(activity.name)) {
                                            var index = selectedSafaris.find((act) => act === activity.name)
                                            if (index !== -1) {
                                                selectedSafaris.splice(index, 1)
                                            }
                                        } else {
                                            selectedSafaris.push(activity.name)
                                        }
                                    }}

                                />
                            </label>
                        )
                    }
                </div>
                <button
                    style={{
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        color: '#81AFDD',
                        backgroundColor: '#042c54',
                        cursor: 'pointer',
                        margin: '10px 0',
                    }}

                    onClick={(e) => {
                        bookPackage(e)
                    }}
                >Book My Pacakge</button>
            </form>
        </>
    );
};

export default CustomPackage