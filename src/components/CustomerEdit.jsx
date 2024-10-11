import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { httpGet, httpPost } from "../http/http";

const CustomerEdit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { id } = useParams();

  const handleCustomerDetail = (id) => {
    navigate(`/customer/${id}`);
  };

  function editCustomer() {
    const request = {
      "id": id,
      "firstName": reqFirstName,
      "lastName": reqLastName,
      "countryCode": reqCountyCode,
      "phoneNumber": reqPhoneNumber
    };

    httpPost("customer/edit", request)
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
      setReqPhoneNumber(input);
    }
    // Kullanıcıdan alınan telefon numarasını formatlamak için bir regex kullanarak uygun formata dönüştürüyoruz
    let fixed = input.replace(/\D/g, "");
    if (fixed.length > 0) {
      // İstenen formata göre telefon numarasını düzenliyoruz
      fixed = fixed.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "($1) $2 $3-$4");
    }
    setReqPhoneNumber(fixed);
  }

  useEffect(() => {
    findCustomer();
  }, []);

  const findCustomer = () => {
    httpGet("customer?" + ("customerId=" + id))
      .then(r => {
        setReqFirstName(r.data.firstName);
        setReqLastName(r.data.lastName);
        setReqCountryCode(r.data.countryCode);
        setReqPhoneNumber(r.data.phoneNumber);
      });
  };
  const [reqFirstName, setReqFirstName] = useState();
  const [reqLastName, setReqLastName] = useState();
  const [reqCountyCode, setReqCountryCode] = useState();
  const [reqPhoneNumber, setReqPhoneNumber] = useState();

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CCard className="w-50">
        <CCardHeader>
          <strong>{t("customer_create")}</strong> <small>{t("customer_create_description")}</small>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={editCustomer}>
            <CRow className="mb-3">
              <CFormLabel>{t("firstName")}</CFormLabel>
              <CFormInput
                value={reqFirstName}
                onChange={e => setReqFirstName(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("lastName")}</CFormLabel>
              <CFormInput
                value={reqLastName}
                onChange={e => setReqLastName(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("phoneNumber")}</CFormLabel>
              <CCol md={2} className="justify-content-around">
                <CFormInput
                  value={reqCountyCode}
                  onChange={e => setReqCountryCode(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={5} className="justify-content-around">
                <CFormInput
                  value={reqPhoneNumber}
                  onChange={e => handleBlur(e.target.value)}
                  required
                />
              </CCol>

            </CRow>

            <CRow className="d-flex justify-content-end mb-3">
              <CButton type="submit" color="primary">
                {t("edit")}
              </CButton>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default CustomerEdit;
