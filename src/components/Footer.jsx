import { Link } from 'react-router-dom'
import FooterBanner from '../assets/footer-banner1.svg'
import SocialFb from "../assets/social-fb.svg"
import SocialWeb from "../assets/social-website.svg"

function Footer() {
  return (
    <div className="relative w-full mt-3">
      <img alt="header-banner" src={FooterBanner} className="w-full hidden lg:block" />
      <div className="relative lg:absolute bottom-0 inset-x-0 flex flex-wrap lg:flex-nowrap bg-indigo-400 lg:bg-transparent">
        <div className="flex-1 flex justify-start lg:justify-center py-3 lg:pb-20 items-end pl-10 lg:pl-0">
          <div>
            <p className="text-base text-left pl-1 pb-1">Social Information</p>
            <div className="flex space-x-2 min-w-[13rem]">
              <Link to={"/results"}>
                <img alt="header-banner" src={SocialFb} className="w-full" />
              </Link>
              <Link to={"/results"}>
                <img alt="header-banner" src={SocialWeb} className="w-full" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-start lg:justify-end pb-20 pl-10 lg:pl-0 pr-0 lg:pr-20 pt-4 items-center lg:items-end min-w-full lg:min-w-[30rem]">
          <div className="text-white text-sm max-w-xs">
            <p className="font-bold">Contact Information</p>
            <p className='pt-2'>+95-025178100, +95-025178200,</p>
            <p>+95-025178103</p>
            <p className="py-2">info@utycc.edu.mm</p>
            <p>most.yatanarpon@gmail.com</p>
            <p className="pt-2">
              At 28 miles on Mandalay – Lashio road, between Pyin Sar Village and Thone Taung Village, Pyin Oo Lwin, Myanmar.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-violet-600 p-2 text-sm text-gray-400 font-thin">
        &copy;  All rights reserved|Illustration by Stories by Freepik
      </div>
    </div>
  )
}

export default Footer