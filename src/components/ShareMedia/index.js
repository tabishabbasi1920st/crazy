import { FaPlus, FaCamera } from "react-icons/fa";
import { IoImage, IoMicOutline, IoVideocamOutline } from "react-icons/io5";
import { MdOutlineAudiotrack } from "react-icons/md";
import { RiFolderVideoFill } from "react-icons/ri";
import {
  MainContainer,
  MediaButton,
  DropUpContainer,
} from "./styledComponents";
import { useState } from "react";
import SendMessageModal from "../SendMessageModal";
import SendRecordedAudioMessage from "../SendRecordedAudioMessage";
import SendAudioFileMessages from "../SendAudioFileMessages";
import SendRecordedVideoMessages from "../SendRecordedVideoMessages";
import SendSimplePhoto from "../SendSimplePhoto";

const modalChildrenConstants = {
  photos: "PHOTOS",
  videos: "VIDEOS",
  audio: "AUDIO",
  capturePhoto: "CAPTURE_PHOTO",
  recordAudio: "RECORD_AUDIO",
  captureVideo: "CAPTURE_VIDEO",
};

export default function ShareMedia() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMediaBtnClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Media handle functions...
  const handlePhotos = () => {
    handleMediaBtnClick();
    openModal();
    setModalChildren(modalChildrenConstants.photos);
  };

  const handleVideos = () => {
    handleMediaBtnClick();
    openModal();
    setModalChildren(modalChildrenConstants.videos);
  };

  const handleAudio = () => {
    handleMediaBtnClick();
    openModal();
    setModalChildren(modalChildrenConstants.audio);
  };
  const handleCapturePhoto = () => {
    handleMediaBtnClick();
    openModal();
    setModalChildren(modalChildrenConstants.capturePhoto);
  };
  const handleRecordAudio = () => {
    handleMediaBtnClick();
    openModal();
    setModalChildren(modalChildrenConstants.recordAudio);
  };
  const handleCaptureVideo = () => {
    handleMediaBtnClick();
    openModal();
    setModalChildren(modalChildrenConstants.captureVideo);
  };

  const getAppropriateChildren = () => {
    switch (modalChildren) {
      case modalChildrenConstants.photos:
        return <SendSimplePhoto onClose={closeModal} />;
      case modalChildrenConstants.videos:
        return null;
      case modalChildrenConstants.audio:
        return <SendAudioFileMessages onClose={closeModal} />;
      case modalChildrenConstants.capturePhoto:
        return null;
      case modalChildrenConstants.recordAudio:
        return <SendRecordedAudioMessage onClose={closeModal} />;
      case modalChildrenConstants.captureVideo:
        return <SendRecordedVideoMessages onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <MainContainer>
      <SendMessageModal isOpen={isModalOpen} onClose={closeModal}>
        {getAppropriateChildren()}
      </SendMessageModal>

      <DropUpContainer isOpen={isOpen}>
        <li onClick={handlePhotos}>
          <IoImage />
          <p>Photos</p>
        </li>
        <li onClick={handleVideos}>
          <RiFolderVideoFill />
          <p>Videos</p>
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
      <MediaButton disabled={isModalOpen} onClick={handleMediaBtnClick}>
        <FaPlus />
      </MediaButton>
    </MainContainer>
  );
}
