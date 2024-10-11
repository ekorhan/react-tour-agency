import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import {
    CCard,
    CContainer,
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
    CFormSelect,
    CPagination,
    CPaginationItem,
    CRow,
    CCol,
    CModal,
    CModalHeader,
    CModalBody,
    CModalTitle,
    CForm,
    CFormInput,
    CFormText,
    CFormLabel
} from '@coreui/react'
import data from "../data.json";
import { httpGet } from '../http/http';
import { useTranslation } from 'react-i18next';
import CIcon from "@coreui/icons-react";
import { cilSearch } from '@coreui/icons';

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

    const addTour = () => {
        alert(customerId)
    }


    useEffect(() => {
        findTour();
    }, [])


    const [tour, setTour] = useState({ tourName: '' });
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState(0);
    const [visibleAddTourPopup, setVisibleAddTourPopup] = useState(false);
    const [paymentPrice, setPaymentPrice] = useState(0);
    const [seachCustomer, setSeachCustomer] = useState("");

    useEffect(() => {
        if (seachCustomer.length >= 4) {
            httpGet('customer/search?' + ('anyName=' + seachCustomer))
                .then(r => {
                    setCustomers(r.data);
                });
        }
    }, [seachCustomer])

    useEffect(() => {
        setSeachCustomer("");
        setCustomers([]);
    }, [visibleAddTourPopup])

    return (
        <CContainer >
            <CContainer >
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
                                    {tour.startingStation?.stationName}
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
                                    {tour.destination?.stationName}
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
                                    {
                                        tour.driver?.firstName + " " + tour.driver?.lastName
                                    }
                                </CCardText>
                            </CCardBody>
                        </CCard>
                    </CCol>


                </CRow>
            </CContainer>

            <CContainer >
                <center>
                    <CButton size="lg" color="dark" variant="ghost" onClick={() => setVisibleAddTourPopup(!visibleAddTourPopup)}>{t('tour_addTour')}</CButton>
                </center>
            </CContainer >

            <CContainer >
                <CTable borderless hover captionTop="List of passangers" striped>
                    <CTableHead color="dark">
                        <CTableRow>
                            <CTableHeaderCell scope="col">{t('customer')}</CTableHeaderCell>
                            <CTableHeaderCell scope="col">{t('dateOfBirth')}</CTableHeaderCell>
                            <CTableHeaderCell scope="col">{t('phoneNumber')}</CTableHeaderCell>
                            <CTableHeaderCell scope="col">{t('email')}</CTableHeaderCell>
                            <CTableHeaderCell scope="col">{t('identity')}</CTableHeaderCell>
                            <CTableHeaderCell scope="col">{t('actions')}</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {data.passangers.map((e) => {
                            return (
                                <CTableRow key={e.id}>
                                    <CTableDataCell>
                                        <CButton variant="ghost" color="primary" onClick={() => handleCustomerDetail(e.id)}>{e.passengerName}</CButton>
                                    </CTableDataCell>
                                    <CTableDataCell>{e.birthDate}</CTableDataCell>
                                    <CTableDataCell>{e.phoneNumber}</CTableDataCell>
                                    <CTableDataCell>{e.email}</CTableDataCell>
                                    <CTableDataCell>{e.identity}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton variant="ghost" color="danger" onClick={() => handleRemoveCustomer(e.id)}>{t('remove')}</CButton>
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
            </CContainer>




            <CContainer>
                <CModal
                    size="lg"
                    visible={visibleAddTourPopup}
                    onClose={() => setVisibleAddTourPopup(false)}
                    aria-labelledby="OptionalSizesExample1"
                >
                    <CModalHeader>
                        <CModalTitle id="OptionalSizesExample1">{tour.tourName + " " + t('tour_adding_customer')}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm onSubmit={addTour}>
                            <CCol className="mb-3">
                                <CFormLabel>
                                    {t("customer")}
                                    <CIcon icon={cilSearch} />
                                </CFormLabel>
                                <CFormInput
                                    value={seachCustomer}
                                    onChange={e => setSeachCustomer(e.target.value)}
                                    placeholder={t('customer_search')}
                                    size="sm"
                                >
                                </CFormInput>
                                <CFormSelect
                                    value={customerId}
                                    onChange={e => setCustomerId(e.target.value)}
                                    required
                                >
                                    {customers.map((e) => {
                                        return (
                                            <option key={e.id} value={e.id}>{e.firstName + " " + e.lastName}</option>
                                        );
                                    })}
                                </CFormSelect>

                            </CCol>
                            <CCol className="mb-3">
                                <CFormLabel>
                                    {t('price')}
                                </CFormLabel>
                                <CFormInput
                                    value={paymentPrice}
                                    type="number"
                                    onChange={e => setPaymentPrice(e.target.value)}
                                    required
                                />
                            </CCol>
                            <CCol className="mb-3">
                                <CButton type="submit" color="primary">
                                    {t("add")}
                                </CButton>
                            </CCol>
                        </CForm>
                    </CModalBody>
                </CModal>
            </CContainer>
        </CContainer >
    )
}

export default TourDetail;