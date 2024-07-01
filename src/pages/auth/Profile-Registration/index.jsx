import { useState } from "react";
import AppTabShape from "./../../../components/molecules/AppTabShape";
import profileIcon from "../../../assets/svg/profile.svg";
import skillIcon from "../../../assets/svg/skill.svg";
import teacherIcon from "../../../assets/svg/teacher.svg";
import cetificationIcon from "../../../assets/svg/cetificattion.svg";
import berifcaseIcon from "../../../assets/svg/berifcase.svg";
import { Paper, useMediaQuery } from "@mui/material";
import { PaperStyle } from "../../../utils/styles";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import { useTheme } from "@mui/material/styles";
import AppDiv from "../../../components/atoms/AppDiv";
import WorkExpereinceTab from "./tabs/WorkExpereinceTab";
import EducationTab from "./tabs/EducationTab";
import CertificationTab from "./tabs/CertificationTab";
import SkillsTab from "./tabs/SkillsTab";

const PersonalInfo = "Personal Information";
const WorkExperience = "Work Experience";
const Education = "Education";
const Certifications = "Certifications";
const Skills = "Skills";

const ProfileRegistrationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  console.log(isMobile);
  const [activeTab, setActiveTab] = useState(PersonalInfo);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  const renderContent = () => {
    switch (activeTab) {
      case PersonalInfo:
        return <PersonalInfoTab />;
      case WorkExperience:
        return <WorkExpereinceTab />;
      case Education:
        return <EducationTab />;
      case Certifications:
        return <CertificationTab />;
      case Skills:
        return <SkillsTab />;
      default:
        return null;
    }
  };

  return (
    <AppDiv
      sx={{
        display: "flex",
        gap: 3,
        alignItems: "flex-start",
        flexDirection: { lg: "row", xs: "column" },
      }}
    >
      <Paper
        sx={{
          ...PaperStyle,
          width: {
            lg: "440px",
            xs: "100%",
          },
          p: 1.2,
          display: "flex",
          flexDirection: { lg: "column", xs: "row" },
          overflowX: {
            lg: "visible",
            xs: "scroll",
          },
        }}
      >
        <AppTabShape
          label={PersonalInfo}
          img1={profileIcon}
          isActive={activeTab === PersonalInfo}
          handler={() => handleTabClick(PersonalInfo)}
        />
        <AppTabShape
          label={WorkExperience}
          img1={berifcaseIcon}
          isActive={activeTab === WorkExperience}
          handler={() => handleTabClick(WorkExperience)}
        />
        <AppTabShape
          label={Education}
          img1={teacherIcon}
          isActive={activeTab === Education}
          handler={() => handleTabClick(Education)}
        />
        <AppTabShape
          label={Certifications}
          img1={cetificationIcon}
          isActive={activeTab === Certifications}
          handler={() => handleTabClick(Certifications)}
        />
        <AppTabShape
          label={Skills}
          img1={skillIcon}
          isActive={activeTab === Skills}
          handler={() => handleTabClick(Skills)}
        />
      </Paper>

      <div style={{ width: "100%" }}>{renderContent()}</div>
    </AppDiv>
  );
};

export default ProfileRegistrationPage;
