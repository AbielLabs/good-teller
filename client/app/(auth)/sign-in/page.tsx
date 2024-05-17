import AuthForm from '@/components/AuthForm'
import React from 'react'

const SignIn = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
    <AuthForm type="sign-in" />
  </div>
  )
}

export default SignIn
