import { VideoItem, AudioWrapper } from "./styledComponents";

export default function CustomizationSidebarImageUi({ eachVideo }) {
  const { id, content } = eachVideo;

  const audioUrl = `http://localhost:${process.env.REACT_APP_PORT}/${content}`;

  return (
    <AudioWrapper>
      <VideoItem key={id} src={audioUrl} controls />
    </AudioWrapper>
  );
}
