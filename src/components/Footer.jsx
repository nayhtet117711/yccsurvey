import { Link } from 'react-router-dom'
import FooterBanner from '../assets/footer-banner1.svg'
import SocialFb from "../assets/social-fb.svg"
import SocialWeb from "../assets/social-website.svg"

function Footer() {
  return (
    <div className="relative w-full">
      <img alt="header-banner" src={FooterBanner} className="w-full" />
      <div className="absolute top-0 bottom-0 inset-x-0 flex">
        <div className="flex-1 flex justify-center pb-20 items-end">
          <div>
            <p className="text-base text-left pl-1 pb-1">Social Information</p>
            <div className="flex space-x-2">
              <Link to={"/results"}>
                <img alt="header-banner" src={SocialFb} className="w-full" />
              </Link>
              <Link to={"/results"}>
                <img alt="header-banner" src={SocialWeb} className="w-full" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-end pb-20 pr-20 items-end">
          <div className="text-white text-base max-w-xs">
            <p className="font-bold text-lg">Contact Information</p>
            <p className='pt-3'>+95-025178100, +95-025178200,</p>
            <p>+95-025178103</p>
            <p className="py-3">info@utycc.edu.mm</p>
            <p>most.yatanarpon@gmail.com</p>
            <p className="pt-3">
              At 28 miles on Mandalay – Lashio road, between Pyin Sar Village and Thone Taung Village, Pyin Oo Lwin, Myanmar.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-violet-600 p-2 text-sm text-gray-400 font-thin absolute inset-x-0 bottom-0">
        &copy;  All rights reserved|Illustration by Stories by Freepik
      </div>
    </div>
  )
}

export default Footer