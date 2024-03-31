import { ImageItem } from "./styledComponents";

export default function CustomizationSidebarImageUi({ eachImage }) {
  const { id, content } = eachImage;

  const imageUrl = content;

  return <ImageItem key={id} backgroundimage={imageUrl} />;
}
