import axios from "axios"

const ref = "4ecab30b408aa3fc16eb058d13a35703";

const service = axios.create({
   baseURL: "https://www.jsonbulut.com/json/",
   timeout: 10000
})

export function getResult() {
    const params = {
        ref: ref,
        formId: 54
        //37
        //51
    }

    return service.get('forms.php', { params: params })
}