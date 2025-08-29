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
    CFormLabel
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import CIcon from "@coreui/icons-react";
import { cilSearch } from '@coreui/icons';
import useHttpGet from '../http/HttpGetService'
import useHttpPost from '../http/HttpPostService'

const TourDetail = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams();

    const [tour, setTour] = useState({ tourName: '' });
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState('0');
    const [visibleAddTourPopup, setVisibleAddTourPopup] = useState(false);
    const [paymentPrice, setPaymentPrice] = useState();
    const [searchCustomer, setSearchCustomer] = useState("");
    const [passangers, setPassengers] = useState([]);

    const tourDetailService = useHttpGet('tour?' + ('tourId=' + id));
    const passangerService = useHttpGet('customerTour/tourCustomers?' + ('tourId=' + id));
    const searchCustomerService = useHttpGet('customer/search?' + ('anyName=' + searchCustomer));

    const customerTourService = useHttpPost('customerTour/addCustomerToTour');
    const customerTourRemoveService = useHttpPost('customerTour/removeCustomerFromTour');

    useEffect(() => {
        const findTour = async (e) => {
            try {
                const data = await tourDetailService();
                setTour(data);
            } catch (e) {
                console.log(e);
            }
        }
        findTour();
    }, [tourDetailService]);

    useEffect(() => {
        const findPassengers = async (e) => {
            try {
                const data = await passangerService();
                setPassengers(data);
            } catch (e) {
                console.log(e);
            }
        }
        findPassengers();
    }, [passangerService]);

    useEffect(() => {
        const searchCustomers = async (e) => {
            try {
                const data = await searchCustomerService();
                setCustomers(data);
            } catch (e) {
                console.log(e);
            }
        }
        if (searchCustomer.length >= 4) {
            searchCustomers();
        }
    }, [searchCustomerService]);

    const handleTourEdit = (id) => {
        navigate(`/tourlist/edit/${id}`);
    };

    const addTour = async (e) => {
        e.preventDefault();
        if (customerId === '0') {
            alert(t('tour_addTour'));
            return;
        }

        const request = {
            customerId: customerId,
            tourId: tour.id,
            paid: paymentPrice
        }

        try {
            await customerTourService(request);
            setVisibleAddTourPopup(false);
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    const handleRemoveCustomer = async (customerId) => {
        const request = {
            customerId: customerId,
            tourId: tour.id
        }

        try {
            await customerTourRemoveService(request);
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setSearchCustomer("");
        setCustomers([]);
        setCustomerId('0');
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
                        {
                            passangers.map((e) => {
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
                    backdrop="static"
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
                                    value={searchCustomer}
                                    onChange={e => setSearchCustomer(e.target.value)}
                                    placeholder={t('customer_search')}
                                    size="sm"
                                >
                                </CFormInput>
                                <CFormSelect
                                    value={customerId}
                                    onChange={e => setCustomerId(e.target.value)}
                                    required
                                >
                                    <option value="0">{t('customer')}</option>
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
                                    placeholder="0"
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