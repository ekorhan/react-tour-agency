import React from "react";
import { useNavigate } from 'react-router-dom';
import {
    CTableHead,
    CTable,
    CTableHeaderCell,
    CTableDataCell,
    CTableRow,
    CTableBody,
    CButtonGroup,
    CButton
} from '@coreui/react'
import data from "../data.json";

const TourList = () => {
    const navigate = useNavigate();

    const handleTourDetail = (id) => {
        navigate(`/tourlist/detail/${id}`);
    };

    const handleTourEdit = (id) => {
        navigate(`/tourlist/edit/${id}`);
    };

    return (
        <CTable color="light" striped hover>
            <CTableHead color="dark">
                <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tour</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Begin Node</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Destinition</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Vehicle</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Driver</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {data.tours.map((e) => {
                    return (
                        <CTableRow key={e.id}>
                            <CTableDataCell><h6>{e.id}</h6></CTableDataCell>
                            <CTableDataCell><h6>{e.tourName}</h6></CTableDataCell>
                            <CTableDataCell>{e.beginNode}</CTableDataCell>
                            <CTableDataCell>{e.destinition}</CTableDataCell>
                            <CTableDataCell>{e.vehicle}</CTableDataCell>
                            <CTableDataCell>{e.driver}</CTableDataCell>
                            <CTableDataCell>
                                <CButtonGroup className="me-2" role="group" aria-label="First group">
                                    <CButton color="secondary" onClick={() => handleTourDetail(e.id)}>Detail</CButton>
                                    <CButton color="secondary" onClick={() => handleTourEdit(e.id)}>Edit</CButton>
                                </CButtonGroup>
                            </CTableDataCell>
                        </CTableRow>
                    )
                })}
            </CTableBody>
        </CTable>
    )
}

export default TourList;