import { FaPlus, FaCamera } from "react-icons/fa";
import { IoImage, IoMicOutline, IoVideocamOutline } from "react-icons/io5";
import { MdOutlineAudiotrack } from "react-icons/md";
import {
  MainContainer,
  MediaButton,
  DropUpContainer,
} from "./styledComponents";
import { useState } from "react";
import SendMessageModal from "../SendMessageModal";

export default function ShareMedia() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMediaBtnClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Media handle functions...
  const handlePhotosAndVideos = () => {
    handleMediaBtnClick();
    openModal();
  };
  const handleAudio = () => {
    handleMediaBtnClick();
    openModal();
  };
  const handleCapturePhoto = () => {
    handleMediaBtnClick();
    openModal();
  };
  const handleRecordAudio = () => {
    handleMediaBtnClick();
    openModal();
  };
  const handleCaptureVideo = () => {
    handleMediaBtnClick();
    openModal();
  };

  return (
    <MainContainer>
      <SendMessageModal isOpen={isModalOpen} onClose={closeModal}>
        tabish
      </SendMessageModal>

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
