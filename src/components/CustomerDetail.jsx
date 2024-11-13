import React, { useEffect, useState } from 'react'
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
} from "@coreui/react";
import useHttpGet from '../http/HttpGetService'
import { useTranslation } from 'react-i18next';

const CustomerDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [customer, setCustomer] = useState({ customerId: 0 });
    const fetchCustomer = useHttpGet('customer?' + ('customerId=' + id)); // Hook component seviyesinde tanımlanmalı

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const response = await fetchCustomer();
                setCustomer(response);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        getCustomer();
    }, [fetchCustomer]);

    return (
        <CRow>
            <CCol style={{
                paddingLeft: '0px',
                paddingTop: '0.5%',
                paddingRight: '0.5%',
                textAlign: 'left'
            }} md={2}>
                <CCard className="CCard-custom">
                    <CCardBody>
                        <CCardTitle>{t('customerId')}</CCardTitle>
                        <CCardText>
                            {customer.id}
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
                        <CCardTitle>{t('firstName')}</CCardTitle>
                        <CCardText>
                            {customer.firstName}
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
                        <CCardTitle>{t('lastName')}</CCardTitle>
                        <CCardText>
                            {customer.lastName}
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
                        <CCardTitle>{t('phoneNumber')}</CCardTitle>
                        <CCardText>
                            {customer.phoneNumber}
                        </CCardText>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default CustomerDetails;