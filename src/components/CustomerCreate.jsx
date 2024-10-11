import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow
} from "@coreui/react";
import { useTranslation } from "react-i18next";
import { httpPost } from '../http/http';

const CustomerCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCustomerDetail = (id) => {
    navigate(`/customer/${id}`);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+90");
  const [phoneNumber, setPhoneNumber] = useState("");

  function saveCustomer() {
    const request = {
      "firstName": firstName,
      "lastName": lastName,
      "countryCode": countryCode,
      "phoneNumber": phoneNumber
    };

    httpPost('customer/create', request)
      .then(r => {
        let data = r.data;
        if (data > 0) {
          alert(t("customer_create_success"));
          handleCustomerDetail(data);
        } else {
          alert(t("customer_create_failed"));
        }
      });
  }

  function handleBlur(input) {
    if (input.length == 0)
      return;
    if (input.length < 10) {
      setPhoneNumber(input);
    }
    // Kullanıcıdan alınan telefon numarasını formatlamak için bir regex kullanarak uygun formata dönüştürüyoruz
    let fixed = input.replace(/\D/g, '');
    if (fixed.length > 0) {
      // İstenen formata göre telefon numarasını düzenliyoruz
      fixed = fixed.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2 $3-$4');
    }
    setPhoneNumber(fixed);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CCard className="w-50">
        <CCardHeader>
          <strong>{t("customer_create")}</strong> <small>{t("customer_create_description")}</small>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={saveCustomer}>
            <CRow className="mb-3">
              <CFormLabel>{t("firstName")}</CFormLabel>
              <CFormInput
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("lastName")}</CFormLabel>
              <CFormInput
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </CRow>

            <CRow className='mb-3'>
              <CFormLabel>{t("phoneNumber")}</CFormLabel>
              <CCol md={2} className="justify-content-around">
                <CFormInput
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={5} className="justify-content-around">
                <CFormInput
                  value={phoneNumber}
                  onChange={e => handleBlur(e.target.value)}
                  //onBlur={e => handleBlur(e.target.value)}
                  required
                />
              </CCol>

            </CRow>

            <CRow className="d-flex justify-content-end mb-3">
              <CButton type="submit" color="primary">
                {t("create")}
              </CButton>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard >
    </div>
  )
}

export default CustomerCreate;
