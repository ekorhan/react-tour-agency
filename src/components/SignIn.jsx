import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormInput,
    CFormLabel,
    CRow
} from "@coreui/react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { httpPost } from '../http/http';

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function signin() {
        const request = {
            "email": email,
            "password": password
        };

        httpPost('auth/login', request)
            .then(r => {
                let data = r.data;
                if (data !== null) {
                    dispatch({ type: 'set', token: data });
                    dispatch({ type: 'set', auth: true });
                    navigate(`/dashboard`);
                } else {
                    alert(t("customer_create_failed"));
                }
            });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CCard className="w-50">
                <CCardHeader>
                    <strong>{t("signin")}</strong> <small>{t("signin_description")}</small>
                </CCardHeader>
                <CCardBody>
                    <CForm onSubmit={signin}>
                        <CRow className="mb-3">
                            <CFormLabel>{t("email")}</CFormLabel>
                            <CFormInput
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </CRow>

                        <CRow className="mb-3">
                            <CFormLabel>{t("password")}</CFormLabel>
                            <CFormInput
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </CRow>

                        <CRow className="d-flex justify-content-end mb-3">
                            <CButton type="submit" color="primary">
                                {t("signin")}
                            </CButton>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard >
        </div>
    )
};

export default SignIn;