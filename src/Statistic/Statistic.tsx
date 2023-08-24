import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {pomodoroType} from "../redux/timer-reducer";

type PomidoroType = {
    id: string
    workTime: string
}
export const Statistic = () => {
    const data = useSelector<AppStateType, pomodoroType[]>(state => state.timer.statistic)
    const dataForRendering: PomidoroType[] = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].workTime === 1) {
            const obj = {id: data[i].id, workTime: "🍑"};
            dataForRendering.push(obj)
        } else if (data[i].workTime === 2) {
            const obj = {id: data[i].id, workTime: " 🍆"};
            dataForRendering.push(obj)
        } else {
            const obj = {id: data[i].id, workTime: (String(data[i].workTime) + ' '+ 'minutes')};
            dataForRendering.push(obj)
        }
    }
    return (
        <div>
            {dataForRendering?.map((p) => {
                return (<div key={p.id}style={{marginBottom: '5px'}}>{p.workTime}</div>)
            })}
        </div>
    );
};

