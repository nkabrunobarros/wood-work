import { getCountry } from '../mock/Countries'

const DisplayCountryName = async (id) => {
    console.log('country')
   await getCountry(id).then((country) => { 
    debugger;
    return `${country.label}`

}
    )
}
export default DisplayCountryName
