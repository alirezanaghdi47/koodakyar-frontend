import {useRef, useState} from "react";
import Image from "next/image";

//===== libraries =====//
import ReactPlayer from 'react-player';
import Slider from 'react-rangeslider';
import { useHover } from 'usehooks-ts';
import {Box, IconButton, Stack, Typography} from "@mui/material";
import {HiSpeakerXMark, HiSpeakerWave, HiPlay, HiPause} from "react-icons/hi2";
import {BsPipFill} from "react-icons/bs";

//===== utils =====//
import {placeholderDataUrl} from "@/utils/constants";
import {formatDuration} from "@/utils/functions";

const VideoPlayer = ({src, poster}) => {

    const containerRef = useRef(null);

    const isHover = useHover(containerRef);

    const playerRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [seeking, setSeeking] = useState(false);
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [pip, setPip] = useState(false);

    const _handleTogglePlaying = () => setPlaying(!playing);
    const _handleToggleMuted = () => setMuted(!muted);
    const _handleTogglePip = () => setPip(!pip);
    const _handleVolumeChange = (value) => setVolume(value);
    const _handleSeekMouseDown = () => setSeeking(true);
    const _handleSeekChange = (value) => {
        setPlayed(value);
        playerRef?.current?.seekTo(value);
        setPlaying(true);
    }
    const _handleSeekMouseUp = () => setSeeking(false);
    const _handleDuration = (duration) => setDuration(duration);
    const _handleProgress = (state) => {
        if (!seeking) {
            setLoaded(state?.loaded);
            setPlayed(state?.played);
        }
    }
    const _handleEnded = () => setPlaying(true);

    return (
        <Box
            ref={containerRef}
            style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "max-content",
                borderRadius: 8,
                overflow: "hidden"
            }}
        >

            <Stack
                direction="column"
                gap={2}
                justifyContent="center"
                alignItems="center"
                width="100%"
                sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 8,
                    zIndex: 10,
                    background: "linear-gradient(180deg, rgba(32, 32, 32, 0) 0%, #1f2937 100%)",
                    padding: "16px",
                    borderRadius: 1,
                    visibility: (isHover && played > 0) ? "visible" : "hidden"
                }}
            >

                {/* timeline */}
                <Slider
                    min={0}
                    max={0.999999}
                    tooltip={false}
                    value={played}
                    step={0.0000000000000001}
                    onChangeStart={_handleSeekMouseDown}
                    onChange={_handleSeekChange}
                    onChangeComplete={_handleSeekMouseUp}
                />

                <Stack
                    direction="row"
                    gap={1}
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >

                    <Stack
                        direction="row"
                        gap={2}
                        justifyContent="end"
                        alignItems="center"
                    >

                        {/* pip */}
                        <IconButton
                            variant="contained"
                            color="primary"
                            onClick={_handleTogglePip}
                        >
                            <BsPipFill size={16}/>
                        </IconButton>

                    </Stack>

                    <Stack
                        direction="row"
                        gap={1}
                        justifyContent="start"
                        alignItems="center"
                    >

                        {/* time */}
                        <Stack
                            direction="row"
                            gap={1}
                            justifyContent="center"
                            alignItems="center"
                            width={80}
                        >

                            <Typography
                                variant="caption"
                                color="common.white"
                                fontWeight="bold"
                            >
                                {formatDuration(duration)}
                            </Typography>

                            <Typography
                                variant="caption"
                                color="common.white"
                                fontWeight="bold"
                            >
                                /
                            </Typography>

                            <Typography
                                variant="caption"
                                color="common.white"
                                fontWeight="bold"
                            >
                                {formatDuration(duration * played)}
                            </Typography>

                        </Stack>

                        {/* volume */}
                        <Box style={{width: 60}}>

                            <Slider
                                min={0}
                                max={1}
                                tooltip={false}
                                value={volume}
                                step={0.01}
                                onChange={_handleVolumeChange}
                            />

                        </Box>

                        {/* mute */}
                        <IconButton
                            variant="contained"
                            color="primary"
                            onClick={_handleToggleMuted}
                        >
                            {
                                muted ? (
                                    <HiSpeakerXMark size={16}/>
                                ) : (
                                    <HiSpeakerWave size={16}/>
                                )
                            }
                        </IconButton>

                        {/* play */}
                        <IconButton
                            variant="contained"
                            color="primary"
                            onClick={_handleTogglePlaying}
                        >
                            {
                                playing ? (
                                    <HiPause size={16}/>
                                ) : (
                                    <HiPlay size={16}/>
                                )
                            }
                        </IconButton>

                    </Stack>

                </Stack>

            </Stack>

            {
                playing || played > 0 ? (
                    <ReactPlayer
                        ref={playerRef}
                        url={src}
                        playing={playing}
                        volume={volume}
                        muted={muted}
                        pip={pip}
                        width="100%"
                        height="100%"
                        onPlay={() => setPlaying(true)}
                        onEnablePIP={() => setPip(true)}
                        onDisablePIP={() => setPip(false)}
                        onPause={() => setPlaying(false)}
                        onEnded={_handleEnded}
                        onProgress={(state) => _handleProgress(state)}
                        onDuration={(duration) => _handleDuration(duration)}
                    />
                ) : (
                    <Box
                        className="aspect-ratio aspect-ratio__2-1"
                        style={{
                            background: "#e5e7eb",
                            borderRadius: 8,
                        }}
                    >

                        <IconButton
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={_handleTogglePlaying}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                zIndex: 10,
                                transform: "translate(-50% , -50%)"
                            }}
                        >
                            <HiPlay size={24}/>
                        </IconButton>

                        <Image
                            src={poster}
                            alt="poster"
                            fill
                            placeholder="blur"
                            blurDataURL={placeholderDataUrl}
                            style={{borderRadius: 8}}
                        />

                    </Box>
                )
            }

        </Box>
    )
}

export default VideoPlayer;