import { useExportSurveyExcelFile, useReadExcelFile } from "../utils"

export const Admin = () => {
    const { handleUpload, uploadNow, inputEvent, reset} = useReadExcelFile()
    const { exportSurveyExcel } = useExportSurveyExcelFile()

    const downloadDemoExcelFile = (e) => {
        e.preventDefault()
        fetch("/Student Account Excel Demo.xlsx")
            .then(res => res.blob())
            .then(blob => {
                const generatedUrl = window.URL.createObjectURL(new Blob([blob]))
                const link = document.createElement("a")
                link.href = generatedUrl
                link.setAttribute("download", "Student Account Excel Demo.xlsx")
                document.body.appendChild(link)
                link.click()
                link.parentNode.removeChild(link);
            })
    }

    return (
        <div className="min-h-[200px] grow block:flex-col md:flex divide-y-[1px] md:divide-y-0 gap-3 p-0 md:p-10 items-start">
            <div className="flex flex-col flex-1 py-5 p-8">
                <label htmlFor="upload-file" className="text-gray-700 pb-2 flex flex-col">
                    <strong>Upload Student Excel File</strong>
                    <small className="text-gray-400">Will take first sheet and should be with Header<br/>
                        [
                            <span className="text-gray-500">Email</span>,
                            <span className="text-gray-500">Name</span>, 
                            <span className="text-gray-500">Password</span>
                        ]
                    </small>
                    <small className="duration-200 text-blue-500 cursor-pointer hover:underline hover:text-blue-600" tabIndex={0} onClick={downloadDemoExcelFile}>(Download Demo Excel)</small>
                </label>
                <input 
                    type="file" 
                    name="upload-file" 
                    id="upload-file"
                    className="border bg-gray-50 p-1 rounded-lg shadow" 
                    onChange={handleUpload} 
                />
                {!!inputEvent && (
                    <div className="py-3 flex gap-2">
                        <button onClick={reset} className="flex-1 border px-10 py-2 rounded-lg text-gray-700 shadow bg-gray-50 hover:bg-gray-200 focus:bg-gray-300 focus:ring-2 focus:ring-blue-600">Cancel</button>
                        <button onClick={uploadNow} className="flex-1 border px-10 py-2 rounded-lg text-white shadow bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:ring-2 focus:ring-blue-500">Upload</button>
                    </div>
                )}
            </div>
            <div className="lex flex-col flex-1 py-5 p-8">
                <label className="text-gray-700 pb-2 flex flex-col">
                    <strong>Download Student Suvey Data</strong>
                    <small className="text-gray-400">Download excel sheet file</small><br/>
                </label>
                <div className="flex">
                    <button onClick={exportSurveyExcel} className="border px-10 py-2 rounded-lg text-gray-700 shadow bg-gray-50 hover:bg-gray-200 focus:bg-gray-300 focus:ring-2 focus:ring-blue-600">Download</button>
                </div>
            </div>
        </div>
    )
}