import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import { FormHelperText } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { FormControl } from '@mui/material';

import './style.css';
const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    tz: yup.string().required().matches(/^\d{9}$/),
    // position: yup.string().required(),
    gender: yup.number().required(),
    dateBorn: yup.date().required(),
    startDate: yup.date().required(),
    // dateEntry: yup.date().required(),
    // management: yup.number().oneOf([0, 1]).required(),
});
const EditEmployee = ({ item }) => {
    const naving = useNavigate();
    const [allRoles, setAllRoles] = useState([])
    const [rolesNotInEmployee, setRolesOnEmployee] = useState([])



    const { register, handleSubmit, watch, control, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: item || {}
    });

    const watcRole = watch(['employeePosition']);

    const { fields, append, remove } = useFieldArray({
        control: control,
        name: "employeePosition"
    });

    useEffect(() => {
        position1();
    }, [item]);


    useEffect(() => {
        const data = watcRole[0];
        if (JSON.stringify(data) != JSON.stringify(rolesNotInEmployee)) {
            setRolesOnEmployee(data)
        }
    }, [watcRole])

    const position1 = () => {
        axios.get("https://localhost:7230/api/Position")
            .then((res) => {
                setAllRoles(res.data)
            })
            .catch((err) => console.error(err))
            .finally();

    }

    const parseDate = (date) => {
        if (date) {
            const parsedDate = new Date(date);
            const year = parsedDate.getFullYear();
            const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
            const day = String(parsedDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return '';
    };

    const onSubmit = data => {
        console.log(data);
        if (item) {
            axios.put(`https://localhost:7230/api/Employee/${item.tz}`, data)
                .then((response) => {
                    console.log(response);
                    naving("/employees")
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // let e = employees.filter(x => x.tz == data.tz)
            // if (e == null) {
            axios.post(`https://localhost:7230/api/Employee/`, data)
                .then((response) => {
                    console.log(response);
                    naving("/employees")
                    window.location.reload();

                })
                .catch((error) => {
                    console.error(error);
                });
            //}
            // else
            // alert("This employee exists")
        }
    };

    console.log(errors)
    return (

        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <TextField
                label="First Name"
                className='field'
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
            />
            <TextField
                label="Last Name"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
            />
            <TextField
                label="Employee Id"
                value={item?.tz}
                {...register("tz")}
                helperText={errors.tz ? errors.tz.message : ""}
            />
            <TextField
                {...register("startDate")}
                type="datetime"
                defaultValue={item?.startDate}
                label="Date start "
            //  error={!!errors.startDate}
            //helperText={errors.startDate && errors.startDate.message}
            />

            <TextField
                {...register("dateBorn")}
                type='datetime'
                label="Date Born"
                defaultValue={item?.dateBorn}
            />
            {errors.dateBorn && <p>{errors.dateBorn.message}</p>}

            <Select
                labelId="gender"
                id="gender"
                defaultValue={item?.gender !== undefined ? (item.gender === 0 ? "female" : "male") : "Gender"}
                {...register("gender")}
            >
                <MenuItem value="1">Male</MenuItem>
                <MenuItem value="0">Female</MenuItem>
            </Select>

            <Button
                type="button"
                onClick={() => append({})} >
                Add Role
            </Button>
            {fields?.map((field, index) => (

                <Paper key={field.id} elevation={1} style={{ padding: "10px", margin: "10px 0" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id={`roleNameLabel_${index}`}>Role Name</InputLabel>
                                {/* render={({ field }) => ( */}
                                <Select {...field}
                                    labelId={`roleNameLabel_${index}`}
                                    id={`roleName_${index}`}
                                    error={!!errors?.employeePosition?.[index]?.positionId}
                                    defaultValue={item?.employeePosition?.[index]?.positionId}
                                    {...register(`employeePosition.${index}.positionId`)}>
                                    {allRoles
                                        // .filter(role => !fields.some(field => field.positionId === role.id))
                                        .map(r => (
                                            <MenuItem key={r.name} value={r.id} disabled={rolesNotInEmployee.some(x => x['positionId'] == r.id)}>{r.name}</MenuItem>

                                            // <MenuItem key={role.positionId} value={role.id}>
                                            //     {role.name}
                                            // </MenuItem>
                                        ))
                                    }
                                </Select>
                                {/* )}  */}


                                    < FormHelperText > { errors?.employeePosition?.[index]?.positionId?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id={`isManagement_${index}`}
                                    {...register(`employeePosition.${index}.management`)}
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
                            label="Start Date" type='datetime'
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
    ))
}

<Button type="submit" >Submit</Button>
        </form >
    );



};

export default EditEmployee;
