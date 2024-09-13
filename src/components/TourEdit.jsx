import React from "react";
import { useParams } from 'react-router-dom';
import {
    CTableHead,
    CTable,
    CTableHeaderCell,
    CTableDataCell,
    CTableRow,
    CTableBody,
    CButtonGroup,
    CButton,
    CFormLabel
} from '@coreui/react'
import data from "../data.json";

const TourEdit = () => {
    const { id } = useParams();

    return (
        <div>
            <CFormLabel></CFormLabel>
            <h2>Tour Edit</h2>
            <p>Showing edits for tour with ID: {id}</p>
        </div>
    )
}

export default TourEdit;