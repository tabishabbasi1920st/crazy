import { AudioItem, AudioWrapper } from "./styledComponents";

export default function CustomizationSidebarImageUi({ eachAudio }) {
  const { id, content } = eachAudio;

  const audioUrl = content;

  return (
    <AudioWrapper>
      <AudioItem key={id} src={audioUrl} controls />
    </AudioWrapper>
  );
}
