import Img1 from '../assets/img1.svg'
import Img2 from '../assets/img2.svg'
import Img3 from '../assets/img3.svg'
import Img4 from '../assets/img4.svg'
import RightArrowIcon from '../assets/right-arrow.svg'
import { useNavigator } from '../utils'

function Home() {
  const { navigateSurvey } = useNavigator();
  return (
    <div className="p-5">
      <ItemRow
        title="What is this survey?"
        paragraph="This is a survey for UTYCC graduates. Every year there are many students graduating from UTYCC but there is no systematic information about them yet."
        imageSrc={Img1}
      />
      <ItemRow
        title=""
        paragraph="Whether the students working now or is in another academic program, is not known and it would be great to know if the academic plan and years in UTYCC were great experiences for graduated students."
        imageSrc={Img2}
        reversed
      />
      <ItemRow
        title="Why you should be taking this survey?"
        paragraph="By taking this survey, the university can be in check with the trendings in working invironments, can be ahead with updated academic plans and courses, and can know which parts have to be improved."
        imageSrc={Img3}
      />
      <ItemRow
        title=""
        paragraph="Juniors can know which kind of working environments their seniors are working on, and can prepare ahead of time for career choices."
        imageSrc={Img4}
        reversed
      />
      <div className='italic p-5 text-center text-xl font-light'>
        And lastly, don’t worry. Details of personal data will never be distributed or will not be used for any other purposes.
      </div>
      <div className='flex justify-center p-5'>
        <button onClick={navigateSurvey} className='flex justify-center items-center gap-3 w-[16rem] text-white py-3 ring-1 ring-white rounded-xl bg-gradient-to-r from-[#964DEF] to-[#6C48FC] duration-150 shadow hover:shadow-lg active:ring-[#6C48FC] active:ring-2'>Take Survey <img src={RightArrowIcon} alt="right-arrow"></img></button>
      </div>
    </div>
  )
}

const ItemRow = ({ title, paragraph, imageSrc, reversed=false }) => {
  return (
    <div className={`flex flex-wrap justify-center items-center gap-[1rem] pt-5 ${reversed ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="flex flex-col w-full md:max-w-[30em] gap-10">
        {title && <div className='text-4xl leading-10'>{title}</div>}
        <div className='text-xl font-light leading-8'>{paragraph}</div>
      </div>
      <div className="flex p-5">
        <img src={imageSrc} className="object-contain w-full md:min-w-[25rem]" />
      </div>
    </div>
  )
}

export default Home
