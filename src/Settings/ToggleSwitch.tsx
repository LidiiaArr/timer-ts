import React, {ChangeEvent} from 'react';
import './toggle-switch.css'
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../redux/store";
import {setAutoStartTC} from "../redux/timer-reducer";

export const ToggleSwitch = (props: any) => {
    const dispatch = useAppDispatch()
    const autoStart = useSelector<AppStateType, boolean>(state => state.timer.autoStart)
    const toggleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setAutoStartTC(e.currentTarget.checked))
    }
    return (
        <div className={'checkbox-container'} {...props}>
            <label>Autostart</label>
            <input type="checkbox" id="switch" checked={autoStart} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                toggleHandler(e)
            }}/><label className={'checkbox'} htmlFor="switch">Toggle</label>

        </div>
    );
};