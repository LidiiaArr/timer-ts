import {AppStateType} from "./store";
import {Dispatch} from "redux";
import {v1} from "uuid";


const initialState = {
    showSetting: false, //показать настройки
    autoStart: false,
    workMinutes: 45,
    breakMinutes: 15,
    isPaused: true,
    mode: "work" as modeType,
    statistic: []
}
export type modeType = ("work" | "break")
export type statisticType = pomodoroType[]
export type pomodoroType = {
    id: string
    workTime: number
}

type InitialStateType = {
    showSetting: boolean
    autoStart: boolean
    workMinutes: number
    breakMinutes: number
    isPaused: boolean
    mode: modeType
    statistic: statisticType
}

type ActionType = setWorkMinutesActionType
    | setBreakMinutesActionType
    | setShowSettingsActionType
    | setModeActionType
    | setAutoStartType
    | SetModeFromLSActionType
    | SetStatisticFromLSActionType
    | addPomodoroActionType
    | deleteStatisticActionType

export const timerReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET-WORK-MINUTES":
            return {
                ...state, workMinutes: action.workMinutes
            }
        case "SET-BREAK-MINUTES":
            return {
                ...state, breakMinutes: action.breakMinutes
            }
        case "SET-SHOW-SETTINGS":
            return {
                ...state, showSetting: action.showSetting
            }
        case "SET-MODE":
            return {
                ...state, mode: action.mode
            }
        case "SET-AUTO-START":
            return {
                ...state, autoStart: action.autoStart
            }
        case "SET-MODE-FROM-LOCAL-STORAGE":
            return {
                ...state, autoStart: action.autoStart
            }
        case "SET-STATISTIC-FROM-LOCAL-STORAGE":
            return {
                ...state, statistic: action.statistic
            }
        case "ADD-POMODORO":
            return {
                ...state, statistic: [...state.statistic, {
                    id: action.newPomodoro.id,
                    workTime: action.newPomodoro.workTime
                }]
            }
        case "DELETE-STATISTIC":
            return {
                ...state, statistic: []
            }
        default:
            return state
    }
}

export const setWorkMinutesAC = (workMinutes: number) => ({type: "SET-WORK-MINUTES", workMinutes} as const)
export type setWorkMinutesActionType = ReturnType<typeof setWorkMinutesAC>
export const setWorkMinutesTC = (minutes: number) => (dispatch: Dispatch) => {
    dispatch(setWorkMinutesAC(minutes))
    dispatch(setModeAC('work'))
}

export type setBreakMinutesActionType = ReturnType<typeof setBreakMinutesAC>
export const setBreakMinutesAC = (breakMinutes: number) => ({type: "SET-BREAK-MINUTES", breakMinutes} as const)
export const setBreakMinutesTC = (minutes: number) => (dispatch: Dispatch) => {
    dispatch(setBreakMinutesAC(minutes))
}

export type setShowSettingsActionType = ReturnType<typeof setShowSettingsAC>
export const setShowSettingsAC = (showSetting: boolean) => ({type: "SET-SHOW-SETTINGS", showSetting} as const)
export const setShowSettingsTC = (showSetting: boolean) => (dispatch: Dispatch) => {
    dispatch(setShowSettingsAC(showSetting))
}

export type setModeActionType = ReturnType<typeof setModeAC>
export const setModeAC = (mode: modeType) => ({type: "SET-MODE", mode} as const)
export const setModeTC = (mode: modeType) => (dispatch: Dispatch) => {
    dispatch(setModeAC(mode))
}


export type setAutoStartType = ReturnType<typeof setAutoStartAC>
export const setAutoStartAC = (autoStart: boolean) => ({type: "SET-AUTO-START", autoStart} as const)
export const setAutoStartTC = (autoStart: boolean) => (dispatch: Dispatch) => {
    dispatch(setAutoStartAC(autoStart))
    localStorage.setItem('autoStart', JSON.stringify(autoStart))
}


export type SetModeFromLSActionType = ReturnType<typeof setModeFromLSAC>
export const setModeFromLSAC = (autoStart: boolean) => ({type: 'SET-MODE-FROM-LOCAL-STORAGE', autoStart} as const)


export type SetStatisticFromLSActionType = ReturnType<typeof setStatisticFromLSAC>
export const setStatisticFromLSAC = (statistic: statisticType) => ({
    type: 'SET-STATISTIC-FROM-LOCAL-STORAGE',
    statistic
} as const)

export const setValuesFromLSTC = () => (dispatch: Dispatch) => { //берем данные из Local Storage
    let modeAsString = localStorage.getItem('autoStart')
    let statisticAsString = localStorage.getItem('statistic')
    if (modeAsString) {
        let newValue = JSON.parse(modeAsString)
        dispatch(setModeFromLSAC(!!newValue))
    }
    if (statisticAsString) {
        let newValue = JSON.parse(statisticAsString)
        dispatch(setStatisticFromLSAC(newValue))
    }
}

export type addPomodoroActionType = ReturnType<typeof addPomodoroAC>
export const addPomodoroAC = (newPomodoro: pomodoroType) => ({type: 'ADD-POMODORO', newPomodoro} as const)
export const addStatisticToLSTC = (value: number) => (dispatch: Dispatch, getState: () => AppStateType) => {
    let currentStatistic = getState().timer.statistic
    let newPomodoro = {id: v1(), workTime: value}
    localStorage.setItem('statistic', JSON.stringify([...currentStatistic, newPomodoro]))
    dispatch(addPomodoroAC(newPomodoro))
}

export type deleteStatisticActionType = ReturnType<typeof deleteStatisticAC>
export const deleteStatisticAC = () => ({type: 'DELETE-STATISTIC'} as const)
export const deleteStatisticFromReduxAndLSTC = () => (dispatch: Dispatch) => {
    localStorage.clear();
    dispatch(deleteStatisticAC())
}
