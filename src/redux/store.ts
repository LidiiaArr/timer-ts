import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {timerReducer} from "./timer-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    timer: timerReducer
})
export type AppStateType = ReturnType<typeof rootReducer>
export const store  = createStore(rootReducer, applyMiddleware(thunk))
//добавляем в стор мидлваре

export type AppStoreType = typeof store

export type AppDispatchType = ThunkDispatch<AppStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;