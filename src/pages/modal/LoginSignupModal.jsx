import { useEffect } from 'react';
import { useState, useLayoutEffect } from 'react'
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { LoginView } from './LoginView'

function LoginModal() {
  const [isLoginModalShow, setLoginModalShow] = useState(true)
  const [cookies, setCookie] = useCookies(['account-details']);
  const [isTokenCheck, setTokenCheck] = useState(false)

  useEffect(() => {
    const accountDetails = cookies['account-details']
    
    if(!accountDetails) {
      setTokenCheck(true)
      return 
    }

    setLoginModalShow(false)
    
    if(!isTokenCheck) {
      fetch(`${import.meta.env.VITE_API_URL}/accounts/check-token`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accountDetails?.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if(!data.success) throw new Error(data.message)
        setCookie('account-details', {
          ...accountDetails, 
          survey_taken: data.survey_taken || 0
        })
      })
      .catch(error => {
        console.log("catch: ", error)
        toast.error(error.message)
      })
      setTokenCheck(true)
    }

  }, [cookies, isTokenCheck])

  const handleLoginModalClose = () => {
    setLoginModalShow(false)
  }
  
  if(isTokenCheck && isLoginModalShow)
    return (
      <div className='fixed left-0 top-0 right-0 bottom-0 z-[99] flex justify-center items-center backdrop-blur-sm backdrop-brightness-[0.4]'>
        <LoginView 
          onClose={handleLoginModalClose} 
        />
      </div>
    )
  return null
}

export default LoginModal
