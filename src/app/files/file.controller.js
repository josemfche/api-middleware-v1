"use strict";
import CONFIG from "../../../config.js"
import { getFileNamesHelper, getFilesHelper } from "./file.helpers.js"

let SERVER_ADDRESS = CONFIG.SERVER_ADDRESS

export async function getFiles(req, res) {
  let { name } = req.query
  console.log({ name })
  try {
    const { data: fileNames } = await getFileNamesHelper(SERVER_ADDRESS)

    let filesData = await getFilesHelper(SERVER_ADDRESS, fileNames)

    name ? res.status(200).send({
      filesList: [filesData.find(elem => elem.file === name)]
    }) : res.status(200).send({
      filesList: filesData
    })


  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
}

export async function getFileNames(req, res) {
  try {
    const { data: fileNames } = await getFileNamesHelper(SERVER_ADDRESS)

    res.status(200).send(fileNames)

  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
}