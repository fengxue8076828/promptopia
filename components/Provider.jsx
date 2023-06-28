"use client"

import React, { Children } from 'react'
import { SessionProvider } from 'next-auth/react'

const Provider = ({session,children}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider