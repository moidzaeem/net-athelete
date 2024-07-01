import { Avatar, Stack } from "@mui/material";
import cameraIcon from "../../../../assets/svg/camera.svg";
import bgRec from "../../../../assets/svg/bgRec.svg";
import { AppButton } from "../../../../components/atoms/AppButton";
import EditIcon from "@mui/icons-material/Edit";
import AppDiv from "../../../../components/atoms/AppDiv";
import { Appheading } from "../../../../utils/theme";
import AppTextFeild from "../../../../components/molecules/AppTextFeild";
import PersonIcon from "../../../../assets/red-svgs/profile.svg";
import smsIcon from "../../../../assets/red-svgs/sms.svg";
import globalIcon from "../../../../assets/red-svgs/global.svg";
import locationIcon from "../../../../assets/red-svgs/location.svg";
import discover from "../../../../assets/red-svgs/discover.svg";
import calendar from "../../../../assets/red-svgs/calendar-2.svg";
import pc from "../../../../assets/red-svgs/profile-circle.svg";
import { alpha, beta } from "../../../../utils/theme/colors";
import AppSelect from "../../../../components/molecules/AppSelect";
import gender from "../../../../assets/red-svgs/gender.svg";
import briefcase from "../../../../assets/red-svgs/briefcase.svg";

const PersonalInfoTab = () => {
  return (
    <div
      style={{
        backgroundImage: `url("${bgRec}")`,
        backgroundSize: "cover",
        width: "100%",
        height: "170px",
      }}
    >
      <p style={{ color: "transparent" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ducimus alias illum unde
        quaerat, ratione beatae nostrum cumque eius ex consequuntur doloribus magni aliquam. Placeat
        facere minima nesciunt ipsam error.
      </p>
      <AppDiv sx={{ textAlign: "right" }}>
        <AppButton
          startIcon={<EditIcon />}
          variant="contained"
          sx={{ background: "black", color: "white", top: 70, right: 30 }}
        >
          Change Image
        </AppButton>
      </AppDiv>
      <Avatar
        alt={cameraIcon}
        src={cameraIcon}
        sx={{ width: 100, height: 100, top: 40, left: 30 }}
      />
      <AppDiv
        sx={{
          background: "white",
          p: {
            lg: 4,
            xs: 2,
          },
        }}
      >
        <AppDiv height={60} sx={{ background: "white" }} />
        <Appheading sx={{ textAlign: "left", background: "white" }}>
          Personal Information
        </Appheading>
        <AppDiv height={30} />
        <AppDiv
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <AppTextFeild label={"First Name"} placeholder="Last name" icon={PersonIcon} />
          <AppTextFeild label={"Last Name"} placeholder="Last name" icon={PersonIcon} />
        </AppDiv>

        <AppDiv height={30} />
        <AppTextFeild
          label={"Description"}
          placeholder="I’m UI Designer with 2 years experience. I have good communication skills and  can collaborate with team & developers. So if you interested with me, please feel free to hire me 🙏🏻. "
          rest={{
            height: 100,
          }}
        />
        <AppDiv height={30} />
        <AppDiv
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <AppTextFeild label={"Headline  "} placeholder="Soccer Player" icon={briefcase} />
        </AppDiv>
        <AppDiv height={30} />
        <AppDiv
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <AppTextFeild label={"Email"} placeholder="angelinagrace99@gmail.com" icon={smsIcon} />
          <AppTextFeild
            label={"Portfolio Link"}
            placeholder="https://dribbble.com/angelinagrace"
            icon={globalIcon}
          />
        </AppDiv>

        <AppDiv height={10} />
        <AppSelect
          label="Gender"
          img={gender}
          iconStyle={{ width: "25px" }}
          options={[{ label: "Male" }, { label: "Female" }]}
        />
        <AppDiv height={50} />

        <AppDiv
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            gap: 3,
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <AppSelect
            label="Brith Place"
            img={locationIcon}
            iconStyle={{ width: "25px" }}
            options={[{ label: "Auckland" }, { label: "London" }]}
          />
          <AppTextFeild label={"Date of Birth"} placeholder="Date of Birth" icon={calendar} />
        </AppDiv>
        <AppDiv height={50} />
        <Appheading sx={{ textAlign: "left" }}>Address</Appheading>
        <AppDiv height={30} />
        <AppDiv
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            gap: 3,
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <AppSelect
            label="City / Town"
            img={locationIcon}
            iconStyle={{ width: "25px" }}
            options={[{ label: "Auckland, New Zeland" }, { label: "London , Neywork" }]}
          />
          <AppTextFeild label={"Zip Code"} placeholder="0600" icon={discover} />
        </AppDiv>
        <AppDiv height={30} />
        <AppDiv
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            gap: 3,
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <AppSelect
            label="Detail Address"
            img={locationIcon}
            iconStyle={{ width: "25px" }}
            options={[
              { label: "Number 10 magnarove street jibowu, Lagos State" },
              { label: "51 Street  Lagos State" },
            ]}
          />
        </AppDiv>
        <AppDiv height={30} />
        <Appheading sx={{ textAlign: "left" }}>Identity Card</Appheading>
        <AppDiv height={30} />
        <AppDiv
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            gap: 3,
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <AppSelect
            label="Identity Type"
            img={pc}
            iconStyle={{ width: "25px" }}
            options={[{ label: "ID Card" }]}
          />
          <AppTextFeild label={"Identity Type"} placeholder="98645032594" icon={pc} />
        </AppDiv>
        <AppDiv height={60} />
        <AppDiv>
          <Stack spacing={2} direction="row" justifyContent={"end"}>
            <AppButton
              variant="contained"
              sx={{ backgroundColor: alpha, color: "#7F879E", width: 130 }}
            >
              <b> Discard</b>
            </AppButton>
            <AppButton
              sx={{ backgroundColor: beta, width: 130, color: "black" }}
              variant="contained"
            >
              <b> Save Changes</b>
            </AppButton>
          </Stack>
        </AppDiv>
      </AppDiv>
    </div>
  );
};

export default PersonalInfoTab;
