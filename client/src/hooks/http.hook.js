import {useState, useCallback} from "react"

export const useHttp = ()  => {

	const [error,setError] = useState(null)

	const request = useCallback(async (url, method= 'GET',  body= null, headers='', mode='cors' ) => {



		try {
			if (body){
				body = JSON.stringify(body)
				headers = {'Content-Type':'application/json'}
			}

			console.log("body",body)
			const response = await fetch(url,{ method, body, headers, mode })

			const data = await response.json()



			if (!response.ok){
				throw new Error(data.message||'Запрос не прошел')
			}


			return data

		}catch (e) {

			setError(e.message)
			throw e

		}
	},[])

	const clearError = useCallback(() => setError(null),[])

	return { request, error, clearError}
}