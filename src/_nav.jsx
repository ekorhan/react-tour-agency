import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilCalculator,
  cilSpeedometer
} from "@coreui/icons";
import { CNavItem, CNavTitle } from "@coreui/react";

let langVal =
{
  cust:
  {
    tr: "Müşteri İşemleri",
    en: "Customer"
  },
  custCreate:
  {
    tr: "Müşteri Oluştur",
    en: "Create A Customer"
  },
  customers:
  {
    tr: "Müşteriler",
    en: "Customers"
  },
  planATour:
  {
    tr: "Tur Oluştur",
    en: "Plan A Tour"
  }
};

let lang = "tr";
const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: langVal.cust.tr
  },
  {
    component: CNavItem,
    name: langVal.custCreate.tr,
    to: "/customercreate",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: langVal.customers.tr,
    to: "/customers",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: "Tour"
  },
  {
    component: CNavItem,
    name: langVal.planATour.tr,
    to: "/planatour",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Tours",
    to: "/tourlist",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: "Driver"
  },
  {
    component: CNavItem,
    name: "Sürücü Oluştur",
    to: "/drivercreate",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: "Vehicle"
  },
  {
    component: CNavItem,
    name: "Araç Oluştur",
    to: "/vehiclecreate",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: "Station"
  },
  {
    component: CNavItem,
    name: "Konum ve Durak Oluştur",
    to: "/stationcreate",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
  }
];

export default _nav;
