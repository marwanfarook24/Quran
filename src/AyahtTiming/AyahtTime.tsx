import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";
import { useEffect, useState } from "react";
import axios from "axios";
const AyahtTime = () => {
  const [selected, setSelected] = useState(0);
  const [data, setdata] = useState([]);

  const back = () => {
    setSelected((selected) => Math.max(selected - 1, 0));
  };

  const next = () => {
    setSelected((selected) => Math.min(selected + 1, 2));
  };

  const getData = async () => {
    try {
      const data = await axios.get(
        "https://mp3quran.net/api/v3/ayat_timing?surah=2&read=5"
      );
      setdata(data.data);
      console.log(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="">
      <div className="flex  flex-col items-end ">
        <div className="h-[100vh]  w-[40%]  ">
          <div className="flex justify-around">
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
          <FlippingPages
            direction="left-to-right"
            onSwipeEnd={setSelected}
            selected={selected}
          >
            {data.map(({ page, id }) => (
              <div key={id} className="page ">
                <img src={`${page}`} alt="" />
              </div>
            ))}
          </FlippingPages>
        </div>
      </div>
    </div>
  );
};

export default AyahtTime;
