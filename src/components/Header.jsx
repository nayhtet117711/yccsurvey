import HomeHeaderBanner from '../assets/home-banner-bg1.svg'
import OtherHeaderBanner from '../assets/survey-banner-bg1.svg'
import HeaderImg from '../assets/header-img1.svg'
import RightArrowIcon from '../assets/right-arrow.svg'
import { useNavigator } from '../utils'
import { useLocation } from 'react-router-dom';
import useQueryParam from '../hooks/useQueryParam'
import { useCookies } from 'react-cookie'
import { UserCircleIcon } from '@heroicons/react/20/solid'

function Header() {
  const { navigateHome, navigateSurvey, navigateResult } = useNavigator();
  const location = useLocation();
  const [query] = useQueryParam();
  const [cookies, setCookie] = useCookies(['survey-data', 'account-details']);

  return (
    <div className="relative w-full">
      {location.pathname === "/"
        ? <img alt="header-banner" src={HomeHeaderBanner} className="w-full pt-0.5" />
        : <img alt="header-banner-other" src={OtherHeaderBanner} className="w-full mt-10 -lg:mt-10 opacity-0 lg:opacity-100" />
      }
      <section className='absolute top-0 left-0 right-0 bottom-0 flex-col z-[100]'>
        <header className='fixed z-[100] top-0 left-0 right-0 pl-2 pr-2 md:pl-[6rem] md:pr-[6rem] flex bg-gradient-to-r from-[#3544FF] to-[#8B4CF1] py-6 px-14'>
          <div className='flex grow'>
            <a href='/' className='text-white font-semibold text-2xl'>UT-YCC</a>
          </div>
          <div className='flex gap-4 md:gap-6'>
            <div onClick={navigateHome} className={`text-sm md:text-lg text-white cursor-pointer underline-offset-4 duration-100 ease-in-out origin-center hover:underline ${location.pathname === "/" ? 'underline' : ''}`}>Home</div>
            <div onClick={navigateSurvey} className={`text-sm md:text-lg text-white cursor-pointer underline-offset-4 duration-100 ease-in-out origin-center hover:underline ${location.pathname === "/survey" ? 'underline' : ''}`}>Survey</div>
            <div onClick={navigateResult} className={`text-sm md:text-lg text-white cursor-pointer underline-offset-4 duration-100 ease-in-out origin-center hover:underline ${location.pathname.includes("/results") ? 'underline' : ''}`}>Results</div>
            {!!cookies["account-details"] && <div className='flex justify-center items-center relative'>
              <UserCircleIcon color='white' className='w-6 h-6' title={cookies["account-details"]?.email}/>
            </div>}
          </div>
        </header>
        {location.pathname === "/"
          ? <HomeHeader />
          : <PageHeader page={query.get("page")} />
        }
      </section>
    </div>
  )
}

const HomeHeader = () => {
  const { navigateSurvey } = useNavigator();

  return (
    <>
      <section className='hidden md:block absolute z-[1] left-[4rem] bottom-[10rem] lg:bottom-[15rem] xl:bottom-[22rem] 2xl:bottom-[24rem] px-14 text-center text-white'>
        <div className='text-2xl lg:text-3xl xl:text-5xl tracking-wider leading-relaxed font-light'>
          University of Technology <br />
          (Yatanarpon Cyber City)
        </div>
        <div className='mt-6 text-lg lg:text-xl xl:text-2xl tracking-wide font-extralight text-white'>“Shape and bright your future at UTYCC”</div>
      </section>
      <section className='hidden md:block absolute z-[0] right-[10%] lg:right-[11%] xl:right-[12%] bottom-[4rem] lg:bottom-[6rem] xl:bottom-[8rem]'>
        <img alt="header-img" src={HeaderImg} className="w-[18rem] lg:w-[23rem] xl:w-[32rem]" />
      </section>
      <section className='hidden md:block absolute left-[10%] lg:left-[10%] xl:left-[14%] 2xl:left-[18%] -bottom-[2rem] lg:bottom-[2rem] xl:bottom-[3rem] 2xl:bottom-[5rem]'>
        <button onClick={navigateSurvey} className='flex justify-center items-center gap-3 w-[16rem] text-white py-3 ring-1 ring-white rounded-xl bg-gradient-to-r from-[#964DEF] to-[#6C48FC] duration-150 shadow hover:shadow-lg active:ring-[#6C48FC] active:ring-2'>Take Survey <img src={RightArrowIcon} alt="right-arrow"></img></button>
      </section>
    </>
  )
}

const HEADER_CONTENT = {
  page1: {
    title: "Vision",
    desc: ["To be a Globally Remarkable Research based University and Cyber University"]
  },
  page2: {
    title: "Mission",
    desc: [
      "To provide skillful engineers and outstanding researchers",
      "To create broad access of engineering education opportunities with smart learning",
      "To be a national / regional / global level high ranking university"
    ]
  },
  page3: {
    title: "Motto",
    desc: ["Shape and Bright Your Future at UTYCC"]
  },
  other: {
    title: "",
    desc: []
  }
}

const PageHeader = ({ page }) => {
  return (
    <section className="hidden lg:block absolute right-[8%] text-white text-center w-[18rem] lg:w-[30rem] p-2 mt-[6rem]">
      <h1 className='text-3xl'>{HEADER_CONTENT[`page${page}`]?.title || ""}</h1>
      {
        HEADER_CONTENT[`page${page}`]?.desc.map((v, k) => (
          <p key={k} className='text-base pt-3 font-light italic'>{v || ""}</p>
        ))
      }
    </section>
  )
}

export default Header