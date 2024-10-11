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

const StationCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStationDetail = (id) => {
    navigate(`/station/${id}`);
  };

  const [stationName, setStationName] = useState("");
  const [stationType, setStationType] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("TR");

  function createStation() {
    const request = {
      "stationName": stationName,
      "stationType": stationType,
      "address": address,
      "city": city,
      "district": district,
      "zip": zip,
      "country": country
    };

    httpPost('station/create', request)
      .then(r => {
        let data = r.data;
        if (data > 0) {
          alert(t("station_create_success"));
          handleStationDetail(data);
        } else {
          alert(t("station_create_failed"));
        }
      });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CCard className="w-50">
        <CCardHeader>
          <strong>{t("station_create")}</strong> <small>{t("station_create_description")}</small>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={createStation}>
            <CRow className="mb-3">
              <CFormLabel>{t("stationName")}</CFormLabel>
              <CFormInput
                value={stationName}
                onChange={e => setStationName(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("stationType")}</CFormLabel>
              <CFormInput
                value={stationType}
                onChange={e => setStationType(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("address")}</CFormLabel>
              <CFormInput
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("city")}</CFormLabel>
              <CFormInput
                value={city}
                onChange={e => setCity(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("district")}</CFormLabel>
              <CFormInput
                value={district}
                onChange={e => setDistrict(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("zip")}</CFormLabel>
              <CFormInput
                value={zip}
                onChange={e => setZip(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("country")}</CFormLabel>
              <CFormInput
                value={country}
                onChange={e => setCountry(e.target.value)}
                required
              />
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

export default StationCreate;
