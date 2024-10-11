import React, { useEffect, useState } from "react";
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
  CFormSelect
} from "@coreui/react";

import { useTranslation } from "react-i18next";
import { httpGet, httpPost } from '../http/http';

const PlanATour = () => {
  const navigate = useNavigate();

  const handleTourDetail = (id) => {
    navigate(`/tourlist/detail/${id}`);
  };

  const { t } = useTranslation();

  const [stations, setStations] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);


  useEffect(() => {
    findStations();
    findDrivers();
    findVehicles();
  }, [])

  function findStations() {
    httpGet('station/stations')
      .then(r => {
        setStations(r.data)
        setStartingStationId(r.data[0].id)
        setDestinationId(r.data[0].id)
      })
  }

  function findDrivers() {
    httpGet('driver/drivers')
      .then(r => {
        setDrivers(r.data)
        setDriverId(r.data[0].id)
      })
  }

  function findVehicles() {
    httpGet('vehicle/vehicles')
      .then(r => {
        setVehicles(r.data)
        setVehicleId(r.data[0].id)
      })
  }

  const [tourName, setTourName] = useState("");
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();
  const [tourDescription, setTourDescription] = useState("");
  const [tourImage, setTourImage] = useState("");
  const [startingStationId, setStartingStationId] = useState(0);
  const [destinationId, setDestinationId] = useState(0);
  const [vehicleId, setVehicleId] = useState(0);
  const [driverId, setDriverId] = useState(0);
  const [tourPrice, setTourPrice] = useState("");
  const [tourCategory, setTourCategory] = useState("");
  const [tourType, setTourType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [charVal, setCharVal] = useState([]);
  const [season, setSeason] = useState("");
  const [accommodation, setAccommotadion] = useState("");
  const [visa, setVisa] = useState("");
  const [gift, setGift] = useState("");

  function saveTour() {
    const request = {
      tourName: tourName,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      tourDescription: tourDescription,
      tourImage: tourImage,
      startingStationId: startingStationId,
      destinationId: destinationId,
      vehicleId: vehicleId,
      driverId: driverId,
      tourPrice: tourPrice,
      tourCategory: tourCategory,
      tourType: tourType,
      capacity: capacity,
      charVal: charVal,
      season: season,
      accommodation: accommodation,
      visa: visa,
      gift: gift
    };
    httpPost('tour/create', request)
      .then(r => {
        let data = r.data;
        if (data > 0) {
          alert(t("customer_create_success"));
          handleTourDetail(data);
        } else {
          alert(t("customer_create_failed"));
        }
      });
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>{t("tourPlan")}</strong> <small>{t("tourPlanDescription")}</small>
      </CCardHeader>
      <CCardBody>
        <CForm validated={false} onSubmit={saveTour}>
          <CCol className="mb-3">
            <CFormLabel>{t("tourName")}</CFormLabel>
            <CFormInput
              type="text"
              value={tourName}
              onChange={e => setTourName(e.target.value)}
              required
            />
          </CCol>

          <CCol className="mb-3">
            <CFormLabel>{t("tour_startDate")}</CFormLabel>
            <CFormInput
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
            />
          </CCol>

          <CCol className="mb-3">
            <CFormLabel>{t("tour_startTime")}</CFormLabel>
            <CFormInput
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </CCol>

          <CCol className="mb-3">
            <CFormLabel>{t("tour_endDate")}</CFormLabel>
            <CFormInput
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
            />
          </CCol>

          <CCol className="mb-3">
            <CFormLabel>{t("tour_endTime")}</CFormLabel>
            <CFormInput
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </CCol>

          <CCol className="mb-3">
            <CFormSelect
              value={startingStationId}
              onChange={e => setStartingStationId(e.target.value)}
              required
              label={t("beginNode")}
            >
              {stations.map((e) => {
                return (
                  <option key={e.id} value={e.id}>{e.stationName}</option>
                );
              })}
            </CFormSelect>
          </CCol>

          <CCol className="mb-3">
            <CFormSelect
              value={destinationId}
              onChange={e => setDestinationId(e.target.value)}
              required
              label={t("destination")}>
              {stations.map((e) => {
                return (
                  <option key={e.id} value={e.id}>{e.stationName}</option>
                );
              })}
            </CFormSelect>
          </CCol>

          <CCol className="mb-3">
            <CFormSelect
              value={vehicleId}
              onChange={e => setVehicleId(e.target.value)}
              label={t("vehicle")}>
              {vehicles.map((e) => {
                return (
                  <option key={e.id} value={e.id}>{e.vehicleName}</option>
                );
              })}
            </CFormSelect>
          </CCol>

          <CCol className="mb-3">
            <CFormSelect
              value={driverId}
              onChange={e => setDriverId(e.target.value)}
              label={t("driver")}>
              {drivers.map((e) => {
                return (
                  <option key={e.id} value={e.id}>{e.firstName + ' ' + e.lastName}</option>
                );
              })}
            </CFormSelect>
          </CCol>

          <CCol className="mb-3">
            <CFormLabel>{t("price")}</CFormLabel>
            <CFormInput
              type="number"
              value={tourPrice}
              onChange={e => setTourPrice(e.target.value)}
              required
            />
          </CCol>

          <CCol className="mb-3">
            <CButton type="submit" color="primary">
              {t("create")}
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default PlanATour;
