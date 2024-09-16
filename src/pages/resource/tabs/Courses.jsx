import AppDiv from "../../../components/atoms/AppDiv";
import { AppPaper } from "../../../components/atoms/AppPaper";
import { Appcaption, Appfont } from "../../../utils/theme";
import DescriptionIcon from "@mui/icons-material/Description";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { gamma } from "../../../utils/theme/colors";

const Courses = ({ allCoursesList }) => {
  // console.log("allCoursesList has: ", allCoursesList);
  return (
    <div className="mt-15 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 px-8 md:px-16 lg:px-20 xl:px-24 gap-x-5 gap-y-10">
      {allCoursesList?.map((course) => (
        <div key={course.id} className="col-span-1">
          <img
            src={
              course.media !== "somemedialink"
                ? course.media
                : "https://w0.peakpx.com/wallpaper/903/781/HD-wallpaper-kylian-mbappe-fifa-22.jpg"
            }
            alt={course.title}
            className="w-full h-50 rounded-tl-[10px] rounded-tr-[10px]"
          />
          <AppPaper
            elevation={0}
            sx={{
              position: "relative",
              p: 2.5,
              width: "90%",
              top: { xs: -40 },
              left: 10,
              borderRadius: 5,
            }}
          >
            <Appfont
              sx={{
                fontSize: 18,
                fontWeight: 600,
                textAlign: "left",
              }}
              className="line-clamp-1"
            >
              {course.title}
            </Appfont>
            <div className="mt-3.5 flex items-center gap-2">
              <p className="text-sm text-[#44444F] font-regular font-roboto">
                Sebo Studio
              </p>
              <p className="text-sm text-[#92929D] font-regular font-roboto">
                Programming, Coding
              </p>
            </div>
            <AppDiv
              sx={{
                display: "flex",
                flexDirection: {
                  lg: "row",
                  xs: "column",
                },
                justifyContent: "space-between",
                mt: 4,
              }}
            >
              <AppDiv sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <DescriptionIcon sx={{ width: 15, color: "red" }} />
                <Appcaption>12 Modul</Appcaption>
              </AppDiv>
              <AppDiv sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WatchLaterIcon sx={{ width: 15, color: gamma }} />
                <Appcaption>50 Min / Session</Appcaption>
              </AppDiv>
            </AppDiv>
          </AppPaper>
        </div>
      ))}
    </div>
  );
};

export default Courses;
