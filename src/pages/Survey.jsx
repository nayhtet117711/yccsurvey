import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { degree_levels, genders, graduated_years, majors, yes_or_no } from "../../constants";
import Img5 from "../assets/img5.svg"
import Img6 from "../assets/img6.svg"
import useQuery from "../hooks/useQuery";

const LabelClassName = `text-sm text-gray-900`;
const InputClassName = `block w-full max-w-xs py-2 px-4 my-4 ml-8 rounded-2xl outline-none border border-violet-600 shadow-md shadow-violet-700 focus:border-violet-700 focus:ring-violet-500 sm:text-sm appearance-none`;
const RadioClassName = `cursor-pointer h-5 w-5 ml-8 appearance-none border-2 border-gray-300 checked:bg-violet-600 rounded-full`

const Survey = () => {
  const [surveyData, setSurveyData] = useState({ name: "" });

  const navigate = useNavigate();

  const [query] = useQuery();
  const page = query.get("page")

  const handleChange = (e, fieldName) => {
    console.log({ v: e.currentTarget.value, fieldName })
    setSurveyData({ ...surveyData, [fieldName]: e.currentTarget.value })
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (page !== "3") {
      return navigate({ pathname: "/survey", search: `?page=${+page + 1}` })
    }
  }

  const {
    name = "",
    gender = "",
    email = "",
    graduated_year = "",
    degree_level = "",
    major = "",
    has_other_degree = "",
    other_degree = ""
  } = surveyData;

  return (
    <div className="grow relative flex justify-center mx-8">
      <form className="w-full lg:max-w-2xl" onSubmit={handleSubmit}>
        <div className="border-r-2 border-b-2 border-l-0 border-t-0 shadow- shadow-gray-200 bg-transparent px-20 divide-y divide-gray-200 z-10 mb-4">
          {page === "1" && <>
            <div className="p-4">
              <label htmlFor="name" className={LabelClassName}>1. What is your name? *</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={name}
                onChange={e => handleChange(e, "name")}
                className={InputClassName}
                placeholder="Please fill your name"
              />
            </div>

            <div className="p-4">
              <label htmlFor="gender" className={LabelClassName}>2. Gender *</label>
              <fieldset className="mt-4">
                <legend className="sr-only">Gender</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {genders.map((v) => (
                    <div key={v.id} className="flex items-center">
                      <input
                        id={v.id}
                        name="gender"
                        type="radio"
                        required
                        value={v.id}
                        checked={v.id === gender}
                        onChange={e => handleChange(e, "gender")}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-sm text-gray-400">
                        {v.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="email" className={LabelClassName}>3. Email address *</label>
              <input
                type="text"
                name="email"
                id="email"
                required
                value={email}
                onChange={e => handleChange(e, "email")}
                className={InputClassName}
                placeholder="somebody@gmail.com"
              />
            </div>

            <div className="p-4">
              <label htmlFor="graduated_year" className={LabelClassName}>4. Graduated Year *</label>
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
                        onChange={e => handleChange(e, "graduated_year")}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-sm text-gray-400">
                        {v.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="degree_level" className={LabelClassName}>5. Degree Level *</label>
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
                        onChange={e => handleChange(e, "degree_level")}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-sm text-gray-400">
                        {v.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="p-4">
              <label htmlFor="major" className={LabelClassName}>6. Major (or Department) *</label>
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
                        onChange={e => handleChange(e, "major")}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-sm text-gray-400">
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
              <label htmlFor="has_other_degree" className={LabelClassName}>7. Have you received other degrees? *</label>
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
                        onChange={e => handleChange(e, "has_other_degree")}
                        className={RadioClassName}
                      />
                      <label htmlFor={v.id} className="ml-3 block text-sm text-gray-400">
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
                    value={other_degree}
                    onChange={e => handleChange(e, "other_degree")}
                    className={InputClassName}
                    placeholder="Please mention your degree"
                  />
                </div>
              </fieldset>
            </div>
          </>}
        </div>

        <div className="flex justify-end mr-10">
          <button
            type="submit"
            className="inline-flex space-x-2 items-center rounded-md border border-transparent bg-gradient-to-r from-violet-600 to-indigo-600 px-10 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span>Next</span>
            <svg width="16" height="10" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.4408 0.420908C11.5631 0.336512 11.7083 0.269553 11.8682 0.223866C12.0281 0.178179 12.1995 0.154663 12.3726 0.154663C12.5457 0.154663 12.7171 0.178179 12.877 0.223866C13.0369 0.269553 13.1821 0.336512 13.3043 0.420908L21.2006 5.85841C21.3231 5.94259 21.4204 6.0426 21.4867 6.1527C21.5531 6.2628 21.5872 6.38083 21.5872 6.50003C21.5872 6.61924 21.5531 6.73727 21.4867 6.84737C21.4204 6.95747 21.3231 7.05747 21.2006 7.14166L13.3043 12.5792C13.0572 12.7493 12.7221 12.8449 12.3726 12.8449C12.0231 12.8449 11.688 12.7493 11.4408 12.5792C11.1937 12.409 11.0549 12.1782 11.0549 11.9375C11.0549 11.6969 11.1937 11.4661 11.4408 11.2959L18.4079 6.50003L11.4408 1.70416C11.3183 1.61997 11.221 1.51997 11.1547 1.40987C11.0884 1.29977 11.0542 1.18174 11.0542 1.06253C11.0542 0.943329 11.0884 0.825297 11.1547 0.715197C11.221 0.605096 11.3183 0.50509 11.4408 0.420908Z" fill="white" />
              <path fillRule="evenodd" clipRule="evenodd" d="M0.52832 6.5C0.52832 6.25965 0.666974 6.02914 0.913779 5.85918C1.16058 5.68923 1.49532 5.59375 1.84436 5.59375H18.9528C19.3019 5.59375 19.6366 5.68923 19.8834 5.85918C20.1302 6.02914 20.2689 6.25965 20.2689 6.5C20.2689 6.74035 20.1302 6.97086 19.8834 7.14082C19.6366 7.31077 19.3019 7.40625 18.9528 7.40625H1.84436C1.49532 7.40625 1.16058 7.31077 0.913779 7.14082C0.666974 6.97086 0.52832 6.74035 0.52832 6.5Z" fill="white" />
            </svg>
          </button>
        </div>

      </form>

      <div className="absolute p-5 left-0">
        <img src={Img5} className="object-contain w-full md:min-w-[25rem]" />
      </div>
      <div className="absolute p-5 right-10 bottom-20 -z-10">
        <img src={Img6} className="object-contain w-full md:min-w-[25rem]" />
      </div>

    </div>
  )
}

export default Survey;
