import {
  MainContainer,
  TabContainer,
  TabItem,
  BodyContainer,
} from "./styledComponents";
import { useState } from "react";
import Images from "../Images";
import Videos from "../Videos";
import Audios from "../Audios";

const tabsOptions = [
  {
    id: "IMAGES",
    name: "Images",
  },
  {
    id: "VIDEOS",
    name: "Videos",
  },
  {
    id: "AUDIOS",
    name: "Audios",
  },
];

const tabsConstant = {
  images: "IMAGES",
  videos: "VIDEOS",
  audios: "AUDIOS",
};

export default function MediaTabs() {
  const [selectedTabId, setSelectedTabId] = useState(tabsOptions[0].id);

  const renderSelectedTabContent = () => {
    switch (selectedTabId) {
      case tabsConstant.audios:
        return <Audios />;
      case tabsConstant.videos:
        return <Videos />;
      case tabsConstant.images:
        return <Images />;
      default:
        return null;
    }
  };

  return (
    <MainContainer>
      <TabContainer>
        {tabsOptions.map((eachTab) => {
          return (
            <TabItem
              isselected={selectedTabId === eachTab.id}
              key={eachTab.id}
              onClick={() => setSelectedTabId(eachTab.id)}
            >
              {eachTab.name}
            </TabItem>
          );
        })}
      </TabContainer>
      <BodyContainer>{renderSelectedTabContent()}</BodyContainer>
    </MainContainer>
  );
}
