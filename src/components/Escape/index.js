import { MainContainer } from "./styledComponents";
import { useEffect } from "react";

const Escape = () => {
  // This is for extra safety if history object not clear by chance
  useEffect(() => {
    localStorage.removeItem("isReplace");

    return () => {
      localStorage.removeItem("isReplace");
    };
  }, []);

  return (
    <MainContainer>
      <article>
        <h2 style={{ marginBottom: "10px" }}>INTRODUCTION:</h2>
        <p>
          "Connect Me" is a versatile chatting application designed to
          facilitate effortless communication between individuals or groups.
          Whether you're catching up with an old friend, collaborating with team
          members on a project, or simply sharing moments with loved ones,
          Connect Me provides a reliable platform for instant messaging, voice
          calls, and multimedia sharing.
        </p>

        <h2 style={{ marginBottom: "10px", marginTop: "10px" }}>Features:</h2>
        <ol start="0" type="A">
          <li>
            <strong>Instant Messaging:</strong> At the core of Connect Me lies
            its robust instant messaging feature, allowing users to exchange
            text messages in real-time...
          </li>
          <li>
            <strong>Voice and Video Calls:</strong> In addition to text
            messaging, Connect Me offers seamless voice and video calling
            capabilities...
          </li>
          <li>
            <strong>Multimedia Sharing:</strong> Connect Me empowers users to
            share multimedia content effortlessly...
          </li>
          <li>
            <strong>Privacy and Security:</strong> Recognizing the importance of
            privacy and security in digital communication...
          </li>
          <li>
            <strong>Customization and Personalization:</strong> Connect Me
            offers a plethora of customization options to suit individual
            preferences and tastes...
          </li>
        </ol>

        <h2 style={{ marginBottom: "10px", marginTop: "10px" }}>Impact</h2>
        <p>
          The widespread adoption of chatting applications like Connect Me has
          transformed the way we communicate...
        </p>

        <h2 style={{ marginBottom: "10px", marginTop: "10px" }}>Conclusion</h2>
        <p>
          As we navigate the complexities of modern-day communication, chatting
          applications like Connect Me serve as invaluable tools for staying
          connected, informed, and engaged...
        </p>
      </article>
    </MainContainer>
  );
};

export default Escape;
