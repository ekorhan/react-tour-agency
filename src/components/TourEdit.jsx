import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton,
    CFormLabel,
    CSpinner
} from '@coreui/react'
import { httpGet, httpPost } from '../http/http';
import { useTranslation } from 'react-i18next';

const TourEdit = () => {
    const navigate = useNavigate();

    const handleTourDetail = (id) => {
        navigate(`/tourlist/detail/${id}`);
    };

    const { t } = useTranslation();

    const { id } = useParams();

    const [tour, setTour] = useState();

    const [loading, setLoading] = useState(true);


    const findTour = () => {
        httpGet('tour?' + ('tourId=' + id))
            .then(r => {
                const tour = r.data;
                setTour(tour);
                setTourName(tour.tourName);
                setTourDescription(tour.tourDescription);
                setTourImage(tour.tourImage);
                setStartingStationId(tour.startingStationId);
                setDestinationId(tour.destinationId);
                setVehicleId(tour.vehicleId);
                setDriverId(tour.driverId);
                setTourPrice(tour.tourPrice);
                setTourCategory(tour.tourCategory);
                setTourType(tour.tourType);
                setCapacity(tour.capacity);
                setCharVal(tour.charVal);
                setSeason(tour.season);
                setAccommotadion(tour.accommodation);
                setVisa(tour.visa);
                setGift(tour.gift);
                setLoading(false);
            });
    }

    const [stations, setStations] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);


    useEffect(() => {
        findTour();
    }, []);

    useEffect(() => {
        if (!loading) {
            findStations();
            findDrivers();
            findVehicles();
        }
    }, [loading])

    function findStations() {
        httpGet('station/stations')
            .then(r => {
                setStations(r.data)
                r.data.map((e) => {
                    if (e.id === tour?.destination?.id) {
                        setDestinationId(e.id)
                    }
                    else if (e.id === tour?.startingStation?.id) {
                        setStartingStationId(e.id)
                    }
                })
            })
    }

    function findDrivers() {
        httpGet('driver/drivers')
            .then(r => {
                setDrivers(r.data)
                r.data.map((e) => {
                    if (e.id === tour?.driver?.id) {
                        setDriverId(e.id)
                    }
                });
            });
    }

    function findVehicles() {
        httpGet('vehicle/vehicles')
            .then(r => {
                setVehicles(r.data)
                r.data.map((e) => {
                    if (e.id === tour?.vehicle?.id) {
                        setVehicleId(e.id)
                    }
                });
            })
    }

    const [tourName, setTourName] = useState();
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

    function updateTour() {
        const request = {
            id: id,
            tourName: tourName,
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
        console.log(JSON.stringify(request));
        httpPost('tour/edit', request)
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
        loading ?
            (
                <center>
                    <CSpinner />
                </center>
            )
            :
            (

                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>{t("tourPlan")}</strong> <small>{t("tourPlanDescription")}</small>
                    </CCardHeader>
                    <CCardBody>
                        <CForm validated={false} onSubmit={updateTour}>
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
                                    required
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
                                    required
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
                                    {t("edit")}
                                </CButton>
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>
            )
    );
}

export default TourEdit;