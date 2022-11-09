import CONFIG from "../../../config.js"
import axios from "axios"
import csv from "csvtojson"

let AUTHORIZATION_BEARER = CONFIG.AUTHORIZATION_BEARER

export async function getFileNamesHelper(url = '') {
  const response = await axios.get(url + "files", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': AUTHORIZATION_BEARER
    },
  });
  return response
}

export async function getFilesHelper(url = '', fileNamesObj) {

  let { files: fileNames } = fileNamesObj

  let filesData = await Promise.all(fileNames.map(async fileName => {
    try {
      let res = await axios.get(url + `file/${fileName}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AUTHORIZATION_BEARER
        },
      });
        const csvToJson = await csv().fromString(res.data)
        let jsonFiltered = csvToJson.filter(elem => Object.keys(elem).length === 4)
        let obj = {}
        obj.file = jsonFiltered[0].file
        obj.lines = []
        for(let i of jsonFiltered) {
          obj.lines.push({
            text: i.text,
            number: i.number,
            hex: i.hex
          })
        }
        return obj

    } catch (err) {
      console.log("Error on getting data")
    }
  }))

  return filesData.filter(elem => elem !== undefined)
}