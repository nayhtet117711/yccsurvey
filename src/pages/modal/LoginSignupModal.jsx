import { useEffect } from 'react';
import { useState, useLayoutEffect } from 'react'
import { useCookies } from 'react-cookie';
import { LoginView } from './LoginView'

function LoginModal() {
  const [isLoginModalShow, setLoginModalShow] = useState(true)
  const [cookies, setCookie] = useCookies(['account-details']);

  useEffect(() => {
    const accountDetails = cookies['account-details']
    if(!accountDetails) return 
    setLoginModalShow(false)
  }, [cookies])

  const handleLoginModalClose = () => {
    setLoginModalShow(false)
  }
  const handleLoginModalOpen = () => {
    setLoginModalShow(true)
  }

  if(isLoginModalShow)
    return (
      <div className='fixed left-0 top-0 right-0 bottom-0 z-[10000] flex justify-center items-center backdrop-blur-sm backdrop-brightness-[0.4]'>
        <LoginView 
          onClose={handleLoginModalClose} 
        />
      </div>
    )
  return null
}

export default LoginModal
