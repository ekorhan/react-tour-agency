import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Tour
const PlanATour = React.lazy(() => import('./components/PlanATour'))
const TourList = React.lazy(() => import('./components/TourList'))
const TourDetail = React.lazy(() => import('./components/TourDetail'))
const TourEdit = React.lazy(() => import('./components/TourEdit'))

//Customer
const CustomerCreate = React.lazy(() => import('./components/CustomerCreate'))
const CustomerDetail = React.lazy(() => import('./components/CustomerDetail'))

//Driver
const DriverCreate = React.lazy(() => import('./components/DriverCreate'))
const DriverDetail = React.lazy(() => import('./components/DriverDetail'))

//Vehicle
const VehicleCreate = React.lazy(() => import('./components/VehicleCreate'))
const VehicleDetail = React.lazy(() => import('./components/VehicleDetail'))

//Station
const StationCreate = React.lazy(() => import('./components/StationCreate'))
const StationDetail = React.lazy(() => import('./components/StationDetail'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  //Tour
  { path: '/planatour', name: 'Plan A Tour', element: PlanATour },
  { path: '/tourlist', name: 'Tours', element: TourList },
  { path: '/tourlist/detail/:id', name: 'Tour Detail', element: TourDetail },
  { path: '/tourlist/edit/:id', name: 'Edit', element: TourEdit },

  //Customer
  { path: '/customercreate', name: 'Create Customer', element: CustomerCreate },
  { path: '/customer/:id', name: 'Customer Detail', element: CustomerDetail },

  //Driver
  { path: '/drivercreate', name: 'Create Driver', element: DriverCreate },
  { path: '/driver/:id', name: 'Driver Detail', element: DriverDetail },

  //Vehicle
  { path: '/vehiclecreate', name: 'Create Driver', element: VehicleCreate },
  { path: '/vehicle/:id', name: 'Driver Detail', element: VehicleDetail },

  //Station
  { path: '/stationcreate', name: 'Create Driver', element: StationCreate },
  { path: '/station/:id', name: 'Driver Detail', element: StationDetail },
]

export default routes
