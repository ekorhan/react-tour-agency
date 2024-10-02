import React, { useEffect, useState } from "react";
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
import { httpGet } from '../http/http';


const TourList = () => {
    const navigate = useNavigate();

    const handleTourDetail = (id) => {
        navigate(`/tourlist/detail/${id}`);
    };

    const handleTourEdit = (id) => {
        navigate(`/tourlist/edit/${id}`);
    };

    const findTours = () => {
        httpGet('tour/tours')
            .then(r => {
                setTours(r.data);
            });
    }


    useEffect(() => {
        findTours();
    }, [])


    const [tours, setTours] = useState([{ id: 0 }]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CTable color="light" striped hover className="w-75">
                <CTableHead color="dark">
                    <CTableRow>
                        <CTableHeaderCell className="w-25" scope="col">ID</CTableHeaderCell>
                        <CTableHeaderCell className="w-50" scope="col">Tour</CTableHeaderCell>
                        <CTableHeaderCell className="w-25" scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {tours.map((e) => {
                        return (
                            <CTableRow key={e.id}>
                                <CTableDataCell><h6>{e.id}</h6></CTableDataCell>
                                <CTableDataCell><h6>{e.tourName}</h6></CTableDataCell>
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
        </div>
    )
}

export default TourList;