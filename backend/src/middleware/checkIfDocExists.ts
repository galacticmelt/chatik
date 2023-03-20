import { Document } from "mongodb";
import { Query } from "mongoose";

function checkIfDocExists(
  boolean: boolean, 
  value: string, 
  getSomethingFunc: (params: unknown) => Query<Document, unknown>, 
  body: unknown
) {
  if(boolean === true) {
    return getSomethingFunc(body).then(something => {
      if(something.length === 0) {
        return Promise.reject(`No such entity as '${value}'`)
      }
    })
  } else if(boolean === false) {
      return getSomethingFunc(body).then(something => {
        if(something.length !== 0) {
          return Promise.reject(`Entity '${value}' doesn't exist`)
        }
      })
  }
}

export default checkIfDocExists;