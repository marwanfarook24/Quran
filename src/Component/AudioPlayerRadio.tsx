import { RootState } from "../ReduxSystem/Store/Store";
import { useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import "../index.css";
import { Spinner } from "@chakra-ui/react";
import { useRadioPlaylistQuery } from "../ReduxSystem/RTkQuery/HomeApi";
const AudioPlayerRadio = () => {
  const [index, setindex] = useState(0);
  const { RadioObject } = useSelector(
    (state: RootState) => state.RadioStateSlice
  );
  const { language } = useSelector((state: RootState) => state.Settings);

  const { data } = useRadioPlaylistQuery(language === "ar" ? "ar" : "eng");

  useEffect(() => {


    setindex(RadioObject.index);
  }, [RadioObject]);

  return (
    <div className="sticky bottom-0">
      <AudioPlayer
        autoPlay={true}
        className="!bg-black !text-white !flex-row-reverse "
        src={`${data?.radios[index] ? data?.radios[index].url : RadioObject.url}`}

        defaultCurrentTime={<Spinner color="green.500" size="sm" />}
        defaultDuration={
          <span className=" flex  gap-5 h-3 w-10">
            <h1 className="relative">
              live
              <span className="animate-ping absolute  h-full w-3 rounded-full bg-red-400 opacity-75"></span>
            </h1>
          </span>
        }
        showSkipControls={true}
        onClickPrevious={() => {
          setindex(index < 1 ? index : index - 1);
        }}
        onClickNext={() =>
          // setindex(index == playlist.length - 1 ? 0 : index + 1)
          setindex(index + 1)
        }
        customControlsSection={[
          <div className="tablet:me-24 mobile:me-0 font-extrabold tablet:text-xl mobile:text-sm ">
            {data?.radios[index] ? data?.radios[index].name : RadioObject.nameAudio}
          </div>,
          RHAP_UI.ADDITIONAL_CONTROLS,
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS,
        ]}
      />
    </div>
  );
};

export default AudioPlayerRadio;
