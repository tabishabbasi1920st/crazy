import { FaPlus, FaCamera } from "react-icons/fa";
import { IoImage, IoMicOutline, IoVideocamOutline } from "react-icons/io5";
import { MdOutlineAudiotrack } from "react-icons/md";
import {
  MainContainer,
  MediaButton,
  DropUpContainer,
} from "./styledComponents";
import { useState } from "react";

export default function ShareMedia() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMediaBtnClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Media handle functions...
  const handlePhotosAndVideos = () => {
    handleMediaBtnClick();
  };
  const handleAudio = () => {
    handleMediaBtnClick();
  };
  const handleCapturePhoto = () => {
    handleMediaBtnClick();
  };
  const handleRecordAudio = () => {
    handleMediaBtnClick();
  };
  const handleCaptureVideo = () => {
    handleMediaBtnClick();
  };

  return (
    <MainContainer>
      <DropUpContainer isOpen={isOpen}>
        <li onClick={handlePhotosAndVideos}>
          <IoImage />
          <p>Photos & Videos</p>
        </li>
        <li onClick={handleAudio}>
          <MdOutlineAudiotrack />
          <p>Audio</p>
        </li>
        <li onClick={handleCapturePhoto}>
          <FaCamera />
          <p>Capture Photo</p>
        </li>
        <li onClick={handleRecordAudio}>
          <IoMicOutline />
          <p>Record Audio</p>
        </li>
        <li onClick={handleCaptureVideo}>
          <IoVideocamOutline />
          <p>Capture Video</p>
        </li>
      </DropUpContainer>
      <MediaButton onClick={handleMediaBtnClick}>
        <FaPlus />
      </MediaButton>
    </MainContainer>
  );
}
