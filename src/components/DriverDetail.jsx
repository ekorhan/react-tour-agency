import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCardTitle,
    CCardText,
    CRow,
    CCol
} from "@coreui/react";
import { httpGet } from '../http/http';
import { useTranslation } from 'react-i18next';

const CustomerDetails = () => {
    const { t } = useTranslation();

    const { id } = useParams();

    useEffect(() => {
        findDriver();
    }, [])

    const findDriver = () => {
        httpGet('driver?' + ('driverId=' + id))
            .then(r => {
                setDriver(r.data);
            });
    }

    const [driver, setDriver] = useState({ id: 0 });

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
                        <CCardTitle>{t('driverId')}</CCardTitle>
                        <CCardText>
                            {driver.id}
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
                            {driver.firstName}
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
                            {driver.lastName}
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
                            {driver.phoneNumber}
                        </CCardText>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default CustomerDetails;