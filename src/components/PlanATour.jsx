import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect
} from "@coreui/react";
import data from "../data.json";
import { useTranslation } from "react-i18next";

const PlanATour = () => {
  const { t } = useTranslation();

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>{t("tourPlan")}</strong> <small>{t("tourPlanDescription")}</small>
      </CCardHeader>
      <CCardBody>
        <CForm validated={false}>
          <div className="mb-3">
            <CFormLabel>{t("tourName")}</CFormLabel>
            <CFormInput type="text" />
          </div>

          <div className="mb-3">
            <CFormSelect label={t("beginNode")}>
              {data.beginNodes.map((e) => {
                return (
                  <option key={e.id} value={e.id}>{e.name}</option>
                );
              })}
            </CFormSelect>
          </div>

          <div className="mb-3">
            <CFormSelect label={t("destination")}>
              {data.destinitions.map((e) => {
                return (
                  <option key={e.id} value={e.id}>{e.name}</option>
                );
              })}
            </CFormSelect>
          </div>

          <div className="mb-3">
            <CFormSelect label={t("vehicle")}>
              {data.vehicles.map((e) => {
                return (
                  <option key={e.id} value={e.id}>{e.name}</option>
                );
              })}
            </CFormSelect>
          </div>

          <div className="mb-3">
            <CFormSelect label={t("driver")}>
              {data.drivers.map((e) => {
                return (
                  <option key={e.id} value={e.id}>{e.name}</option>
                );
              })}
            </CFormSelect>
          </div>

          <div className="mb-3">
            <CButton type="submit" color="primary">
              {t("create")}
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default PlanATour;
