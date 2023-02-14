import { useExportSurveyExcelFile, useReadExcelFile } from "../utils"

export const Admin = () => {
    const { handleUpload } = useReadExcelFile()
    const { exportSurveyExcel } = useExportSurveyExcelFile()

    return (
        <div className="min-h-[200px] grow block:flex-col md:flex divide-y-[1px] md:divide-y-0 gap-3 p-0 md:p-10 items-center">
            <div className="flex flex-col flex-1 py-5 p-8">
                <label htmlFor="upload-file" className="text-gray-700 pb-2 flex flex-col">
                    <strong>Upload Student Excel File</strong>
                    <small className="text-gray-400">Will take first Sheet and should be with Header<br/>
                        [
                            <span className="text-blue-500">Email</span>,
                            <span className="text-blue-500">Name</span>, 
                            <span className="text-blue-500">Password</span>
                        ]
                    </small>
                </label>
                <input 
                    type="file" 
                    name="upload-file" 
                    id="upload-file"
                    className="border bg-gray-50 p-1 rounded-lg shadow" 
                    onChange={handleUpload} 
                />
            </div>
            <div className="lex flex-col flex-1 py-5 p-8">
                <label className="text-gray-700 pb-2 flex flex-col">
                    <strong>Download Student Suvey Data</strong>
                    <small className="text-gray-400">Will download excel sheeet file</small><br/>
                </label>
                <div className="flex">
                    <button onClick={exportSurveyExcel} className="border px-10 py-2 rounded-lg text-gray-700 shadow bg-gray-50 hover:bg-gray-200 focus:bg-gray-300 focus:ring-2 focus:ring-blue-600">Download</button>
                </div>
            </div>
        </div>
    )
}