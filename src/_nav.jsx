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
    component: CNavTitle,
    name: "Tour"
  },
  {
    component: CNavItem,
    name: "Plan a Tour",
    to: "/planatour",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Tours",
    to: "/tourlist",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
  }
];

export default _nav;
