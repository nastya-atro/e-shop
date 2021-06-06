import { CommonActionsTypes, CommonThunkType } from "./redux-store"


let initialState={
    
}



type InitialStateType= typeof initialState

const AppReducer = (state:InitialStateType = initialState, action: any):InitialStateType=>{
    switch (action.type) {
        

        default: return state
    }

}

export const actionsApp = {
   
}



export default AppReducer