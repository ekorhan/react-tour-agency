import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Tour
const PlanATour = React.lazy(() => import('./components/PlanATour'))
const TourList = React.lazy(() => import('./components/TourList'))
const TourDetail = React.lazy(() => import('./components/TourDetail'))
const TourEdit = React.lazy(() => import('./components/TourEdit'))
const CustomerCreate = React.lazy(() => import('./components/CustomerCreate'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/planatour', name: 'Plan A Tour', element: PlanATour },
  { path: '/tourlist', name: 'Tours', element: TourList },
  { path: '/tourlist/detail/:id', name: 'Tour Detail', element: TourDetail },
  { path: '/tourlist/edit/:id', name: 'Edit', element: TourEdit },
  { path: '/customercreate', name: 'Create Customer', element: CustomerCreate },
]

export default routes
