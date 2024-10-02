import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCardTitle,
    CCardText,
    CButton,
    CTableHead,
    CTable,
    CTableHeaderCell,
    CTableDataCell,
    CTableRow,
    CTableBody,
    CButtonGroup,
    CPagination,
    CPaginationItem,
    CRow,
    CCol
} from '@coreui/react'
import data from "../data.json";
import { httpGet } from '../http/http';
import { useTranslation } from 'react-i18next';

const TourDetail = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleTourEdit = (id) => {
        navigate(`/tourlist/edit/${id}`);
    };

    const { id } = useParams();

    const findTour = () => {
        httpGet('tour?' + ('tourId=' + id))
            .then(r => {
                setTour(r.data);
            });
    }


    useEffect(() => {
        findTour();
    }, [])


    const [tour, setTour] = useState({ tourName: '' });

    return (
        <div>
            <CRow>
                <CCol style={{
                    paddingLeft: '0px',
                    paddingTop: '0.5%',
                    paddingRight: '0.5%',
                    textAlign: 'left'
                }} md={2}>
                    <CCard className="CCard-custom">
                        <CCardBody>
                            <CCardTitle>{t('tourName')}</CCardTitle>
                            <CCardText>
                                {tour.tourName}
                            </CCardText>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol style={{
                    paddingLeft: '0px',
                    paddingTop: '0.5%',
                    paddingRight: '0.5%',
                    textAlign: 'left'
                }} md={2}>
                    <CCard className="CCard-custom">
                        <CCardBody>
                            <CCardTitle>{t('tourDescription')}</CCardTitle>
                            <CCardText>
                                {tour.tourDescription}
                            </CCardText>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol style={{
                    paddingLeft: '0px',
                    paddingTop: '0.5%',
                    paddingRight: '0.5%',
                    textAlign: 'left'
                }} md={2}>
                    <CCard className="CCard-custom">
                        <CCardBody>
                            <CCardTitle>{t('startingStation')}</CCardTitle>
                            <CCardText>
                                {tour.startingStation}
                            </CCardText>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol style={{
                    paddingLeft: '0px',
                    paddingTop: '0.5%',
                    paddingRight: '0.5%',
                    textAlign: 'left'
                }} md={2}>
                    <CCard className="CCard-custom">
                        <CCardBody>
                            <CCardTitle>{t('destination')}</CCardTitle>
                            <CCardText>
                                {tour.destination}
                            </CCardText>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol style={{
                    paddingLeft: '0px',
                    paddingTop: '0.5%',
                    paddingRight: '0.5%',
                    textAlign: 'left'
                }} md={2}>
                    <CCard className="CCard-custom">
                        <CCardBody>
                            <CCardTitle>{t('vehicleName')}</CCardTitle>
                            <CCardText>
                                {tour.vehicle?.vehicleName}
                            </CCardText>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol style={{
                    paddingLeft: '0px',
                    paddingTop: '0.5%',
                    paddingRight: '0.5%',
                    textAlign: 'left'
                }} md={2}>
                    <CCard className="CCard-custom">
                        <CCardBody>
                            <CCardTitle>{t('driverName')}</CCardTitle>
                            <CCardText>
                                {tour.driverName}
                            </CCardText>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CTable borderless hover captionTop="List of passangers" striped>
                <CTableHead color="dark">
                    <CTableRow>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Birth Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                        <CTableHeaderCell scope="col">E-Mail</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Identity</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {data.passangers.map((e) => {
                        return (
                            <CTableRow key={e.id}>
                                <CTableDataCell><h6>{e.passengerName}</h6></CTableDataCell>
                                <CTableDataCell>{e.birthDate}</CTableDataCell>
                                <CTableDataCell>{e.phoneNumber}</CTableDataCell>
                                <CTableDataCell>{e.email}</CTableDataCell>
                                <CTableDataCell>{e.identity}</CTableDataCell>
                                <CTableDataCell>
                                    <CButtonGroup className="me-2" size="sm" role="group">
                                        <CButton variant="ghost" color="info" onClick={() => handleTourDetail(e.id)}>Detail</CButton>
                                        <CButton variant="ghost" color="secondary" onClick={() => handleTourEdit(e.id)}>Edit</CButton>
                                    </CButtonGroup>
                                </CTableDataCell>
                            </CTableRow>
                        )
                    })}
                </CTableBody>
            </CTable>
            <CPagination className="CPagination-custom" aria-label="Page navigation example" align="center">
                <CPaginationItem className="CPaginationItem-custom"><div>Previous</div></CPaginationItem>
                <CPaginationItem className="CPaginationItem-custom"><div>1</div></CPaginationItem>
                <CPaginationItem className="CPaginationItem-custom" active><div>2</div></CPaginationItem>
                <CPaginationItem className="CPaginationItem-custom"><div>3</div></CPaginationItem>
                <CPaginationItem className="CPaginationItem-custom"><div>Next</div></CPaginationItem>
            </CPagination>
        </div>
    )
}

export default TourDetail;