import { useContext } from "react"
import { AudioContext } from "../layouts/components/AudioElement/AudioProvider"

const useAudio  = () => {
    const {audioRef } = useContext(AudioContext)  
    return audioRef 
}

export default useAudio 