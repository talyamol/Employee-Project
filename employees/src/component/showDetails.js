import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';




const ShowDetails = ({item}) => {

    const [employee, setEmployee] = useState(null);
    const location = useLocation();
    const [positions, setPosition] = useState([]);
    const naving = useNavigate();
   

    useEffect(() => {
        if (item) {
            //console.log(item)
            setEmployee(item);
        }

        axios.get("https://localhost:7230/api/Position").then((res) => {
            setPosition(res.data);
            console.log(res.data)
        })
        .catch((err) => console.error(err)).finally();

         

    }, []);
    const gender = (gender) => {
        if (gender == 0)
            return "female"
        else
            return "male"
    }
    const position = (position) => {
        // console.log(position)
        let p = positions.find(x => x.id === position)
        console.log(p)
        return p?.name;
    }

    return (
        <Fragment>
            {employee && (
                <div className='employee'>
                    <h2>{employee?.firstName} {employee.lastName}</h2>
                    <p>ID: {employee?.tz}</p>
                    <p>Date of start: {format(new Date(employee?.startDate), 'dd/MM/yyyy')}</p>
                    <p>Date of born: {format(new Date(employee?.dateBorn), 'dd/MM/yyyy')}</p>
                    <p>Gender: {gender(employee?.gender)}</p>
                    {employee?.employeePosition?.map(p =>
                    (
                        <div className='position' key={p?.positionId}>
                            <h6>Position name: {position(p?.positionId)}</h6>
                            <p>Date entry of position: {format(new Date(p.dateEntry), 'dd/MM/yyyy')}</p>
                        </div>
                    ))}



                </div>
            )}
        </Fragment>
    );





};
export default ShowDetails;