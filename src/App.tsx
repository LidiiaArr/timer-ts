import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./redux/store";
import {Timer} from "./Timer/Timer";
import Settings from "./Settings/Settings";
import {setValuesFromLSTC} from "./redux/timer-reducer";
import {Statistic} from "./Statistic/Statistic";

function App() {
    const dispatch = useAppDispatch()
    const store = useSelector<AppStateType>(state => state.timer)

    useEffect(()=> {
        dispatch(setValuesFromLSTC())
    },[])

    const showSettings = useSelector<AppStateType>(state => state.timer.showSetting)
    return (
        <main>
          {showSettings ? <Settings/> : <Timer/>}
            {!showSettings && <Statistic />}
        </main>
    );
}

export default App;
