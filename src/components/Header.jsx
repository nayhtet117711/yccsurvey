import HomeHeaderBanner from '../assets/home-banner-bg1.svg'
import HeaderImg from '../assets/header-img1.svg'

function Header() {
  return (
    <div className="relative w-full">
      <img alt="header-banner" src={HomeHeaderBanner} className="w-full" />
      <section className='absolute top-0 left-0 right-0 bottom-0 flex-col'>
        <header className='absolute z-[1] top-0 left-0 right-0 pl-[6rem] pr-[6rem] flex bg-transparent backdrop-blur-lg py-6 px-14'>
          <div className='flex grow'>
            <a href='/' className='text-white font-semibold text-2xl'>UT-YCC</a>
          </div>
          <div className='flex gap-6'>
            <div className='text-xl text-white cursor-pointer underline-offset-4 duration-100 ease-in-out origin-center hover:scale-[1.01] hover:underline'>Home</div>
            <div className='text-xl text-white cursor-pointer underline-offset-4 duration-100 ease-in-out origin-center hover:scale-[1.01] hover:underline'>Survey</div>
            <div className='text-xl text-white cursor-pointer underline-offset-4 duration-100 ease-in-out origin-center hover:scale-[1.01] hover:underline'>Results</div>
          </div>
        </header>
        <section className='absolute z-[1] left-[4rem] bottom-[10rem] lg:bottom-[15rem] xl:bottom-[22rem] 2xl:bottom-[24rem] px-14 text-center text-white'>
          <div className='text-2xl lg:text-3xl xl:text-5xl tracking-wide leading-relaxed font-light'>
            University of Technology <br/>
            (Yatanarpon Cyber City)
          </div>
          <div className='mt-6 text-lg lg:text-xl xl:text-2xl tracking-wide font-extralight text-white'>“Shape and bright your future at UTYCC”</div>
        </section>
        <section className='absolute z-[0] right-[10%] lg:right-[11%] xl:right-[12%] bottom-[4rem] lg:bottom-[6rem] xl:bottom-[8rem]'>
          <img alt="header-img" src={HeaderImg} className="w-[18rem] lg:w-[23rem] xl:w-[32rem]" />
        </section>
        <section className='absolute left-[10%] lg:left-[10%] xl:left-[14%] 2xl:left-[18%] bottom-[0rem] lg:bottom-[2rem] xl:bottom-[3rem] 2xl:bottom-[5rem]'>
          <button className='w-[16rem] text-white py-3 ring-0 rounded-xl bg-gradient-to-r from-[#964DEF] to-[#6C48FC] duration-150 shadow-sm hover:shadow-lg active:ring-2'>Take Survey</button>
        </section>
      </section>
    </div>
  )
}

export default Header
