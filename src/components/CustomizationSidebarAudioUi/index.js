import { AudioItem, AudioWrapper } from "./styledComponents";

export default function CustomizationSidebarImageUi({ eachAudio }) {
  const { id, content } = eachAudio;

  const audioUrl = `http://localhost:${process.env.REACT_APP_PORT}/${content}`;

  return (
    <AudioWrapper>
      <AudioItem key={id} src={audioUrl} controls />
    </AudioWrapper>
  )
}
