const useTime = (time) => {
    const minutes = Math.floor(time >= 60 ? time / 60 : '0');
    const timeRemaining = time - minutes * 60;
    const second = Math.floor(timeRemaining < 60 ? timeRemaining : 0);

    const timeRender = `${minutes < 10 ? '0' + minutes : minutes} : ${
        second < 10 ? '0' + second : second
    }`;

    return timeRender;
};
export default useTime;
