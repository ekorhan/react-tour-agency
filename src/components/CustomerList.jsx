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
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CCol,
    CModalTitle,
    CFormLabel,
    CFormInput,
    CForm,
    CFormSelect
} from '@coreui/react'
import { useTranslation } from "react-i18next";
import useHttpGet from '../http/HttpGetService'
import useHttpPost from '../http/HttpPostService'
import CIcon from "@coreui/icons-react";
import { cilSearch } from '@coreui/icons';


const CustomerList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const fetchCustomers = useHttpGet('customer/list'); // Hook component seviyesinde tanımlanmalı

    const [visibleAddTourPopup, setVisibleAddTourPopup] = useState(false);
    const [customers, setCustomers] = useState([{ id: 0 }]);
    const [customer, setCustomer] = useState({ id: 0 });
    const [tours, setTours] = useState([]);
    const [tourId, setTourId] = useState(0);
    const [paid, setPaid] = useState(0);
    const [searchTour, setSearchTour] = useState([]);

    const customerTourService = useHttpPost('customerTour/addCustomerToTour');

    const searchTourService = useHttpGet('tour/search?' + ('anyName=' + searchTour));

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const response = await fetchCustomers();
                setCustomers(response);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        getCustomers();
    }, [fetchCustomers]);

    const handleCustomerDetail = (id) => {
        navigate(`/customer/${id}`);
    };

    const handleCustomerEdit = (id) => {
        navigate(`/customer/edit/${id}`);
    };

    const handleAddTour = (customer) => {
        setCustomer(customer);
        setVisibleAddTourPopup(!visibleAddTourPopup);
    };

    const addTour = async (e) => {
        e.preventDefault();

        const request = {
            customerId: customer.id,
            tourId: tourId,
            paid: paid
        };

        try {
            const data = await customerTourService(request);
            console.log(data);
            setVisibleAddTourPopup(false);
        } catch (e) {
            console.error('Error adding tour:', e);
        }
    };

    useEffect(() => {
        const searchTours = async (e) => {
            try {
                const data = await searchTourService();
                setTours(data);
                if (data.length >= 1) {
                    setTourId(data[0].id);
                }
            } catch (e) {
                console.error('Error searching tours:', e);
            }
        }
        if (searchTour.length >= 4) {
            searchTours();
        }
    }, [searchTourService]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CTable color="light" striped hover className="w-75">
                <CTableHead color="dark">
                    <CTableRow>
                        <CTableHeaderCell className="w-25" scope="col">ID</CTableHeaderCell>
                        <CTableHeaderCell className="w-50" scope="col">{t("customer")}</CTableHeaderCell>
                        <CTableHeaderCell className="w-25" scope="col">{t("actions")}</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {customers.map((e) => {
                        return (
                            <CTableRow key={e.id}>
                                <CTableDataCell>
                                    <CButton variant="ghost" color="secondary" onClick={() => handleCustomerDetail(e.id)}>{e.id}</CButton>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CButton variant="ghost" color="secondary" onClick={() => handleCustomerDetail(e.id)}>{e.firstName + " " + e.lastName}</CButton>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CButtonGroup className="me-2" role="group" aria-label="First group">
                                        <CButton variant="outline" color="info" onClick={() => handleCustomerEdit(e.id)}>Edit</CButton>
                                        <CButton variant="ghost" color="success" onClick={() => handleAddTour(e)}>{t('customer_addTour')}</CButton>
                                    </CButtonGroup>
                                </CTableDataCell>
                            </CTableRow>
                        )
                    })}
                </CTableBody>
            </CTable>
            <CModal
                size="lg"
                visible={visibleAddTourPopup}
                onClose={() => setVisibleAddTourPopup(false)}
                aria-labelledby="OptionalSizesExample1"
            >
                <CModalHeader>
                    <CModalTitle id="OptionalSizesExample1">{customer.firstName + " " + t('customer_adding_tour')}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm onSubmit={addTour}>
                        <CCol className="mb-3">
                            <CFormLabel>
                                {t("tourName")}
                                <CIcon icon={cilSearch} />
                            </CFormLabel>
                            <CFormInput
                                value={searchTour}
                                onChange={e => setSearchTour(e.target.value)}
                                placeholder={t('tour_search')}
                                size="sm"
                            >
                            </CFormInput>
                            <CFormSelect
                                value={tourId}
                                onChange={e => setTourId(e.target.value)}
                                required
                            >
                                {tours.map((e) => {
                                    return (
                                        <option key={e.id} value={e.id}>
                                            {
                                                (e.id > 0) ? (e.tourName + (e.startDate != null ? (" | " + e.startDate + " | " + e.startTime) : "")) : ""
                                            }
                                        </option>
                                    );
                                })}
                            </CFormSelect>

                        </CCol>
                        <CCol className="mb-3">
                            <CFormLabel>
                                {t('paid')}
                            </CFormLabel>
                            <CFormInput
                                value={paid}
                                onChange={e => setPaid(e.target.value)}
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
        </div>
    )
}

export default CustomerList;