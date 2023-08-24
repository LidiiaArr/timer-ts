import React from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {PlayButton} from "./PlayButton";
import {PauseButton} from "./PauseButton";
import {SettingButton} from "./SettingButton";
import {useState} from "react";
import {useEffect} from "react"
import {useRef} from "react"
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../redux/store";
import {
    addStatisticToLSTC,
    modeType,
    setBreakMinutesTC,
    setModeTC,
    setShowSettingsTC,
    setWorkMinutesTC
} from "../redux/timer-reducer";
import {Peach} from "./Peach";
import {Eggplant} from "./Eggplant";

const red = '#f54e4e'
const green = '#4aec8c'

export function Timer() {
    const mode = useSelector<AppStateType, modeType>(state => state.timer.mode)
    const workMinutes = useSelector<AppStateType, number>(state => state.timer.workMinutes)
    const breakMinutes = useSelector<AppStateType, number>(state => state.timer.breakMinutes)
    const autoStart = useSelector<AppStateType, boolean>(state => state.timer.autoStart)

    const dispatch = useAppDispatch()

    const [secondsLeft, setSecondsLeft] = useState<number>(0)//храним количество секунд
    const [isPaused, setPaused] = useState(true)

    const secondsLeftRef = useRef(secondsLeft)//позволяет сохранить некоторый объект,
    // который можно можно изменять и который хранится в течение всей жизни компонента.
    //В качестве параметра функция useRef() принимает начальное значение хранимого объекта.
    // А возвращаемое значение - ссылка-объект, из свойства current которого можно получить хранимое значение.
    const isPausedRef = useRef(isPaused)
    const modeRef = useRef(mode)

    function tick() {
        secondsLeftRef.current--
        setSecondsLeft(secondsLeftRef.current);
    } //Функция "tick" уменьшает значение оставшихся секунд на 1 и обновляет состояние.

    useEffect(() => {
        function switchMode() {
            let nextMode
            if (modeRef.current === 'work') nextMode = 'break'
            if (modeRef.current === 'break') nextMode = 'work'

            dispatch(setModeTC(nextMode as modeType))
            modeRef.current = nextMode as modeType;

            const nextSeconds = (nextMode === 'work' ? workMinutes : breakMinutes) * 60
            setSecondsLeft(nextSeconds)
            secondsLeftRef.current = nextSeconds
            if(!autoStart){
                setPaused(true)
                isPausedRef.current = true
            }else {
                setPaused(false)
                isPausedRef.current = false
            }
        }

        secondsLeftRef.current = workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);
        //перезаписываем переменную secondsLeft с 0 там будет храниться количество секунд из настроек

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {

                if(mode === 'work') dispatch(addStatisticToLSTC(workMinutes))

                return switchMode();
            }
            tick();
        }, 1000);

        return () => clearInterval(interval)
    }, [workMinutes, breakMinutes, mode])

    const totalSeconds = mode === 'work' ? workMinutes * 60 : breakMinutes * 60
    //получаем всего количество секунд
    const percentage = Math.round(secondsLeft / totalSeconds * 100)
    //Math.round округление до ближайщего целого

    const minutes = Math.floor(secondsLeft / 60)

    let seconds: number | string = secondsLeft % 60
    if (seconds < 10) seconds = '0' + seconds

    const peachHandler = () => {
        dispatch(setWorkMinutesTC(25));
        dispatch(setBreakMinutesTC(5));
    }

    const eggplantHandler = () => {
        dispatch(setWorkMinutesTC(45));
        dispatch(setBreakMinutesTC(15));
    }
    return (
        <div>
            <div style={{marginTop: '5px', marginLeft: '500px'}}>
                <SettingButton onClick={() => {
                    dispatch(setShowSettingsTC(true))
                }}/>
            </div>
            <Peach onClick={() => {
                peachHandler()
            }}/>
            <Eggplant onClick={() => {
                eggplantHandler()
            }}/>
            <CircularProgressbar
                value={percentage}
                text={String(minutes) + ':' + String(seconds)}
                styles={buildStyles({
                    textColor: '#fff',
                    pathColor: mode === 'work' ? red : green,
                    trailColor: 'rgba(255,255,255,.2)',
                })}/>
            <div style={{marginTop: '20px', marginBottom: '20px'}}>
                {isPaused
                    ? <PlayButton onClick={() => {
                        setPaused(false);
                        isPausedRef.current = false
                    }}/>
                    : <PauseButton onClick={() => {
                        setPaused(true);
                        isPausedRef.current = true
                    }}/>}
            </div>

        </div>
    );
};