import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from 'date-fns';
import axios from 'axios';
// import { faMale } from "@fortawesome/free-solid-svg-icons";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import { FormHelperText } from '@mui/material';
import { parseDate } from 'date-fns';
import EventIcon from '@mui/icons-material/Event';
import AddPositionToEmployee from './addPositionToEmployee';

const FormEmployee = ({ item, setItem }) => {


    // const schema = yup.object({
    //     firstName: yup.string().required(),
    //     lastName: yup.string().required(),
    //     tz: yup.string().required().matches(/^\d{9}$/),
    //     position: yup.string().required(),
    //     gender: yup.number(1).oneOf([0, 1]).required(),
    //     dateBorn: yup.date().required(),
    //     startDate: yup.date().required(),
    //     dateEntry: yup.date().required(),
    //     management: yup.number().oneOf([0, 1]).required(),
    // })

    const [errors, setErrors] = useState({})
    const [addRole, setAddRole] = useState(false)
    const [allRoles, setAllRoles] = useState([])
    const [addRoles, setAddRoles] = useState([])

    const position = () => {
        // try {

        //     const {data} =  await axios.get("https://localhost:7230/api/Position")
        //     console.log("roles", data);
        //     setAllRoles(data)
        //     item?.employeePosition.map((position) => {
        //         filterPosition(position.positionId)
        //     })
        // } catch (error) {
        //     console.log(error);
        // }

        axios.get("https://localhost:7230/api/Position").then((res) => {
            setAllRoles(res.data);

            console.log(res.data)
        })
            .catch((err) => console.error(err)).finally();
    }

    const filterPosition = (id) => {
        const roles = allRoles.filter(role => role.id !== id)
        setAllRoles(roles)
    }

    useEffect(() => {
        position()
    }, [])

    useEffect(() => {
        item?.employeePosition?.map((position) => {
            filterPosition(position.positionId)
        })
    }, [addRole])


    // const handleAddRole = (e) => {
    //     setItem({...item, employeePosition: [...item?.employeePosition, {dateEntry: new Date(), management: false, positionId: +e.target.value}]})
    //     filterPosition(+e.target.value)
    // }


    console.log(allRoles);

    console.log(item);

    const onSubmit = data => {
        console.log("data", data)
        console.log(data.gender)
        if (item) {
            console.log("id", item)
            axios.put(`https://localhost:7230/api/Employee/${item.tz}`, item)
                .then((response) => {
                    console.log(response)
                    //  dispatch({ type: "UPDATE_EMPLOYEE", data: response.data });
                })
                .catch((error) => {
                    console.error(error);
                });

        }
        else {
            axios.post(`https://localhost:7230/api/Employee/`, item)
                .then((response) => {
                    console.log(response)
                    // dispatch({ type: "ADD_EMPLOYEE", data: response.data });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };



    return (
        <form onSubmit={onSubmit} className="form">
            {/* <TextField
            id="date"
            label="Date"
            type="date"
            {...register("startDate", { required: "Date is required" })}
            InputLabelProps={{
                shrink: true,
            }}
        /> */}

            <TextField
                label="First Name" className='field'
                defaultValue={item?.firstName}
                // error={!!errors.firstName}
                // helperText={errors?.firstName ? errors.firstName.message : ""}
                onChange={e => setItem({ ...item, firstName: e.target.value })}
            />
            <TextField
                label="Last Name"
                defaultValue={item?.lastName}
                // error={!!errors.lastName}
                // helperText={errors.lastName ? errors.lastName.message : ""}
                onChange={e => setItem({ ...item, lastName: e.target.value })}
           
            />
            <TextField
                label="Employee Id"
                value={item?.tz}
                // helperText={errors.tz ? errors.tz.message : ""}
                onChange={e => setItem({ ...item, tz: e.target.value })}
            
            />
            <TextField
                type="date"
                // value={item?.startDate}
                value={item?.startDate ? item.startDate.split("T")[0] : ""}
                // error={!!errors.startDate}
                // helperText={errors.startDate && errors.startDate.message}
                onChange={e => setItem({ ...item, startDate: e.target.value })}
          
            />

            <TextField
                type='date'
                label="Date Born"
                value={item?.dateBorn ? item.dateBorn.split("T")[0] : ""}
                onChange={e => setItem({ ...item, dateBorn: e.target.value })}
            />
            {/* {errors.dateBorn && <p>{errors.dateBorn.message}</p>} */}


            <Select
                labelId="gender"
                id="gender"
                defaultValue={item?.gender !== undefined ? (item.gender === 0 ? "male" : "female") : ""}
                // {...register("gender")}
                onChange={e => setItem({ ...item, gender: e.target.value })}
            >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
            </Select>

            <AddPositionToEmployee />
            <Button onClick={() => setAddRole(!addRole)}>
                Add Role
            </Button>
            {addRole &&
            <Fragment>
                 {/* onChange={handleAddRole} */}
                <Select>
                    {allRoles?.map((role) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </Select>
               
            <TextField
                type='date'
                label="Date Born"
                value={item?.dateBorn ? item.dateBorn.split("T")[0] : ""}
                onChange={e => setItem({ ...item, dateBorn: e.target.value })}
            />
            {/* {errors.dateBorn && <p>{errors.dateBorn.message}</p>} */}

                m<input></input>
                <button>add</button>
                </Fragment>
            }

            <Button type="submit" >Submit</Button>
        </form >
    )
}

export default FormEmployee