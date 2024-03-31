import { VideoItem, AudioWrapper } from "./styledComponents";

export default function CustomizationSidebarImageUi({ eachVideo }) {
  const { id, content } = eachVideo;

  const audioUrl = content;

  return (
    <AudioWrapper>
      <VideoItem key={id} src={audioUrl} controls />
    </AudioWrapper>
  );
}
