import footbalicon from "../../../assets/svg/football.svg";
import bascketball from "../../../assets/svg/bascketball.svg";
import hockey from "../../../assets/svg/hockey.svg";
import race from "../../../assets/svg/race.svg";
import soccer from "../../../assets/svg/soccer.svg";
import AppDiv from "../../../components/atoms/AppDiv";

const StickerCard = () => {
  const data = [
    {
      bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeoB5rr9Dk9AaJfy-SRW6YgqCeO4IWtr0Wvg&s",
      icon: footbalicon,
    },
    {
      bg: "https://i.abcnewsfe.com/a/54508fa4-688e-4072-bbf0-67930d1d0336/baseball-1-ap-gmh-230901_1693579673197_hpMain.jpg",
      icon: bascketball,
    },
    {
      bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDi3C3uxXekwNiUjG4feDuIWBSC8ba-bYJ6ucpImQDA&s",
      icon: hockey,
    },
    {
      bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJAPHOvICU_b5_XsoTDR-oy5vXsLFZZCADEzcNtu8Fw&s",
      icon: race,
    },
    {
      bg: "https://www.qcnews.com/wp-content/uploads/sites/109/2022/09/1040x585-2022-0110-best-size-5-soccer-ball-5a0ad2.jpg",
      icon: soccer,
    },
  ];
  return (
    <AppDiv
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: {
          lg: "nowrap",
          xs: "wrap",
        },
        width: "100%",
      }}
    >
      {data.map((items, id) => {
        return (
          <div key={id} style={{ width: "100%" }}>
            <img style={{ borderRadius: 20, width: "100%", height: 150 }} src={items.bg} alt="" />
            <img
              style={{
                position: "relative",
                borderRadius: 20,
                width: 100,
                height: 75,
                bottom: 40,
                left: 50,
              }}
              src={items.icon}
              alt=""
            />
          </div>
        );
      })}
    </AppDiv>
  );
};

export default StickerCard;
