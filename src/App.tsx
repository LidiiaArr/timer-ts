import React, {useEffect} from 'react';
import './App.css';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./redux/store";
import {Timer} from "./Timer/Timer";
import Settings from "./Settings/Settings";
import {setValuesFromLSTC} from "./redux/timer-reducer";
import {Statistic} from "./Statistic/Statistic";

function App() {
    const showSettings = useSelector<AppStateType>(state => state.timer.showSetting)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(setValuesFromLSTC())
    },[dispatch])

    return (
        <main>
          {showSettings ? <Settings/> : <Timer/>}
            {!showSettings && <Statistic />}
        </main>
    );
}

export default App;
