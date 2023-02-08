import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { companyInfo, degree_levels, graduated_years, majors, rating, yes_or_no } from "../../constants";
import Img5 from "../assets/img5.svg"
import Img6 from "../assets/img6.svg"
import useQueryParam from "../hooks/useQueryParam";
import { useCookies } from 'react-cookie';
import RightArrowIcon from '../assets/right-arrow.svg'
import LoginModal from "./modal/LoginSignupModal";
import { ExpandedDropdown } from "../components/ExpandedDropdown";

const LabelClassName = `text-md md:text-xl text-gray-900`;
const InputClassName = `block w-full max-w-xs py-2 px-4 my-4 ml-8 rounded-2xl outline-none border border-violet-600 shadow-md shadow-violet-700 focus:border-violet-700 focus:ring-violet-500 sm:text-xl appearance-none`;
const RadioClassName = `cursor-pointer h-5 w-5 ml-8 appearance-none border-2 border-gray-300 checked:bg-violet-600 rounded-full`
const TextAreaClassName = `block w-full max-w-xs py-2 px-4 ml-8 outline-none border-b border-violet-600 border-0 shadow-xs shadow-violet-700 focus:border-violet-700 focus:ring-violet-500 sm:text-xl appearance-none bg-transparent`;

const Survey = () => {
  const [cookies, setCookie] = useCookies(['survey-data', 'account-details']);

  const [surveyData, setSurveyData] = useState(cookies["survey-data"] || {});
  const {
    name = "",
    gender = "",
    email = "",
    graduated_year = "",
    degree_level = "",
    major = "",
    has_other_degree = "",
    other_degree = "",
    is_current_college = "",
    college_name = "",
    current_degree_program = "",
    is_current_working = "",
    working_organization_info = {},
    current_job_rating = "",
    job_related_degree_rating = "",
    degree_coverage_career_rating = "",
    activites_coverage_career_rating = "",
    is_degree_important = "",
    ict_dept_rating = "",
    utycc_facilities_rating = "",
    thoughts = "",
    suggestions = "",
    is_internship_helpful = "",
  } = surveyData;

  const navigate = useNavigate();

  const [query] = useQueryParam();
  const page = query.get("page")

  const handleChange = (fieldName, value) => setSurveyData((prev) => {
    const newState = { ...prev };
    newState[fieldName] = value;

    switch (fieldName) {
      case "has_other_degree":
        {
          newState["other_degree"] = "";
        }; break;
      case "is_current_college":
        {
          newState["college_name"] = "";
          newState["current_degree_program"] = "";
        }; break;
      case "is_current_working":
        {
          newState["working_organization"] = "";
        }; break;
      case "working_organization":
        {
          newState["working_organization_info"] = {};
        }; break;
      default: newState;
    }

    return newState;
  });

  const handleSubmit = e => {
    e.preventDefault();
    setCookie(`survey-data`, JSON.stringify(surveyData), { path: '/', maxAge: 60 * 30 });

    window.scroll(0, 0);

    if (page !== "3") {
      return navigate({ pathname: "/survey", search: `?page=${+page + 1}` })
    }
    // Going to submit
    fetch(`${import.meta.env.VITE_API_URL}/surveys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(surveyData)
    })
    .then(res => res.json())
    .then(data => {
      console.log("data: ", data)
      alert("Thank you for participating.")
      navigate("/results/overview")
    })
    .catch(error => console.log("catch: ", error))
  }

  if(cookies["account-details"]?.survey_taken == 1)
    return (
      <div className="grow relative flex flex-col gap-3 justify-start mx-8 pl-2">
        <h3 className="text-2xl font-bold text-gray-800">You have already taken the survey</h3>
        <p className="text-gray-500">Please check the <a href="/results" className="text-blue-500">Result</a> page.</p>
      </div>
    )

  return (
    <div className="grow relative flex justify-center mx:2 md:mx-8">
      <div className="absolute p-5 left-0 opacity-40 lg:opacity-80">
        <img src={Img5} className="object-contain w-full md:min-w-[25rem]" />
      </div>
      <div className="absolute p-5 right-10 bottom-10 opacity-40 lg:opacity-80">
        <img src={Img6} className="object-contain w-full md:min-w-[25rem]" />
      </div>

      <form className="w-full lg:max-w-2xl relative" onSubmit={handleSubmit}>
        <div className="backdrop-blur-sm min-h-[600px] border-r-0 border-b-0 lg:border-r-2 lg:border-b-2 border-l-0 border-t-0 shadow- shadow-gray-200 bg-transparent mx-0 lg:mx-6 divide-y divide-gray-200 z-10 mb-4">
          {page === "1" && <>
            <div className="p-4">
              <label htmlFor="name" className={LabelClassName}>1. What is your name? *</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={name}
                onChange={e => handleChange("name", e.currentTarget.value)}
                className={InputClassName}
                placeholder="Please fill your name"
              />
            </div>

            <div className="p-4">
              <label htmlFor="graduated_year" className={LabelClassName}>2. Graduated Year *</label>
              <fieldset className="mt-4">
                <legend className="sr-only">Graduated Year</legend>
                <div className="space-y-4 flex flex-col justify-center">
                  {graduated_years.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="graduated_year"
                        type="radio"
                        required
                        value={v.id}
                        checked={v.id === graduated_year}
                        onChange={e => handleChange("graduated_year", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-md md:text-xl text-gray-400">
                        {v.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="degree_level" className={LabelClassName}>3. Degree Level *</label>
              <fieldset className="mt-4">
                <legend className="sr-only">Degree Level</legend>
                <div className="space-y-4 flex flex-col justify-center">
                  {degree_levels.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="degree_level"
                        type="radio"
                        required
                        value={v.id}
                        checked={v.id === degree_level}
                        onChange={e => handleChange("degree_level", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-md md:text-xl text-gray-400">
                        {v.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="major" className={LabelClassName}>4. Major (or Department) *</label>
              <fieldset className="mt-4">
                <legend className="sr-only">Major</legend>
                <div className="space-y-4 flex flex-col justify-center">
                  {majors.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="major"
                        type="radio"
                        required
                        value={v.id}
                        checked={v.id === major}
                        onChange={e => handleChange("major", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-md md:text-xl text-gray-400">
                        {v.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </>}

          {page === "2" && <>
            <div className="p-4">
              <label htmlFor="has_other_degree" className={LabelClassName}>5. Have you received other degrees? *</label>
              <fieldset className="mt-4">
                <legend className="sr-only">Has Other Degree</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {yes_or_no.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="has_other_degree"
                        type="radio"
                        required
                        value={v.id}
                        checked={v.id === has_other_degree}
                        onChange={e => handleChange("has_other_degree", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-md md:text-xl text-gray-400">
                        {v.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="other_degree" className={LabelClassName + " sr-only"}>Other Degree*</label>
                  <input
                    type="text"
                    name="other_degree"
                    id="other_degree"
                    required={has_other_degree === "yes"}
                    disabled={has_other_degree !== "yes"}
                    value={other_degree}
                    onChange={e => handleChange("other_degree", e.currentTarget.value)}
                    className={InputClassName + " disabled:sr-only"}
                    placeholder="Please mention your degree"
                  />
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="is_current_college" className={LabelClassName}>6. Are you currently in the University/College? *</label>
              <fieldset className="mt-4">
                <legend className="sr-only">Is Current College Student?</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {yes_or_no.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="is_current_college"
                        type="radio"
                        required
                        value={v.id}
                        checked={v.id === is_current_college}
                        onChange={e => handleChange("is_current_college", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-md md:text-xl text-gray-400">
                        {v.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="college_name" className={LabelClassName + " sr-only"}>College Name*</label>
                  <input
                    type="text"
                    name="college_name"
                    id="college_name"
                    required={is_current_college === "yes"}
                    disabled={is_current_college !== "yes"}
                    value={college_name}
                    onChange={e => handleChange("college_name", e.currentTarget.value)}
                    className={InputClassName + " disabled:sr-only"}
                    placeholder="University/College Name (optional)"
                  />
                </div>
                <div>
                  <label htmlFor="current_degree_program" className={LabelClassName + " sr-only"}>Current Degree Program*</label>
                  <input
                    type="text"
                    name="current_degree_program"
                    id="current_degree_program"
                    required={is_current_college === "yes"}
                    disabled={is_current_college !== "yes"}
                    value={current_degree_program}
                    onChange={e => handleChange("current_degree_program", e.currentTarget.value)}
                    className={InputClassName + " disabled:sr-only"}
                    placeholder="Your current degree program (optional)"
                  />
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="is_current_working" className={LabelClassName}>7. Are you working now? *</label>
              <fieldset className="mt-4">
                <legend className="sr-only">Is Current Working?</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {yes_or_no.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="is_current_working"
                        type="radio"
                        required
                        value={v.id}
                        checked={v.id === is_current_working}
                        onChange={e => handleChange("is_current_working", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-md md:text-xl text-gray-400">
                        {v.name}
                      </label>
                    </div>
                  ))}
                </div>
                {is_current_working === "yes" &&
                  <div className="p-4">
                    <label htmlFor="working_organization" className={LabelClassName}>Please fill the following: *</label>
                    <fieldset className="mt-2">
                      <legend className="sr-only">Working Organization</legend>
                      <div className="flex flex-col justify-center space-y-1">
                        {companyInfo.map((vv, kk, a) => 
                          vv.isDropdown 
                            ? (
                                <ExpandedDropdown
                                  key={kk}
                                  id={kk}
                                  name="working_organization_info"
                                  type="text"
                                  required
                                  value={working_organization_info[vv.id] || ""}
                                  onChange={v => handleChange("working_organization_info", { ...working_organization_info, [vv.id]: v })}
                                  className={TextAreaClassName}
                                  placeholder={vv.name}
                                />
                              )
                            : (
                              <input
                                key={kk}
                                id={kk}
                                name="working_organization_info"
                                type="text"
                                required
                                value={working_organization_info[vv.id] || ""}
                                onChange={e => handleChange("working_organization_info", { ...working_organization_info, [vv.id]: e.currentTarget.value })}
                                className={TextAreaClassName}
                                placeholder={vv.name}
                              />
                            )
                          )
                        }
                      </div>
                    </fieldset>
                    <div className="">
                      <div className="p-4">
                        <label htmlFor="current_job_rating" className={LabelClassName}>How satisfied are you with your current job?</label>
                        <fieldset className="mt-4">
                          <legend className="sr-only">Current Job Rating</legend>
                          <div className="space-y-0 flex items-center space-x-0">
                            <div className="text-xl text-gray-400 pl-8">lowest</div>
                            {rating.map((v) => (
                              <div key={v.id} className="flex items-center">
                                <input
                                  id={v.id}
                                  name="current_job_rating"
                                  type="radio"
                                  value={v.id}
                                  checked={v.id === current_job_rating}
                                  onChange={e => handleChange("current_job_rating", e.currentTarget.value)}
                                  className={RadioClassName}
                                />
                                <label htmlFor={v.id} className="text-xl text-gray-400 hidden">
                                  {v.name}
                                </label>
                              </div>
                            ))}
                            <div className="text-xl text-gray-400 pl-8">highest</div>
                          </div>
                        </fieldset>
                      </div>

                      <div className="p-4">
                        <label htmlFor="job_related_degree_rating" className={LabelClassName}>How closely related is your current job to your degree major?</label>
                        <fieldset className="mt-4">
                          <legend className="sr-only">Job Related Degree Rating</legend>
                          <div className="space-y-0 flex items-center space-x-0">
                            <div className="text-xl text-gray-400 pl-8">lowest</div>
                            {rating.map((v) => (
                              <div key={v.id} className="flex items-center">
                                <input
                                  id={v.id}
                                  name="job_related_degree_rating"
                                  type="radio"
                                  value={v.id}
                                  checked={v.id === job_related_degree_rating}
                                  onChange={e => handleChange("job_related_degree_rating", e.currentTarget.value)}
                                  className={RadioClassName}
                                />
                                <label htmlFor={v.id} className="text-xl text-gray-400 hidden">
                                  {v.name}
                                </label>
                              </div>
                            ))}
                            <div className="text-xl text-gray-400 pl-8">highest</div>
                          </div>
                        </fieldset>
                      </div>

                    </div>
                  </div>
                }
              </fieldset>
            </div>
          </>}

          {page === "3" && <>
            <div className="p-4">
              <label htmlFor="degree_coverage_career_rating" className={LabelClassName}>
                8. The program studied in your university coverage in your professional life.
              </label>
              <fieldset className="mt-4">
                <legend className="sr-only">Degree Coverage Career Rating</legend>
                <div className="space-y-0 flex items-center space-x-0">
                  <div className="text-xl text-gray-400 pl-8">lowest</div>
                  {rating.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="degree_coverage_career_rating"
                        type="radio"
                        value={v.id}
                        checked={v.id === degree_coverage_career_rating}
                        onChange={e => handleChange("degree_coverage_career_rating", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="text-xl text-gray-400 hidden">
                        {v.name}
                      </label>
                    </div>
                  ))}
                  <div className="text-xl text-gray-400 pl-8">highest</div>
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="activites_coverage_career_rating" className={LabelClassName}>
                9. How useful were the activities (projects, mini-thesis, field trip) in helping you with your current job?
              </label>
              <fieldset className="mt-4">
                <legend className="sr-only">Activites Coverage Career Rating</legend>
                <div className="space-y-0 flex items-center space-x-0">
                  <div className="text-xl text-gray-400 pl-8">lowest</div>
                  {rating.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="activites_coverage_career_rating"
                        type="radio"
                        value={v.id}
                        checked={v.id === activites_coverage_career_rating}
                        onChange={e => handleChange("activites_coverage_career_rating", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="text-xl text-gray-400 hidden">
                        {v.name}
                      </label>
                    </div>
                  ))}
                  <div className="text-xl text-gray-400 pl-8">highest</div>
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="is_internship_helpful" className={LabelClassName}>
                10. Did the internship give a valuable experience to fulfill the basic requirement of the job?
              </label>
              <fieldset className="mt-4">
                <legend className="sr-only">Is Internship Helpful?</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {yes_or_no.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="is_internship_helpful"
                        type="radio"
                        required
                        value={v.id}
                        checked={v.id === is_internship_helpful}
                        onChange={e => handleChange("is_internship_helpful", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-md md:text-xl text-gray-400">
                        {v.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="is_degree_important" className={LabelClassName}>
                11. Do you think that the degree of UTYCC is an important factor to increase employability?
              </label>
              <fieldset className="mt-4">
                <legend className="sr-only">Is Degree Important?</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {yes_or_no.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="is_degree_important"
                        type="radio"
                        required
                        value={v.id}
                        checked={v.id === is_degree_important}
                        onChange={e => handleChange("is_degree_important", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-md md:text-xl text-gray-400">
                        {v.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="ict_dept_rating" className={LabelClassName}>
                12. Based on your experience as a student, rate the performance of the Major Department
              </label>
              <fieldset className="mt-4">
                <legend className="sr-only">Major Department Rating</legend>
                <div className="space-y-0 flex items-center space-x-0">
                  <div className="text-xl text-gray-400 pl-8">lowest</div>
                  {rating.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="ict_dept_rating"
                        type="radio"
                        value={v.id}
                        checked={v.id === ict_dept_rating}
                        onChange={e => handleChange("ict_dept_rating", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="text-xl text-gray-400 hidden">
                        {v.name}
                      </label>
                    </div>
                  ))}
                  <div className="text-xl text-gray-400 pl-8">highest</div>
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="utycc_facilities_rating" className={LabelClassName}>
                13. How good do you think about the facilities UTYCC provides?
              </label>
              <fieldset className="mt-4">
                <legend className="sr-only">UTYCC Facilities Rating</legend>
                <div className="space-y-0 flex items-center space-x-0">
                  <div className="text-xl text-gray-400 pl-8">lowest</div>
                  {rating.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="utycc_facilities_rating"
                        type="radio"
                        value={v.id}
                        checked={v.id === utycc_facilities_rating}
                        onChange={e => handleChange("utycc_facilities_rating", e.currentTarget.value)}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="text-xl text-gray-400 hidden">
                        {v.name}
                      </label>
                    </div>
                  ))}
                  <div className="text-xl text-gray-400 pl-8">highest</div>
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="thoughts" className={LabelClassName}>
                14. What are your thoughts of the teaching system of UTYCC?
              </label>
              <textarea
                name="thoughts"
                id="thoughts"
                rows={1}
                value={thoughts}
                onChange={e => handleChange("thoughts", e.currentTarget.value)}
                className={TextAreaClassName}
                placeholder="your answer here"
              ></textarea>
            </div>

            <div className="p-4">
              <label htmlFor="thoughts" className={LabelClassName}>
                15. Please give suggestions to improve our University.
              </label>
              <textarea
                name="suggestions"
                id="suggestions"
                rows={1}
                value={suggestions}
                onChange={e => handleChange("suggestions", e.currentTarget.value)}
                className={TextAreaClassName}
                placeholder="your answer here"
              ></textarea>
            </div>
          </>}
        </div>

        <div className="flex justify-end mr-10">
        <button
            type="submit"
            className='flex justify-center items-center gap-3 w-[16rem] text-white py-3 ring-1 ring-white rounded-xl bg-gradient-to-r from-[#964DEF] to-[#6C48FC] duration-150 shadow hover:shadow-lg active:ring-[#6C48FC] active:ring-2'
          >
            {
              page === "3"
                ? "Submit"
                : (
                  <>
                    <span>Next</span>
                    <img src={RightArrowIcon} alt="right-arrow"></img>
                  </>
                )
            }
          </button>
        </div>
      </form>

      <LoginModal />
    </div>
  )
}

export default Survey;
