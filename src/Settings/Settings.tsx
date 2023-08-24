import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../redux/store";
import ReactSlider from "react-slider"
import {setBreakMinutesTC, setShowSettingsTC, setWorkMinutesTC} from "../redux/timer-reducer";
import './slider.css'
import {BackButton} from "./BackButton";
import {ToggleSwitch} from "./ToggleSwitch";

const Settings = () => {
    const workMinutes = useSelector<AppStateType, number>(state => state.timer.workMinutes)
    const breakMinutes = useSelector<AppStateType, number>(state => state.timer.breakMinutes)

    const dispatch = useAppDispatch()
    const setWorkMinutesHandler = (e:number) => {
        dispatch(setWorkMinutesTC(e))
    }
    const setBreakMinutesHandler = (e:number) => {
        dispatch(setBreakMinutesTC(e))
    }
    const backHandler = () => {
        dispatch(setShowSettingsTC(false))
    }

    return (
        <div style={{textAlign: "left"}}>
            <label>work minutes: {workMinutes}:00</label>
            <ReactSlider
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={workMinutes}
                onChange={(e)=> {setWorkMinutesHandler(e)}}
                min={1}
                max={120}
            />
            <label>break minutes: {breakMinutes}:00</label>
            <ReactSlider
                className={'slider green'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={breakMinutes}
                onChange={(e)=> {setBreakMinutesHandler(e)}}
                min={1}
                max={120}
            />

            <ToggleSwitch />

            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <BackButton onClick={()=> {backHandler()}}/>
            </div>
        </div>
    );
};

export default Settings;