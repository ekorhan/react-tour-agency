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
        findVehicle();
    }, [])

    const findVehicle = () => {
        httpGet('vehicle?' + ('vehicleId=' + id))
            .then(r => {
                setVehicle(r.data);
            });
    }

    const [vehicle, setVehicle] = useState({ id: 0 });

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
                        <CCardTitle>{t('id')}</CCardTitle>
                        <CCardText>
                            {vehicle.id}
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
                            {vehicle.vehicleName}
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
                        <CCardTitle>{t('plate')}</CCardTitle>
                        <CCardText>
                            {vehicle.plate}
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
                        <CCardTitle>{t('capacity')}</CCardTitle>
                        <CCardText>
                            {vehicle.capacity}
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
                        <CCardTitle>{t('typeOfVehicle')}</CCardTitle>
                        <CCardText>
                            {vehicle.typeOfVehicle}
                        </CCardText>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default CustomerDetails;