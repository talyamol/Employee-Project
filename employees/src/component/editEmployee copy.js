
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

import './style.css'


const EditEmployee = ({ item }) => {

    // console.log("itemmmmm", item);

    const location = useLocation();
    const naving = useNavigate();
    const [positions, setPosition] = useState([]);
    const [dateBorn, setDateBorn] = useState();





    const schema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        tz: yup.string().required().matches(/^\d{9}$/),
        position: yup.string().required(),
        gender: yup.number(1).oneOf([0, 1]).required(),
        dateBorn: yup.date().required(),
        startDate: yup.date().required(),
        dateEntry: yup.date().required(),
        management: yup.number().oneOf([0, 1]).required(),
        //employeePosition: yup.array().of(
        //     yup.object().shape({
        //         positionId: yup.string().required(),
        //         dateEntry: yup.date().required(),
        //         management: yup.boolean().required()
        //     })
        // )
    });

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        values: item ? item : {}
    });

    

    // const { fields: PositionFields, append: appendPosition, remove: removePosition } = useFieldArray({
    //     control,
    //     Name: "employeePosition"
    // });
    const { fields, append, remove } = useFieldArray({
        control: control,
        name: "employeePosition"
    });

    //const positionsDefault = [{ positionId: '' || item?.employeePosition?.positionId, dateEntry: '' || item?.employeePosition?.dateEntry, management: '' || item?.employeePosition?.management }];
    useEffect(() => {
        position1()
        // if (item) {
        //     const { FirstName, LastName, tz, employeePosition, gender, dateBorn, startDate, dateEntry } = item
            setValue('firstName', item?.firstName || '');
            setValue('lastName', item?.lastName || '');
            setValue('tz', item?.tz || '');
            // setValue('position', item?.employeePosition.name || '');
            // setValue('gender', faMale || '');
        setValue('startDate', item?.startDate || '');
        console.log(item.startDate);
        setValue('dateBorn', item?.dateBorn || '');
        setDateBorn(item.dateBorn)
        //     setValue('management', item?.management || '');
        //     //  setValue('employeePosition[0].dateEntry', item?.employeePosition?.dateEntry || '');


        //     employeePosition.forEach((position, index) => {
        //         setValue(`employeePosition.${index}.positionId`, position.positionId);
        //         setValue(`employeePosition.${index}.dateEntry`, position.dateEntry);
        //         setValue(`employeePosition.${index}.management`, position.management);
        //         if (index === employeePosition.length - 1) appendPosition();
        //     });
        // }
        // console.log(item.employeePosition)
        // positionsDefault.forEach((item, index) => {
        //     setValue(`employeePosition[${index}].positionId`, item.positionId);
        //     setValue(`employeePosition[${index}].dateEntry`, item.dateEntry);
        //     setValue(`employeePosition[${index}].management`, item.management);
        // });
        //}
    }, [item]);

    const position1 = () => {
        axios.get("https://localhost:7230/api/Position").then((res) => {
            setPosition(res.data);

            //  console.log(res.data)
        })
            .catch((err) => console.error(err)).finally();
    }

    const handleInputChange = () => {

    }


    const parseDate = (date) => {
        console.log(date);
        if (date) {
            const parsedDate = new Date(date);
            const year = parsedDate.getFullYear();
            const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
            const day = String(parsedDate.getDate()).padStart(2, '0');
            console.log(`${year}-${month}-${day}`)
            return `${year}-${month}-${day}`;
        }
        return '';
    };
    const onSubmit = data => {
        console.log("data", data)
        console.log(data.gender)
        if (item) {
            console.log("id", item.id)
            axios.put(`https://localhost:7230/api/Employee/${item.tz}`, data)
                .then((response) => {
                    console.log(response)
                    //  dispatch({ type: "UPDATE_EMPLOYEE", data: response.data });
                })
                .catch((error) => {
                    console.error(error);
                });

        }
        else {
            axios.post(`https://localhost:7230/api/Employee/`, data)
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

        <form onSubmit={handleSubmit(onSubmit)} className="form">

            <TextField
                label="First Name" className='field'
                {...register("firstName")}
                defaultValue={item?.firstName}
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
                onChange={(e) => setValue('firstName', e.target.value)}
            // onChange={e => setEmployee({...employee, firstName: e.target.value})}
            />
            <TextField
                label="Last Name"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
                onChange={(e) => setValue('lastName', e.target.value)}
            // onChange={e => setEmployee({...employee, lastName: e.target.value})}
            />
            <TextField
                label="Employee Id"
                value={item?.tz}
                {...register("tz")}
                helperText={errors.tz ? errors.tz.message : ""}
                onChange={(e) => setValue('tz', e.target.value)}
            // onChange={e => setEmployee({...employee, tz: e.target.value})} 
            />
            <TextField
                {...register("startDate")}
                type="date"
                value={parseDate(item?.startDate)}
                error={!!errors.startDate}
                helperText={errors.startDate && errors.startDate.message}
                onChange={(e) => setValue('startDate', e.target.value)}
           
            />

            <TextField
                type='date'
                label="Date Born"
                {...register("dateBorn")}
                value={item?.dateBorn ? item.dateBorn.split("T")[0] : ""}
              //  onChange={(e) => setValue('dateBorn', e.target.value)}
           
            />
            {errors.dateBorn && <p>{errors.dateBorn.message}</p>}


            <Select
                labelId="gender"
                id="gender"
                defaultValue={item?.gender !== undefined ? (item.gender === 0 ? "male" : "female") : ""}
                {...register("gender")}
            >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
            </Select>

            {/* <label>Management</label>
            <input
                type="checkbox"
                {...register(`employeePosition[0].management`, { valueAsNumber: true })}
                onChange={(e) => setValue(`employeePosition[0].management`, e.target.checked ? 1 : 0)}/>
            
            <Select
                labelId="position-select-label"
                id="position-select"
                label="Position"
                onChange={(e) => setValue('employeePosition[0].positionId', e.target.value)}
                {...register(`employeePosition[0].positionId`)}>
                {positions?.map(p => (
                        <MenuItem key={p?.id} value={p?.id}>{p?.name}</MenuItem>))}
            </Select> */}

            {/* {fields?.map((field, index) => (
                <div key={field.positionId}>
                    <Select label="Position">
                        <InputLabel id="position-select-label">Position</InputLabel>
                        {positions.map(position => {
                            const isInEmployeePositions = item?.employeePosition.some(pos => pos.positionId === position.id);
                            return !isInEmployeePositions && (
                                <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>);
                        })}
                    </Select>
                    <TextField type="datetime-local"
                    //onChange={(e) => { setValue(`employeePosition[${index}].dateEntry`, e.target.value); }} {...register(`employeePosition[${index}].dateEntry`)}
                    />  <Checkbox
                        defaultChecked={field.management === 1}
                        onChange={(e) => setValue(`employeePosition[${index}].management`, e.target.checked ? 1 : 0)}
                    />
                    <Button type="button" onClick={() => remove(index)}>Remove</Button>
                </div>
            ))} */}


            {/* {item?.employeePosition?.map((field, index) => (
                <Box key={index}>
                    <Select
                        label="Position"
                        defaultValue={field.positionId}
                        onChange={(e) => setValue(`employeePosition[${index}].positionId`, e.target.value)}
                        {...register(`employeePosition[${index}].positionId`)}
                    >
                        <InputLabel id="position-select-label">Position</InputLabel>
                        {positions.map(position => (
                            <MenuItem key={index} value={position.id}>{position.name}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        type="datetime-local"
                        // defaultValue={field.dateEntry}
                        {...register(`employeePosition[${index}].dateEntry`)}
                        onChange={(e) => setValue(`employeePosition[${index}].dateEntry`, e.target.value)}
                    />
                    <Checkbox
                        size="small"
                        checked={!!field.management}
                        onChange={(e) => setValue(`employeePosition[${index}].management`, e.target.checked)}
                    />
                    <Grid item xs={12}>
                        <Button type="button" onClick={() => remove(index)}>
                            Remove
                        </Button></Grid>
                </Box>
            ))}
            <Button
                type="button"
                onClick={() => {
                    append({});
                }}>
                Add Role
            </Button> */}
            <Button
                type="button"
                onClick={() => {
                    append({});
                }}
            >
                Add Role
            </Button>
            {fields?.map((field, index) => (

                <Paper key={field.id} elevation={1} style={{ padding: "10px", margin: "10px 0" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id={`roleNameLabel_${index}`}>Role Name</InputLabel>
                                
                                <Select
                                    labelId={`roleNameLabel_${index}`}
                                    id={`roleName_${index}`}
                                    error={!!errors?.employeePosition?.[index]?.positionId}
                                    defaultValue={item?.employeePosition?.[index]?.positionId}
                                    {...register(`employeePosition.${index}.positionId`)}

                                >
                                    {positions.map(role => (
                                        <MenuItem key={role.positionId} value={role.id}>
                                            {role.name}                          </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors?.employeePosition?.[index]?.positionId?.message}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={`isManagement_${index}`}
                                        {...register(`e.${index}.management`)}
                                        defaultChecked={item?.employeePosition?.[index]?.management}
                                    />
                                }
                                label="Is Manager"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!!errors?.employeePosition?.[index]?.dateEntry}
                                id={`startDate_${index}`}
                                label="Start Date" type='datetime-local'
                                helperText={errors?.employeePosition?.[index]?.dateEntry?.message}
                                defaultValue={item?.employeePosition?.[index]?.dateEntry}
                                {...register(`employeePosition.${index}.dateEntry`)}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <EventIcon color="action" />
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="button" onClick={() => remove(index)}>
                                Remove
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            <Button type="submit" >Submit</Button>
        </form >
    );




    {/* <Button type="button" onClick={() => appendPosition()}>Add Position </Button> */ }
};

export default EditEmployee;


