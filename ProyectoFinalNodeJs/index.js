import axios from "axios";
const URL = "http://localhost:8080"
const testServerEndPoints = async()=>{
    try {

        const response = await axios.get(`${URL}/api/products`)
       // const data = await response.json()
        console.log(response.data)

    } catch (error) {
        
    }
    try {

        let body = {
    
            title: "Lapiz",
            price : 100.232,
            thumbnail : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACFCAMAAABCBMsOAAAA4VBMVEX////5yAL1rgD5xgD/e8L5zHz52Fb2ty31qwD8///5yhv4y4jzwTD2vSr30Y36z4QAAADT09P8o9D+dcH7rNT/cb3YyNHS09fezqL7vNzMzMzl5eX4u3v74Zn89vv8xuH77PT5hsT7jcX+1+zm2uHm2rzawZjf0Z/s3cr4tyH2uwv1yFT4yl3zyU33yTr64Kn52on3wXH3tmD61aH++Of5yJX779L52bn5xIT2t3D+9+776Lj75c3768P4z6X869mmlF/dt32vhlbbvaAXEw1ubm5FRUW4uLicnJyAgIBaWlpwbyhxAAABmElEQVR4nO3bW1OCUBiF4U8MtTLahnRA0Ewz7aBWVtrZTpb//we1EVS6b1qY671wuHyGj80gwxZhjDH2163GflGVK8WtSZUyDrFfdewwpwpjlKv2yjTnAKWoOSvznBpIUfyh2ANdokWbCioWQmGjFPXteHUMQkqu6xbC9FFp6RU7UTjFYaPR2J10pI+aIIWZM1qZdFDq2MhZoDWiFdlMOqVb29AKDEJMI4EK1ESooIIKKqigggoqqKBiGRV5KqiggorFUuQSoUjGuUjEu5zEKDapoIIKKqigggoq/qciEc+dVMz/j1BBBRVUUEEFFb+kwCDi32vlDcOEKVrZTPvk9KwdPOWgFB2z210POx9cXIIUPd/3rVDR97weSCGdmcLzrmD7Jq6nCn0qblAIka7vR4rBLU5xN1PgBjIZSaS4xyFEogvD86B7eh58qx8oHpGI4JYxGcgTVKFvGYGiD1whQc3noTV8ecUipKTUm1IFsELelVIfaISMtOITjRDRCtQWgVhfaowm6Fw1QhOCxgkYiAh8mTLGGMP1DQ2eO1VXPTwXAAAAAElFTkSuQmCC"
            
            }
        const response = await axios.post(`${URL}/api/products`,body)
       // const data = await response.json()
        console.log(response.data)

    } catch (error) {
        
    }
    try {

        let body = {
    
            title: "Lapiz negro",
            price : 150.232,
            thumbnail : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACFCAMAAABCBMsOAAAA4VBMVEX////5yAL1rgD5xgD/e8L5zHz52Fb2ty31qwD8///5yhv4y4jzwTD2vSr30Y36z4QAAADT09P8o9D+dcH7rNT/cb3YyNHS09fezqL7vNzMzMzl5eX4u3v74Zn89vv8xuH77PT5hsT7jcX+1+zm2uHm2rzawZjf0Z/s3cr4tyH2uwv1yFT4yl3zyU33yTr64Kn52on3wXH3tmD61aH++Of5yJX779L52bn5xIT2t3D+9+776Lj75c3768P4z6X869mmlF/dt32vhlbbvaAXEw1ubm5FRUW4uLicnJyAgIBaWlpwbyhxAAABmElEQVR4nO3bW1OCUBiF4U8MtTLahnRA0Ewz7aBWVtrZTpb//we1EVS6b1qY671wuHyGj80gwxZhjDH2163GflGVK8WtSZUyDrFfdewwpwpjlKv2yjTnAKWoOSvznBpIUfyh2ANdokWbCioWQmGjFPXteHUMQkqu6xbC9FFp6RU7UTjFYaPR2J10pI+aIIWZM1qZdFDq2MhZoDWiFdlMOqVb29AKDEJMI4EK1ESooIIKKqigggoqqKBiGRV5KqiggorFUuQSoUjGuUjEu5zEKDapoIIKKqigggoq/qciEc+dVMz/j1BBBRVUUEEFFb+kwCDi32vlDcOEKVrZTPvk9KwdPOWgFB2z210POx9cXIIUPd/3rVDR97weSCGdmcLzrmD7Jq6nCn0qblAIka7vR4rBLU5xN1PgBjIZSaS4xyFEogvD86B7eh58qx8oHpGI4JYxGcgTVKFvGYGiD1whQc3noTV8ecUipKTUm1IFsELelVIfaISMtOITjRDRCtQWgVhfaowm6Fw1QhOCxgkYiAh8mTLGGMP1DQ2eO1VXPTwXAAAAAElFTkSuQmCC"
            
            }
            let id = "63ea6f2b0d04d513c9df45a5"
        const response = await axios.put(`${URL}/api/products/${id}`,body)
       // const data = await response.json()
        console.log(response.data)

    } catch (error) {
        
    }
    try {

        
            let id = "63ea8663cde42c389ea75585"
        const response = await axios.delete(`${URL}/api/products/${id}`)
       // const data = await response.json()
        console.log(response.data)

    } catch (error) {
        
    }
    try {

        
        let id = "63ea7728658605e423a98fee"
    const response = await axios.get(`${URL}/api/products/${id}`)
   // const data = await response.json()
    console.log(response.data)

} catch (error) {
    
}
}
testServerEndPoints()