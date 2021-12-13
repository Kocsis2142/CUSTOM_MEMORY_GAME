export const getTime = (sec) => {
    const time = new Date()
    time.setSeconds(time.getSeconds() + sec)
    return time
}
