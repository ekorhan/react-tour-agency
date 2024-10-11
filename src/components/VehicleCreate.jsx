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

const VehicleCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleVehicleDetail = (id) => {
    navigate(`/vehicle/${id}`);
  };

  const [vehicleName, setVehicleName] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [typeOfVehicle, setTypeOfVehicle] = useState("");

  function createVehicle() {
    const request = {
      "vehicleName": vehicleName,
      "plate": plate,
      "capacity": capacity,
      "typeOfVehicle": typeOfVehicle
    };

    alert(request);
    httpPost('vehicle/create', request)
      .then(r => {
        let data = r.data;
        alert(data);
        if (data > 0) {
          alert(t("vehicle_create_success"));
          handleVehicleDetail(data);
        } else {
          alert(t("vehicle_create_failed"));
        }
      });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CCard className="w-50">
        <CCardHeader>
          <strong>{t("vehicle_create")}</strong> <small>{t("vehicle_create_description")}</small>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={createVehicle}>
            <CRow className="mb-3">
              <CFormLabel>{t("vehicleName")}</CFormLabel>
              <CFormInput
                value={vehicleName}
                onChange={e => setVehicleName(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("plate")}</CFormLabel>
              <CFormInput
                value={plate}
                onChange={e => setPlate(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("capacity")}</CFormLabel>
              <CFormInput
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
                required
              />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel>{t("typeOfVehicle")}</CFormLabel>
              <CFormInput
                value={typeOfVehicle}
                onChange={e => setTypeOfVehicle(e.target.value)}
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

export default VehicleCreate;
