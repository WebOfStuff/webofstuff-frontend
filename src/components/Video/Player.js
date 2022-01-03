import { useCallback, useEffect, useState } from 'react'
import videojs from 'video.js'
import 'videojs-youtube'

const Player = (props) => {
    const [videoEl, setVideoEl] = useState(null)
    const onVideo = useCallback((el) => {
        setVideoEl(el)
    }, [])

    useEffect(() => {
        if (videoEl == null) return
        const player = videojs(videoEl, props)
        return function cleanup() {player.dispose()};
    }, [props, videoEl]);

    return (
                <div className="data-vjs-player">
                    <video ref={onVideo} className="video-js" playsInline />
                </div>
    )
}

export default Player