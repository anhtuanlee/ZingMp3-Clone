const useDate = (times) => {
    const newTime = new Date(times);
    const timeResult = newTime.toLocaleDateString();
    return timeResult;
};

export default useDate;
