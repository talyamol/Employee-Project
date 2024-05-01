import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const DeleteEmployee = () => {
    const location = useLocation();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const naving = useNavigate();


    useEffect(() => {
        if (location.state && location.state.item) {
            setEmployee(location.state.item);
        }
    }, [location]);

    useEffect(() => {
        if (employee) {
            Swal.fire({
                title: ' Delete',
                text: `Are you interested in having the ${employee.firstName} ${employee.lastName}   employee deleted from the list?`,
                icon: 'info',
                confirmButtonText: 'Ok', 
                showCancelButton: true,
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    axios.delete(`https://localhost:7230/api/Employee/${employee?.id}`)
                        .then((res) => {

                            naving("/employees")
                        })
                        .catch((err) => {
                            console.error(err);
                            alert("Error: Something went wrong");
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    naving("/employees")
                }
            });
        }
    }, [employee]);

    return null; // או כל תוכן אחר שתרצה להציג
};

export default DeleteEmployee;
