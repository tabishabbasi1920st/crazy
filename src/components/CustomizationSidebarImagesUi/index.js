import { ImageItem } from "./styledComponents";

export default function CustomizationSidebarImageUi({ eachImage }) {
  const { id, content } = eachImage;

  const imageUrl = `http://localhost:${process.env.REACT_APP_PORT}/${content}`;

  return <ImageItem key={id} backgroundimage={imageUrl} />;
}
