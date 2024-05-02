import Swal from 'sweetalert2';
import axios from "axios";
import { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';




const AddPosition = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const schema = yup.object({
        name: yup.string().required(),
        management: yup.boolean().required()
    });

    const onSubmit = (data) => {
        // Convert "management" field to boolean
        data.management = JSON.parse(data.management);
    
        console.log("Data sent to server:", data);
        axios.post("https://localhost:7230/api/Position", JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response);
                
                // במקום ה-alert:
                Swal.fire({
                    icon: 'success',
                  title: 'Success',
                  text: 'The position was successfully added',
                });
                
            })
            .catch((error) => {
                console.error(error);
                alert("Error occurred. Please try again later.");
            });
    };
    
    

    useEffect(() => {
        register("name");
        register("management");
    }, [register]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <TextField type="text" {...register("name")} label="Position" />
                {errors.name && <p>{errors.name.message}</p>}

                {/* <label>Management</label>
                <Select {...register("management")}>
                    <MenuItem value="true">True</MenuItem>
                    <MenuItem value="false">False</MenuItem>
                </Select> */}
                {/* {errors.management && <p>{errors.management.message}</p>} */}

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default AddPosition;
