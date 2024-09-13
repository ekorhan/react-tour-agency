import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
} from '@coreui/react'
import data from "../data.json";

const PlanATour = () => {
    return (
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Plan a Tour</strong> <small>You can plan a tour to be organized here...</small>
            </CCardHeader>
            <CCardBody>
                <CForm validated={false}>
                    <div className="mb-3">
                        <CFormLabel>Tour Name</CFormLabel>
                        <CFormInput type="text" />
                    </div>

                    <div className="mb-3">
                        <CFormSelect label="Begin Location">
                            {data.beginNodes.map((e) => {
                                return (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                )
                            })}
                        </CFormSelect>
                    </div>

                    <div className="mb-3">
                        <CFormSelect label="Destination">
                            {data.destinitions.map((e) => {
                                return (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                )
                            })}
                        </CFormSelect>
                    </div>

                    <div className="mb-3">
                        <CFormSelect label="Vehicle">
                            {data.vehicles.map((e) => {
                                return (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                )
                            })}
                        </CFormSelect>
                    </div>

                    <div className="mb-3">
                        <CFormSelect label="Driver">
                            {data.drivers.map((e) => {
                                return (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                )
                            })}
                        </CFormSelect>
                    </div>

                    <div className="mb-3">
                        <CButton type="submit" color="primary" >
                            Create
                        </CButton>
                    </div>
                </CForm>
            </CCardBody>
        </CCard>
    )
}

export default PlanATour