import React, { useEffect, useState } from "react";
import dateFormat, { masks } from "dateformat";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  MDBContainer,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBCardFooter,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { chatMessage, RestChatMessage } from "@/common/types";
import { MessageProvider, authProvider } from "@/providers";
import { useGlobalStore } from "@/userContext";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { type } from "os";
import { TextArea } from "../TextArea";
import { chatSchema } from "@/common/utils/yupSchema";

type ChatBoxProps = {
  type : string
};
type RestChat = {
  data: RestChatMessage;
};

const DefaultChatMessage: RestChatMessage[] = [
  {
    id: 1,
    content: "",
    senderId: 1,
    channelId: 1,
    createedAt: "now",
    sender: {
      id: 1,
      name: "john",
    },
  },
];
const MessagePosition = (data: RestChatMessage) => {
  return `d-flex flex-row justify-content-${
    data.senderId !== data.sender?.id ? "start" : "end"
  }`;
};

export const ChatBox = ({type}: ChatBoxProps) => {
  const route = useRouter();
  const channelId = Number(route.query.id);
  const user = useGlobalStore();
  const [message, setMessage] = useState<RestChatMessage[]>([]);
  const form = useForm<chatMessage>({
    defaultValues: DefaultChatMessage.at(0),
    mode: "all",
    resolver: yupResolver(chatSchema)
  });

  const handleSubmit = form.handleSubmit((message: chatMessage) => {
    const messageTOSend: chatMessage = {
      content: message.message,
      channelId: channelId,
    };
    const messageToUser: chatMessage = {
      content: message.message,
      recipientId:  channelId
    };
    const userMessage = { ... type !== "message"? messageTOSend : messageToUser };
    const sendMessage = async () => {
      try {
        await MessageProvider.SendMessage(userMessage);
      } catch (error) {
        alert("error occurs on sending message " + { error });
      }
    };

    sendMessage();
  });
  useEffect(() => {
    const getMessagebyId = () => {
      if (type == "channel"){
        MessageProvider.getMessageByChannelId(channelId).then((response) => {
          setMessage(response.data.messages);
        });
      }
      else{
        MessageProvider.getMessageByUserId(channelId).then((response) => {
          setMessage(response.data.messages); } )
      }
     

  }
    getMessagebyId();
  }, [message]);
  return (
    <div className="chat mx-0">
      <div className="d-flex justify-content-center mr-3">
        <div>
          <div
            className="d-flex justify-content-between align-items-center p-3 chat-box__back"
            style={{ borderTop: "4px solid #ffa900" }}
          >
            <h5 className="mb-0 text-white">Chat messages</h5>
            <div className="d-flex flex-row align-items-center">
              <span className="badge bg-warning me-3">20</span>
              <MDBIcon fas icon="minus" size="xs" className="me-3 text-muted" />
              <MDBIcon
                fas
                icon="comments"
                size="xs"
                className="me-3 text"
              />
              <MDBIcon fas icon="times" size="xs" className="me-3 text-muted" />
            </div>
          </div>
          <MDBCardBody style={{ height: "350px" }}>
            <div className="h-100 overflow-auto chat-area__message">
              {typeof message !== "undefined" ? (
                message.map((key, value) => {
                  return (
                    <>
                      <div
                        className="d-flex justify-content-between"
                        key={key.id}
                      >
                        <p className="small mb-1 text-white">{key.sender?.name}</p>
                        <p className="small mb-1 text-muted">{dateFormat(key.updateAt, "HH:MM")}</p>
                      </div>
                      <div className={MessagePosition(key)}>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                          alt="avatar 1"
                          style={{ width: "45px", height: "100%" }}
                        />
                        <div>
                          <p
                            className="small p-2 ms-3 mb-3 rounded-3"
                            style={{ backgroundColor: "#f5f6f7" }}
                          >
                            {key.content}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <p className="text-white">No correspondant Chat</p>
              )}
            </div>
          </MDBCardBody>
          <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
            <MDBInputGroup className="mb-0">
              <FormProvider {...form}>
                <form action="" onSubmit={handleSubmit} className="d-md-flex">
                  <div className="d-grid gap-2 col-8 m-0">
                   <TextArea name="message"/>
                  </div>
                  <div className="d-grid mx-4 gap-2 col-4 m-0 h-50">
                    <button type="submit" className="btn btn-primary sendMessageButton" >
                      Send
                    </button>
                  </div>
                </form>
              </FormProvider>
            </MDBInputGroup>
          </MDBCardFooter>
        </div>
      </div>
    </div>
  );
};
