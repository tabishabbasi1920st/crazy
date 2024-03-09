import { MainContainer, ModalContent, CloseButton } from "./styledComponents";

export default function SendMessageModal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  const handleModalClose = () => {
    onClose();
  };

  return (
    <MainContainer>
      <ModalContent>
        <CloseButton onClick={handleModalClose}>&times;</CloseButton>
        {children}
      </ModalContent>
    </MainContainer>
  );
}
