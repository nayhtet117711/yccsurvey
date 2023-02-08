import { useState, useLayoutEffect } from 'react'
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import FooterBanner from '../../assets/footer-banner1.svg'
import { useCookies } from 'react-cookie'

export const LoginView = ({  }) => {
    const [isPasswordShow, setPasswordShow] = useState(false)
    const [cookies, setCookie] = useCookies(['account-details']);

    // disable/enabled scroll of body on modal shown
    useLayoutEffect(() => {
      document.body.style.overflow = "hidden"
      const unmount = () => {
        document.body.style.overflow = "auto"
      }
      return unmount
    }, [])

    const handlePasswordShowToggle = e => {
        e.preventDefault()
        setPasswordShow(s => !s)
    }

    const handleSignIn = (e) => {
      e.preventDefault()
      const email = e.target.email.value
      const password = e.target.password.value

      fetch(`${import.meta.env.VITE_API_URL}/accounts/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      .then(res => res.json())
      .then(data => {
        if(!data.success) throw new Error(data.message)
        setCookie('account-details', data, {
          expires: new Date(parseInt(`${data.exp}000`))
        })
      })
      .catch(error => {
        console.log("catch: ", error)
        alert(error.message)
      })
    }
  
    return (
      <div className=' bg-white rounded relative overflow-hidden w-[23rem]'>
          <img alt="login-bottom-banner" src={FooterBanner} className="absolute bottom-[29%] right-[50%] scale-[4] opacity-20" />
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-[6rem] w-auto rounded-full bg-white p-1"
                  src="/1550516054233.jpeg"
                  alt="utycc-logo"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  
                </p>
              </div>
              <form onSubmit={handleSignIn} className="mt-8 space-y-6" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div className='relative'>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type={isPasswordShow ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                    />
                    <button className='absolute right-1 top-1 bottom-1 px-1' onClick={handlePasswordShowToggle}>
                        {isPasswordShow && <EyeSlashIcon color='gray' className='w-4 h-4' />}
                        {!isPasswordShow && <EyeIcon color='gray' className='w-4 h-4' />}
                    </button>
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    )
  }