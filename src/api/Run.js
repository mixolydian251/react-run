// Functions for RunPage.js

export const stringifyTime = (t) => {
  const ms = (time) => {
    const ms = String(time);
    return ms.length > 2 ? ms.substring(ms.length - 3, ms.length - 1) : '00'
  };

  const sec = (time) => {
    const sec = Math.floor(((time % 60000) / 1000)).toFixed(0);
    return sec < 10 ? `0${sec}`: `${sec}`
  };

  const min = (time) => {
    const minute = Math.floor(time / 60000);
    return minute < 10 ? `0${minute}`: `${minute}`
  };

  return `${min(t)}:${sec(t)}:${ms(t)}`
};


export const calculateDistance = (hrs, mph, prevDist) => {
  return (hrs * mph) + prevDist
};
