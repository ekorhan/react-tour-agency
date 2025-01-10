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
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import useHttpPost from '../http/HttpPostService'

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const isAuth = useSelector((state) => state.auth)

    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Hook'u component seviyesinde tanımlıyoruz
    const signIn = useHttpPost('auth/login');

    const signin = async (e) => {
        e.preventDefault();

        const request = {
            "email": email,
            "password": password
        };

        try {
            // Hook'u çağırmak yerine, hook'tan dönen fonksiyonu kullanıyoruz
            const response = await signIn(request);
            if (response !== null) {
                dispatch({ type: 'set', token: response });
                dispatch({ type: 'set', auth: true });
                navigate(`/dashboard`);
            } else {
                alert(t("customer_create_failed"));
            }
        } catch (error) {
            console.error('Error saving customer:', error);
            alert(t("customer_create_failed"));
        }
    }

    return (
        isAuth ?
            <Navigate to="/dashboard" replace />
            :
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