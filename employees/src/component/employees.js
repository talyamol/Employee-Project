import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Drawer from '@mui/material/Drawer';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import EditEmployee from "./editEmployee";
import DeleteEmployee from "./deleteEmployee";
import ShowDetails from "./showDetails";
import './style.css';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const naving = useNavigate();

    useEffect(() => {
        axios.get("https://localhost:7230/api/Employee")
            .then((res) => {
                setEmployees(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmployees = employees.filter(item => {
        return Object.values(item).some(value =>
            (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (value instanceof Date && value.toLocaleDateString().includes(searchTerm))
        );
    });

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleScrollNext = () => {
        setPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredEmployees.length / rowsPerPage) - 1));
    };

    const handleScrollPrev = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const exportToExcel = () => {
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'employees';
        const displayedColumns = ['firstName', 'lastName', 'tz', 'startDate'];

        const exportData = employees.map(item => {
            const exportItem = {};
            displayedColumns.forEach(column => {
                exportItem[column] = item[column];
            });
            return exportItem;
        });

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName + fileExtension);
        document.body.appendChild(link);
        link.click();
    };

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState({});
    const [openDetailDialog, setOpenDetailDialog] = useState({});
    const [editEmployee, setEditEmployee] = useState({})

    const handleClickOpenEditDialog = (index) => {
        setOpenEditDialog(prevState => ({
            ...prevState,
            [index]: true
        }));
    };

    const handleCloseEditDialog = (index) => {
        setOpenEditDialog(prevState => ({
            ...prevState,
            [index]: false
        }));
        window.location.reload();
    };

    const handleClickOpenDetailDialog = (index) => {
        setOpenDetailDialog(prevState => ({
            ...prevState,
            [index]: true
        }));
    };

    const handleCloseDetailDialog = (index) => {
        setOpenDetailDialog(prevState => ({
            ...prevState,
            [index]: false
        }));
    };

    return (
        <Fragment>
            <div className="container">
                <Paper
                    component="form"
                    className="searchContainer" 
                >
                    <InputBase
                        placeholder="Search..." 
                        value={searchTerm}
                        onChange={handleSearch}
                    /> <SearchIcon />
                 
                    <Divider orientation="vertical" />
                </Paper>

                <Button onClick={exportToExcel} variant="contained">Export to Excel</Button>

                <TableContainer component={Paper} className="tableContainer">
                    <Table>
                        <TableHead className="thead">
                            <TableRow>
                                <TableCell className="noBorder">First Name</TableCell>
                                <TableCell className="noBorder">Last Name</TableCell>
                                <TableCell className="noBorder">ID</TableCell>
                                <TableCell className="noBorder">Date of start</TableCell>
                                <TableCell className="noBorder">Edit Employee</TableCell>
                                <TableCell className="noBorder">Delete Employee</TableCell>
                                <TableCell className="noBorder">Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEmployees.map(item => {
                                if (item?.status === true) {
                                    return (
                                        <TableRow className="tableRow" key={item?.id}>
                                            <TableCell className="noBorder">{item?.firstName}</TableCell>
                                            <TableCell className="noBorder">{item?.lastName}</TableCell>
                                            <TableCell className="noBorder">{item?.tz}</TableCell>
                                            <TableCell className="noBorder">{format(new Date(item?.startDate), 'dd/MM/yyyy')}</TableCell>
                                            <TableCell className="noBorder">
                                                <EditIcon className="iconButton" onClick={() => handleClickOpenEditDialog(item.id)} />
                                                <Dialog
                                                    open={openEditDialog[item.id] || false}
                                                    onClose={() => handleCloseEditDialog(item.id)}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    className="transparentBackgroundDialog"
                                                >
                                                    <DialogTitle id="alert-dialog-title">{"Edit Employee"}</DialogTitle>
                                                    <DialogContent className="dialog">
                                                        {<EditEmployee item={item}  />}
                                                    </DialogContent>
                                                    <DialogActions>
                                                        {/* <Button onClick={() => handleCloseEditDialog(item.id)} color="primary">
                                                            Ok
                                                        </Button> */}
                                                    </DialogActions>
                                                </Dialog>
                                            </TableCell>
                                            <TableCell className="noBorder">
                                                <DeleteIcon className="iconButton" onClick={() => naving(`deleteEmployee`, { state: { item } })} />
                                            </TableCell>
                                            <TableCell className="noBorder">
                                                <ManageAccountsIcon className="noBorder" onClick={() => handleClickOpenDetailDialog(item.id)} />
                                                <Dialog
                                                    open={openDetailDialog[item.id] || false}
                                                    onClose={() => handleCloseDetailDialog(item.id)}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    className="transparentBackgroundDialog"
                                                >
                                                    <DialogTitle id="alert-dialog-title">{"Employee"}</DialogTitle>
                                                    <DialogContent className="dialog">
                                                        {<ShowDetails item={item} />}
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={() => handleCloseDetailDialog(item?.id)} color="primary">
                                                            Exit
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Fragment>
    );
};

export default Employees;
