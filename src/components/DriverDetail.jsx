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
import { useTranslation } from 'react-i18next';
import useHttpGet from '../http/HttpGetService';

const CustomerDetails = () => {
    const { t } = useTranslation();

    const { id } = useParams();

    const driverService = useHttpGet('driver?' + ('driverId=' + id));

    useEffect(() => {
        const findDriver = async (e) => {
            try {
                const data = await driverService();
                setDriver(data);
            } catch (e) {
                console.log(e);
            }
        };
        findDriver();
    }, [driverService])

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