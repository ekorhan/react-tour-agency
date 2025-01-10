import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'

// routes config
import { SignIn, routes } from '../routes'

const AppContent = () => {

  const isAuth = useSelector((state) => state.auth)

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {/* Signin route'u ayrı olarak tanımlayın */}
          <Route path="/signin" element={<SignIn />} />

          {routes.map((route, idx) => {
            if (!route.element) return null;

            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    isAuth ? (
                      <route.element />
                    ) : (
                      <Navigate to="/signin" replace state={{ from: route.path }} />
                    )
                  }
                />
              )
            )
          })}
          {/* Ana sayfa yönlendirmesi */}
          <Route
            path="/"
            element={
              isAuth ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
