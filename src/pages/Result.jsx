import React, { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { majors } from "../../constants";
import { Dropdown } from "../components/Dropdown";
import { GroupLineChart } from "../components/GroupLineChart";
import { HeaderTab } from "../components/HeaderTab";
import { JobCareerHeaderRow, JobCareerRow } from "../components/JobCareerRow";
import { PieChart } from "../components/PieChart";
import { QuoteText } from "../components/QuoteText";
import { ResultTab } from "../components/ResultTab";
import { StackLineChart } from "../components/StackLineChart";
import { StackLineChartFull } from "../components/StackLineChartFull";
import { WordCloud } from "../components/WordCloud";

function fetchResultApi(onSuccess, onError) {
  fetch(`${import.meta.env.VITE_API_URL}/surveys`, {
  })
    .then(res => res.json())
    .then(data => {
      if(onSuccess) onSuccess(data)
    })
    .catch(error => {
      if(onError) onError(error)
    })
}

function Result() {
  const [resultData, setResultData] = useState("loading") // loading | null | result
  const location = useLocation()
  const navigate = useNavigate()

  const overviewPath = "overview"
  const careerPath = "career"
  const utyccPath = "utycc"

  const currentPathname = useMemo(() => location.pathname, [location])

  useEffect(() => {
    const paths = [overviewPath, careerPath, utyccPath].map(p => `/results/${p}`).reduce((r, p) => [...r, p, `${p}/`] ,[])
    if(!paths.includes(currentPathname)) {
      navigate(`/results/${overviewPath}`, { replace: true })
    }
  }, [currentPathname, navigate])

  useEffect(() => {
    fetchResultApi(
      (data) => {
        setResultData(data)
      },
      (error) => {
        console.log("Result API Error: ", error)
        setResultData(null)
      }
    )
  }, [location.pathname])

  if(resultData === "loading") return (
    <div className="font-light text-center">Loading...</div>
  )

  if(resultData === null) return (
    <div className="font-light text-center">No data available</div>
  )

  return (
    <div className="grow max-w-screen overflow-x-hidden">
      <div className="px-2 md:px-[11rem] relative">
        <ResultTab />
      </div>
      <Routes>
        <Route path={overviewPath} element={<ResultOverview resultData={resultData} />} />
        <Route path={careerPath} element={<ResultCareer resultData={resultData} />} />
        <Route path={utyccPath} element={<ResultUTYCC resultData={resultData} />} />
      </Routes>
    </div>
  )
}

function ResultOverview({ resultData }) {
  const overview_avgsalary_summary_pie = resultData?.overview_avgsalary_summary_pie
  const overview_avgsalary = resultData?.overview_avgsalary
  const overview_aluminirating = resultData?.overview_aluminirating
  const total_respondent = resultData?.total_respondent || 0
  const total_working_count = resultData?.total_working_count || 0
  const total_has_another_degree_count = resultData?.total_has_another_degree_count || 0
  const total_is_current_college_count = resultData?.total_is_current_college_count || 0

  const receivedAnotherDegreePercent = Math.floor(total_has_another_degree_count / (total_respondent || 1) * 100)
  const currentlyPursuingHigherEducationPercent = Math.floor(total_is_current_college_count / (total_respondent || 1) * 100)
  const workingPercent =  Math.floor(total_working_count / (total_respondent || 1) * 100)

  return (
    <div className="flex flex-col gap-10 py-10">
      <div className="relative overflow-x-auto">
        <div className="flex gap-5 md:px-[11rem] min-w-[700px]">
          <div className="flex-[2]">
            <PieChart 
              series={overview_avgsalary_summary_pie}
              labels={['Bachelor', 'Master', 'PhD']}
              colors={['#5C99C7', '#8A7ED5', '#505ED1']}
            />
          </div>
          <div className="flex-[4]">
            <div className="flex px-5">
              <div className="p-0 flex flex-col justify-center text-md text-center whitespace-nowrap font-light -rotate-90 lg:rotate-0">
              MMK
              </div>
              <div className="flex-[4]">
                <GroupLineChart 
                  series={overview_avgsalary}
                  labels={['IST', 'CE', 'ECE', 'AME', 'PRE']}
                  colors={['#5C99C7', '#8A7ED5', '#505ED1']}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 pt-0 text-md text-center font-light">Total respondents and their average salary range</div>

      <div className="overflow-hidden w-screen">
        <div className="p-3 pr-[10%] md:pr-[40%]">
          <QuoteText 
            text={`${receivedAnotherDegreePercent}% of respondents received another degree and ${currentlyPursuingHigherEducationPercent}% is currently pursuing higher education.`}
            className="-ml-6"
            left
          />
        </div>
        <div className="p-3 pl[10%] md:pl-[40%]">
          <QuoteText 
            text={`Based on respondents, ${workingPercent}% is currently working in a company. `}
            className="-mr-6"
            left={false}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <div className="overflow-x-auto">
          <div className="flex px-0 md:px-5 max-w-none md:max-w-[600px]">
            <div className="p-0 md:p-3 flex flex-col justify-center text-sm md:text-md text-center whitespace-nowrap font-light -rotate-90 lg:rotate-0">
            Alumni working <br/>
            in Companies
            </div>
            <div className="flex-1">
              <StackLineChartFull 
                series={overview_aluminirating}
                labels={['Job Satisfaction', 'Degree Relaivity']}
                colors={['#150099', '#3586FF', '#505ED1', '#8A7ED5', '#5C99C7']}
              />
            </div>
          </div>
        </div>
        <div className="p-2 pt-0 text-md text-center font-light">Alumni Ratings for Their Current Jobs</div>
      </div>
    </div>
  )
}

function ResultCareer({ resultData }) {
  const majorOptions = [
    "IST",
    "CE",
    "ECE",
    "AME",
    "PRE"
  ]
  const sortOptions = [
    "Highest paying",
    "Lowest paying"
  ]
  const initialMajorOption = majorOptions[0]
  const initialSortOption = sortOptions[0]

  const [majorSelected, setMajorSelected] = useState(initialMajorOption)
  const [sortSelected, setSortSelected] = useState(initialSortOption)

  const career_salary = resultData?.career_salary || []

  const rowData = career_salary.filter((csalary) => {
    if(csalary.major === majors.find(m => m.abbr === majorSelected)?.name) return true
    return false
  })
  .sort((l, r) => sortSelected === "Highest paying" ? r.avg - l.avg : l.avg - r.avg)

  const rowDataView = rowData.map((csalary, index) => (
    <JobCareerRow
      key={index}
      title = {csalary.working_position}
      avg = {csalary.avg}
      range = {csalary.range}
      rangeMin = {csalary.range_min}
      rangeMax = {csalary.range_max}
    />
  ))

  return (
    <div className="py-10 px-2 md:px-[11rem]">
      <div className="flex gap-6 py-6">
        <Dropdown  
          selected={majorSelected}
          setSelected={setMajorSelected}
          options={majorOptions}
        />
        <Dropdown  
          selected={sortSelected}
          setSelected={setSortSelected}
          options={sortOptions}
        />
      </div>
      <div className="overflow-x-auto">
        <div className="flex flex-col divide-y-[1px] divide-gray-200 min-w-[600px]">
          <JobCareerHeaderRow />
          { rowDataView }
          { rowDataView.length === 0 && <div className="font-light text-center p-8 text-gray-400">No Data available!</div>}
        </div>
      </div>
    </div>
  )
}

function ResultUTYCC({ resultData }) {
  const utycc_overallrating = resultData?.utycc_overallrating
  const utycc_programcoveragerating = resultData?.utycc_programcoveragerating
  const utycc_activityusefulnessrating = resultData?.utycc_activityusefulnessrating
  const utycc_departmentrating = resultData?.utycc_departmentrating
  const utycc_facitilityrating = resultData?.utycc_facitilityrating
  const utycc_intershipquestion = resultData?.utycc_intershipquestion
  const utycc_intershipquestion_summary_pie = resultData?.utycc_intershipquestion_summary_pie
  const utycc_degreequestion = resultData?.utycc_degreequestion
  const utycc_degreequestion_summary_pie = resultData?.utycc_degreequestion_summary_pie
  const utycc_thought_polarity_positive_words = resultData?.utycc_thought_polarity_positive
  const utycc_thought_polarity_neutral_words = resultData?.utycc_thought_polarity_neutral
  const utycc_thought_polarity_negative_words = resultData?.utycc_thought_polarity_negative
  const utycc_suggestion_words_raw = resultData?.utycc_suggestion_words
  const utycc_thought_polarity_graph = resultData?.utycc_thought_polarity_graph

  const utycc_thought_polarity_positive = utycc_thought_polarity_positive_words.split(" ").reduce((r, w) => {
    if(r.length === 0) return [{ text: w, value: 1 }]
    const wIndex = r.findIndex(v => v.text === w)
    const R = [...r]
    if(wIndex >=0) {
      R[wIndex].value += 1
      return R
    }
    R.push({ text: w, value: 1 })
    return R
  }, [])

  const utycc_thought_polarity_neutral = utycc_thought_polarity_neutral_words.split(" ").reduce((r, w) => {
    if(r.length === 0) return [{ text: w, value: 1 }]
    const wIndex = r.findIndex(v => v.text === w)
    const R = [...r]
    if(wIndex >=0) {
      R[wIndex].value += 1
      return R
    }
    R.push({ text: w, value: 1 })
    return R
  }, [])

  const utycc_thought_polarity_negative = utycc_thought_polarity_negative_words.split(" ").reduce((r, w) => {
    if(r.length === 0) return [{ text: w, value: 1 }]
    const wIndex = r.findIndex(v => v.text === w)
    const R = [...r]
    if(wIndex >=0) {
      R[wIndex].value += 1
      return R
    }
    R.push({ text: w, value: 1 })
    return R
  }, [])

  const utycc_suggestion_words = utycc_suggestion_words_raw.split(" ").reduce((r, w) => {
    if(r.length === 0) return [{ text: w, value: 1 }]
    const wIndex = r.findIndex(v => v.text === w)
    const R = [...r]
    if(wIndex >=0) {
      R[wIndex].value += 1
      return R
    }
    R.push({ text: w, value: 1 })
    return R
  }, [])

  const internship_yes_percent = Math.round(utycc_intershipquestion_summary_pie[0]/(utycc_intershipquestion_summary_pie[0]+utycc_intershipquestion_summary_pie[1]) * 100)
  const degree_yes_percent = Math.round(utycc_degreequestion_summary_pie[0]/(utycc_degreequestion_summary_pie[0]+utycc_degreequestion_summary_pie[1]) * 100)

  return (
    <div className="py-10 flex flex-col divide-y-[1px] divide-gray-200">
      <div className="flex flex-col gap-5 max-w-screen py-8">
        <div className="flex px-2 md:px-[11rem]"><HeaderTab text="Overall Ratings" /></div>
        <div className="px-2 md:px-[11rem] py-4 overflow-x-auto">
          <div className="flex px-2 md:px-5 min-w-[500px]">
            <div className="p-0 flex flex-col justify-center text-sm md:text-md text-center whitespace-nowrap font-light -rotate-90 md:rotate-0">
            Number of <br/>
            respondents
            </div>
            <div className="flex-[4]">
              <StackLineChartFull 
                series={utycc_overallrating}
                labels={["Program Coverage", "Activities Usefulness", "Department Ratings", "Facilities Ratings"]}
                colors={['#150099', '#3586FF', '#505ED1', '#8A7ED5', '#5C99C7']}
              />
            </div>
          </div>
          <div className="p-2 pt-0 text-md text-center font-light">Overall Ratings</div>
        </div>
      </div>

      <div className="flex flex-col gap-5 max-w-screen py-8">
        <div className="flex px-2 md:px-[11rem]"><HeaderTab text="Ratings Accoding to Major" /></div>
        <div className="flex-[4] px-2 md:px-[11rem] py-4 bg-[#9F91F520] overflow-x-auto">
          <div className="flex px-2 md:px-5 min-w-[500px]">
            <div className="p-0 flex flex-col justify-center text-sm md:text-md text-center whitespace-nowrap font-light -rotate-90 md:rotate-0">
            Number of <br/>
            respondents <br/>
            according to major
            </div>
            <div className="flex-[4]">
              <StackLineChart 
                series={utycc_programcoveragerating}
                labels={["IST", "CE", "ECE", "AME", "PRE"]}
                colors={['#150099', '#3586FF', '#505ED1', '#8A7ED5', '#5C99C7']}
              />
            </div>
          </div>
          <div className="p-2 pt-0 text-md text-center font-light">Program Coverage</div>
        </div>

        <div className="flex-[4] px-2 md:px-[11rem] py-4 overflow-x-auto">
          <div className="flex px-2 md:px-5 min-w-[500px]">
            <div className="p-0 flex flex-col justify-center text-sm md:text-md text-center whitespace-nowrap font-light -rotate-90 md:rotate-0">
            Number of <br/>
            respondents <br/>
            according to major
            </div>
            <div className="flex-[4]">
              <StackLineChart 
                series={utycc_activityusefulnessrating}
                labels={["IST", "CE", "ECE", "AME", "PRE"]}
                colors={['#150099', '#3586FF', '#505ED1', '#8A7ED5', '#5C99C7']}
              />
            </div>
          </div>
          <div className="p-2 pt-0 text-md text-center font-light">Activities Usefulness</div>
        </div>
        <div className="flex-[4] px-2 md:px-[11rem] py-4 bg-[#9F91F520] overflow-x-auto">
          <div className="flex px-2 md:px-5 min-w-[500px]">
            <div className="p-0 flex flex-col justify-center text-sm md:text-md text-center whitespace-nowrap font-light -rotate-90 md:rotate-0">
            Number of <br/>
            respondents <br/>
            according to major
            </div>
            <div className="flex-[4]">
              <StackLineChart 
                series={utycc_departmentrating}
                labels={["IST", "CE", "ECE", "AME", "PRE"]}
                colors={['#150099', '#3586FF', '#505ED1', '#8A7ED5', '#5C99C7']}
              />
            </div>
          </div>
          <div className="p-2 pt-0 text-md text-center font-light">Department Ratings</div>
        </div>
        <div className="flex-[4] px-2 md:px-[11rem] py-4 overflow-x-auto">
          <div className="flex px-2 md:px-5 min-w-[500px]">
            <div className="p-0 flex flex-col justify-center text-sm md:text-md text-center whitespace-nowrap font-light -rotate-90 md:rotate-0">
            Number of <br/>
            respondents <br/>
            according to major
            </div>
            <div className="flex-[4]">
              <StackLineChart 
                series={utycc_facitilityrating}
                labels={["IST", "CE", "ECE", "AME", "PRE"]}
                colors={['#150099', '#3586FF', '#505ED1', '#8A7ED5', '#5C99C7']}
              />
            </div>
          </div>
          <div className="p-2 pt-0 text-md text-center font-light">Failities Ratings</div>
        </div>
      </div>

      <div className="flex flex-col gap-5 max-w-screen pt-8">
        <div className="flex px-2 md:px-[11rem]"><HeaderTab text="Internship Experience" /></div>
        <div className="flex-[4] px-2 md:px-[11rem] py-4 bg-[#9F91F520] overflow-x-auto">
          <div className="flex px-2 md:px-5 min-w-[600px]">
            <div className="p-0 flex flex-col justify-center text-sm md:text-md text-center whitespace-nowrap font-light -rotate-90 md:rotate-0">
            Number of <br/>
            respondents <br/>
            according to major
            </div>
            <div className="flex-[4]">
              <StackLineChart 
                series={utycc_intershipquestion}
                labels={["IST", "CE", "ECE", "AME", "PRE"]}
                colors={['#150099', '#8A7ED5']}
              />
            </div>
          </div>
          <div className="flex justify-end min-w-[500px]">
            <div className="flex-1">
              <PieChart 
                series={utycc_intershipquestion_summary_pie}
                labels={['Yes', 'No']}
                colors={['#8A7ED5', '#150099']}
                width={200}
                isDonut
                hideLegend
              />
            </div>
            <QuoteText 
              text={`More than ${internship_yes_percent}% of students think that the internship give a valuable experience to fulfill the basic requirement of the job`}
              className="flex-1"
              left={false}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 max-w-full py-8 pt-16">
        <div className="flex px-2 md:px-[11rem]"><HeaderTab text="Impact of YCC Degree" /></div>
        <div className="flex-[4] px-2 md:px-[11rem] py-4 bg-[#9F91F520] overflow-x-auto">
          <div className="flex px-2 md:px-5 min-w-[600px]">
            <div className="p-0 flex flex-col justify-center text-sm md:text-md text-center whitespace-nowrap font-light -rotate-90 md:rotate-0">
            Number of <br/>
            respondents <br/>
            according to major
            </div>
            <div className="flex-[4]">
              <StackLineChart 
                series={utycc_degreequestion}
                labels={["IST", "CE", "ECE", "AME", "PRE"]}
                colors={['#150099', '#8A7ED5']}
              />
            </div>
          </div>
          <div className="flex justify-end min-w-[600px]">
            <QuoteText 
              text={`More than ${degree_yes_percent}% of students think that degree of UTYCC is an important factor in getting employed.`}
              className="flex-1"
              left={false}
            />
            <div className="flex-1">
              <PieChart 
                series={utycc_degreequestion_summary_pie}
                labels={['Yes', 'No']}
                colors={['#8A7ED5', '#150099']}
                width={200}
                isDonut
                hideLegend
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 max-w-full py-8 pt-16">
        <div className="flex px-2 md:px-[11rem] mb-8"><HeaderTab text="Student Voices About Teaching System" /></div>
        <div className="flex-[4] px-2 md:px-[11rem] py-4 overflow-x-auto">
          <div className="flex">
            <WordCloud className="flex-1" data={utycc_thought_polarity_positive} />
            <div className="flex-1 flex justify-start items-center p-5">
              <div className="text-sm md:text-xl italic tracking-wide font-light rotate-90 md:rotate-0">Positive</div>
            </div>
          </div>
        </div>
        <div className="flex-[4] px-2 md:px-[11rem] py-4 overflow-x-auto">
          <div className="flex">
            <div className="flex-1 flex justify-end items-center p-5">
              <div className="text-sm md:text-xl italic tracking-wide font-light -rotate-90 md:rotate-0">Neutral</div>
            </div>
            <WordCloud className="flex-1" data={utycc_thought_polarity_neutral} />
          </div>
        </div>
        <div className="flex-[4] px-2 md:px-[11rem] py-4 overflow-x-auto">
          <div className="flex">
            <WordCloud className="flex-1" data={utycc_thought_polarity_negative} />
            <div className="flex-1 flex justify-start items-center p-5">
              <div className="text-xl italic tracking-wide font-light rotate-90 md:rotate-0">Negative</div>
            </div>
          </div>
        </div>
        <div className="p-2 font-light text-center -m-3">Comments about Teaching System</div>
      </div>

      <div className="flex-[4] px-2 md:px-[11rem] py-4 bg-[#9F91F520] overflow-x-auto">
        <div className="flex px-2 md:px-5 min-w-[500px]">
          <div className="p-0 flex flex-col justify-center text-sm md:text-md text-center whitespace-nowrap font-light -rotate-90 md:rotate-0">
          Number of <br/>
          respondents <br/>
          according to major
          </div>
          <div className="flex-[4]">
            <StackLineChart 
              series={utycc_thought_polarity_graph}
              labels={["IST", "CE", "ECE", "AME", "PRE"]}
              colors={['#150099', '#3586FF', '#505ED1', '#8A7ED5', '#5C99C7']}
            />
          </div>
        </div>
        <div className="p-2 pt-0 text-md text-center font-light">Polarity of Teaching System According to Majors</div>
      </div>

      <div className="flex flex-col gap-5 max-w-full py-8 pt-16">
        <div className="flex px-2 md:px-[11rem] mb-8"><HeaderTab text="Suggestions" /></div>
        <div className="flex-[4] px-2 md:px-[11rem] py-4 overflow-x-auto">
          <div className="flex justify-center">
            <div className="flex-1"></div>
            <WordCloud className="flex-[2]" data={utycc_suggestion_words} />
            <div className="flex-1"></div>
          </div>
        </div>
        <div className="p-2 font-light text-center -m-3">Wordcloud of Suggestions</div>
      </div>

    </div>
  )
}

export default Result
