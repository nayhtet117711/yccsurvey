import { useState } from "react";
import { useMemo } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import XLSX from "xlsx";

export const useNavigator = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    return navigate("/")
  }
  const navigateSurvey = () => {
    return navigate({ pathname: "/survey", search: "?page=1" })
  }
  const navigateResult = () => {
    return navigate("/results")
  }

  const navigateAdmin = () => {
    return navigate("/admins")
  }

  return {
    navigateHome,
    navigateSurvey,
    navigateResult,
    navigateAdmin
  }
}

export const useAccountDetial = () => {
  const [cookies, , removeCookie] = useCookies(['account-details']);
  const accountDetail = useMemo(() => cookies["account-details"], [cookies["account-details"]])
  const isAdmin = useMemo(() => accountDetail?.is_admin, [accountDetail])
  const logout = () => {
    removeCookie("account-details")
  }
  return { isAdmin, accountDetail, isAuthenticated: !!accountDetail, logout }
}

export const useReadExcelFile = () => {
  const [inputEvent, setInputEvent] = useState(null)

  const handleUpload = (e) => {
    setInputEvent(e)
  }

  const uploadNow = () => {
    const e = inputEvent
    if(!e) return null
    e.preventDefault();

    const reset = () => {
      setTimeout(() => {
        e.target.value = ""
        setInputEvent(null)
      }, 5000);
    }

    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var rawData = e.target.result;
      let readedData = XLSX.read(rawData, { type: 'binary' });

      if (readedData.SheetNames.length == 0) return

      const wsname = readedData.SheetNames[0]; // take first sheet
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 }) || []
      if (dataParse.length < 2) {
        toast.error("No header found in excel!")
        reset()
        return true
      }

      const headers = dataParse[0] || []
      if (headers.length !== 3) {
        toast.error("Header names should be Email, Name, Password!")
        reset()
        return true
      }
      const isEmailHeader = headers?.[0] === "Email"
      const isNameHeader = headers?.[1] === "Name"
      const isPasswordHeader = headers?.[2] === "Password"
      if (!isEmailHeader || !isNameHeader || !isPasswordHeader) {
        toast.error("Header names should be Email, Name, Password!")
        reset()
        return true
      }

      const data = dataParse.filter((_, i) => i > 0)
      if (data.length === 0) {
        toast.error("Excel sheet is empty!")
        reset()
        return true
      }
      const imcompletedItems = data.filter(v => v.length !== 3 || v?.filter(vv => !vv).length > 0)
      if (imcompletedItems.length) {
        toast.error("There are some empty fields in excel!")
        reset()
        return true
      }

      for (const item of data) {
        const email = item[0]
        const name = item[1]
        const password = item[2]

        const loadingToastId = toast.loading(`Saving ${name}, ${email}...`)

        fetch(`${import.meta.env.VITE_API_URL}/accounts/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, name, password: `${password}` }),
        })
          .then(res => res.json())
          .then(data => {
            if (!data.success) throw new Error(data.message)
            toast.remove(loadingToastId)
          })
          .catch(error => {
            console.log("catch: ", error)
            toast.error(error.message + ` : ${name}, ${email}!`)
            toast.remove(loadingToastId)
          })
      }

    };
    reader.readAsBinaryString(f)
  }

  const reset = () => {
    const e = inputEvent
    if(!e) return
    const confirm = window.confirm("Remove the selected file?")
    if(!confirm) return
    setTimeout(() => {
      e.target.value = ""
      setInputEvent(null)
    }, 500);
  }

  return { handleUpload, uploadNow, inputEvent, reset }

}

export const useExportSurveyExcelFile = () => {

  const exportSurveyExcel = () => {
    const loadingToastId = toast.loading(`Exporting...`)
    fetch(`${import.meta.env.VITE_API_URL}/surveys-raw`, {
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(res => res.json())
        .then(data => {
          if (!data.success) throw new Error(data.message)
          const dataToExport = data.data.map(v => data.headers.reduce((r, c, i) => ({ ...r, [c]: v[i] }),{}))
          const ws = XLSX.utils.json_to_sheet(dataToExport, { header: data.headers })
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, ws, "Survey Data");
          XLSX.writeFileXLSX(wb, `Survey Data ${new Date().toLocaleDateString()}.xlsx`);

          toast.remove(loadingToastId)
        })
        .catch(error => {
          console.log("catch: ", error)
          toast.error(error.message)
          toast.remove(loadingToastId)
        })
    }

  return { exportSurveyExcel }
}