import { RootState } from "../ReduxSystem/Store/Store";
import { useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import "../index.css";
import { Spinner } from "@chakra-ui/react";
const AudioPlayerPrimary = () => {
  const [index, setindex] = useState(0);
  const { playlist, suwraid, mainPageReciters } = useSelector(
    (state: RootState) => state.RecitersData
  );


  useEffect(() => {
    setindex(suwraid.index)
  }, [suwraid.index])
  return (
    <div className="sticky bottom-0">
      {mainPageReciters ? (
        <AudioPlayer
          className="!bg-black !text-white !flex-row-reverse "
          src={suwraid.currentplaylist[index]?.src}
          autoPlay={true}
          defaultCurrentTime={<Spinner color="green.500" size="xs" />}
          defaultDuration={<Spinner size="xs" color="green.500" />}
          showSkipControls={true}
          onClickPrevious={() => {
            setindex(index < 1 ? index : index - 1);
          }}
          onClickNext={() =>
            setindex(index == suwraid.currentplaylist.length - 1 ? 0 : index + 1)
          }
          customControlsSection={[
            <div className="mobile:m-0 tablet:me-24 font-extrabold mobile:text-sm tablet:text-lg ">
              {suwraid.currentplaylist[index]?.name}
            </div>,
            RHAP_UI.ADDITIONAL_CONTROLS,
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
        />
      ) : (
        <div>
          {!playlist.length ? (
            <></>
          ) : (
            <AudioPlayer
              className="!bg-black !text-white !flex-row-reverse "
              autoPlay={true}
              src={playlist[index].src}
              defaultCurrentTime={<Spinner color="green.500" size="xs" />}
              defaultDuration={<Spinner size="xs" color="green.500" />}
              showSkipControls={true}
              onClickPrevious={() => {
                setindex(index < 1 ? index : index - 1);
              }}
              onClickNext={() =>
                setindex(index == playlist.length - 1 ? 0 : index + 1)
              }
              customControlsSection={[
                <div className="me-24 font-extrabold text-xl ">
                  {playlist[index].name}
                </div>,
                RHAP_UI.ADDITIONAL_CONTROLS,
                RHAP_UI.MAIN_CONTROLS,
                RHAP_UI.VOLUME_CONTROLS,
              ]}
            />
          )}
        </div>
      )}
    </div>


  );
};

export default AudioPlayerPrimary;
