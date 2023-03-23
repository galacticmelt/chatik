import { Document } from "mongodb";
import { Query } from "mongoose";

function checkIfDocExists(
  boolean: boolean, 
  value: string, 
  getSomethingFunc: (params: any) => Query<any, unknown>, 
  body: unknown
) {
  if(boolean === true) {
    return getSomethingFunc(body).then(something => {
      if(something.length === 0) {
        return Promise.reject(`Entity '${value}' doesn't exist`)
      }
    })
  } else if(boolean === false) {
      return getSomethingFunc(body).then(something => {
        if(something.length !== 0) {
          return Promise.reject(`Entity '${value}' already exist`)
        }
      })
  }
}

export default checkIfDocExists;