import React from 'react'
import { CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect } from "@coreui/react";
import { useTranslation } from "react-i18next";

const CustomerCreate = () => {
  const { t } = useTranslation();
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Plan a Tour</strong> <small>You can plan a tour to be organized here...</small>
      </CCardHeader>
      <CCardBody>
        <CForm validated={false}>
          <div className="mb-3">
            <CFormLabel>{t("firstName")}</CFormLabel>
            <CFormInput type="text" />
          </div>

          <div className="mb-3">
            <CFormLabel>{t("lastName")}</CFormLabel>
            <CFormInput type="text" />
          </div>

          <div className="mb-3">
            <CFormLabel>{t("phoneNumber")}</CFormLabel>
            <CFormInput type="number" />
          </div>

          <div className="mb-3">
            <CButton type="submit" color="primary" >
              {t("create")}
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default CustomerCreate;
