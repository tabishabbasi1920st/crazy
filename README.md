# Chat Application

### An application that allows users to send **Text** messages, **Image** messages, **Audio** files, **Video** files.

## Special Features

1. User can **Register**.
2. User can **Login**.
3. User can **Record Audio** and send to **reciepent**.
4. User can **Record Video** and send to **reciepent**.
5. User can **Capture Image** and send to **reciepent**.
6. User can see **MessageDeliveryStatus** wether a message is **PENDING**, **SENT**, **SEEN** in **real time**.
7. User can see **UserStatus** wether a user is **Active** or **Offline**.
8. User can see **UserActivity** wether a user is **Typing**, **RecordingAudio**, **RecordingVideo**, **CapturingImage** in **real time**.
9. User can **Search** a particular user in users list.
10. User can **SearchInChat** and **Navigate** to each message containing search term.
11. User can **customize** each **ChatContainer** according to him. like **Apply photo in background** from **customizationSidebar**,
12. User can **see** all **images**, **videos** and **audio files** sent by **selectedChat** in **separate tabs** in **customizationSidebar**,
13. User can **Delete** message from chat, with two options **DeleteForMe** and **DeleteForEveryone**.

# Development

## Tech Stack

### Frontend

ReactJS (React/Context)

### Backend

NodeJS, ExpressJS, Socket.IO for real-time communication between clients.

# Functionality

| Components                      | Page Details                                                                                                                                                                                                                                                                                                                                                                                                                                          | Navigation | API                                         | SocketEvent |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------- | ----------- |
| **Register**                    | Registeration Form containing Fields: **UserProfilePicture**, **Name**, **EmailId** , **Password**, **Confirm Password**, **Register Button** to register.                                                                                                                                                                                                                                                                                            | ---        | https://localhost:5000/register-new-user    | ---         |
| **Login**                       | Login Form containing Fields: **RegisteredEmail**, **Password** and **Login** button to login.                                                                                                                                                                                                                                                                                                                                                        | ---        | https://localhost:5000/login                | ---         |
| **Header**                      | It will contain logged-in user details and render a small photo of logged-in user in header                                                                                                                                                                                                                                                                                                                                                           | ---        | https://localhost:5000/profile-details      | ---         |
| **AllChats**                    | To Get the list of all **Registered** users. **SearchParticular User** , **Filter** by **Active** or **Offline**. if filter applied then **search functionality** will be applied to filtered users.                                                                                                                                                                                                                                                  | ---        | https://localhost:5000/all-registered-users | ---         |
| **SearchInChat**                | It will contain an **input tag** and three button **upArrow**, **downArrow** and **CloseButton**.                                                                                                                                                                                                                                                                                                                                                     | ---        | ---                                         | ---         |
| **Images**                      | All Images wether sentby or recievedby selectedChat user.                                                                                                                                                                                                                                                                                                                                                                                             | ---        | https://localhost:5000/all-image-messages   | ---         |
| **Videos**                      | All Videos wether sentby or receivedby selectedChat user.                                                                                                                                                                                                                                                                                                                                                                                             | ---        | https://localhost:5000/all-video-messages   | ---         |
| **CustomizationSidebar**        | It contains selectedchat user's **dp** and **Two Buttons** 1. Media 2. Options. by default media will be selected. if we click on **Media** then a container gets mounted in bottom with **different tabs** 1. images 2. videos. by default images will be selected and in this tab we can see all image wether those are sentby or receiveby selectedUser. and it wiill be same for other tabs like for video tab so all videos will be shown there. | ---        | ---                                         | ---         |
| **ChatHeaderContainer**         | **SearchInChat** component. ChatHeaderComponent contain selected user's **profileImage** and **UserStatus** wether selected user is **Active** or **Inactive** . A button to toggle **CustomizationSidebar** at the right side of the selectedChatContainer in min 1200px wide screen. if width is <1200px then the same button will only open the **customizationSidebar** in a model and **close** by clicking anywhere in modal.                   | ---        | ---                                         | ---         |
| **BuildTextMessageUi**          | **Builds UI** of Text Message                                                                                                                                                                                                                                                                                                                                                                                                                         | ---        | ---                                         | ---         |
| **BuildImageMessageUi**         | **Builds UI** of Image Message                                                                                                                                                                                                                                                                                                                                                                                                                        | ---        | ---                                         | ---         |
| **BuildAudioMessageUi**         | **Builds UI** of Audio Message                                                                                                                                                                                                                                                                                                                                                                                                                        | ---        | ---                                         | ---         |
| **BuildVideoMessageUi**         | **Builds UI** of Video Message                                                                                                                                                                                                                                                                                                                                                                                                                        | ---        | ---                                         | ---         |
| **BuildCapturedAudioMessageUi** | **Builds UI** of CapturedAudio Message                                                                                                                                                                                                                                                                                                                                                                                                                | ---        | ---                                         | ---         |
| **BuildCapturedVideoMessageUi** | **Builds UI** of CapturedVideo Message                                                                                                                                                                                                                                                                                                                                                                                                                | ---        | ---                                         | ---         |
| **BuildCapturedImageMessageUi** | **Builds UI** of CapturedImage Message                                                                                                                                                                                                                                                                                                                                                                                                                | ---        | ---                                         | ---         |
| **SendTextMessage**             | This **component** will used to send **text messages**.                                                                                                                                                                                                                                                                                                                                                                                               |
| **SendAudioMessage**            | This **component** will used to send **audio messages**.                                                                                                                                                                                                                                                                                                                                                                                              |
| **SendImageMessage**            | This **component** will used to send **Image messages**.                                                                                                                                                                                                                                                                                                                                                                                              |
| **SendVideoMessage**            | This **component** will used to send **Audio messages**.                                                                                                                                                                                                                                                                                                                                                                                              |
| **CaptureAndSendAudioMessage**  | This **component** will used to **capture audio** and **send to the user**.                                                                                                                                                                                                                                                                                                                                                                           |
| **CaptureAndSendVideoMessage**  | This **component** will used to **capture video** and **send to the user**.                                                                                                                                                                                                                                                                                                                                                                           |
| **CaptureAndSendImageMessage**  | This **component** will used to **capture image** and **send to the user**.                                                                                                                                                                                                                                                                                                                                                                           |
| **ChatMiddleContainer**         | Here we will render all the chat messages of all type wether it is **image**, **text**, **video**, **audio**, **captured_audio**, **captured_video** and **capturedImage**                                                                                                                                                                                                                                                                            | ---        | ---                                         | ---         |
| **ShareMedia**                  | it will contain all components related to sharing media like audio, video, image, captured_audio, captured_video, captured_image.                                                                                                                                                                                                                                                                                                                     |
| **ChatFooterContainer**         | **ShareMedia** component. and **SendTextMessage** component.                                                                                                                                                                                                                                                                                                                                                                                          | ---        | ---                                         | ---         |
| **SelectedChatContainer**       | **ChatHeaderContainer**, **ChatMiddleContainer**, **ChatFooterContainer**                                                                                                                                                                                                                                                                                                                                                                             | ---        | ---                                         | ---         |
| **ChatContext**                 | it will contain a **list of active users**, **socket**, **selectedChat**, **loggedInUserProfile**                                                                                                                                                                                                                                                                                                                                                     |
| **Modal**                       | It will used to **display** a particular **component** means it will **overlay the screen** and show that component **first**.                                                                                                                                                                                                                                                                                                                        |

# Design Files

[Crazy](https://connectme-html.themeyn.com/index.html#)

