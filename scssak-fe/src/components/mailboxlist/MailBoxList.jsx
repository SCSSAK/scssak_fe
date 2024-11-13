import {
  mailbox01Img,
  mailbox02Img,
  mailbox03Img,
  mailbox04Img,
  mailbox05Img,
  mailboxWithNotification01Img,
  mailboxWithNotification02Img,
  mailboxWithNotification03Img,
  mailboxWithNotification04Img,
  mailboxWithNotification05Img,
} from '../../assets/images/index';

const mailboxImgList = [
  mailbox01Img,
  mailbox02Img,
  mailbox03Img,
  mailbox04Img,
  mailbox05Img,
];
const mailboxWithNotificationImgList = [
  mailboxWithNotification01Img,
  mailboxWithNotification02Img,
  mailboxWithNotification03Img,
  mailboxWithNotification04Img,
  mailboxWithNotification05Img,
];

export default function MailboxList({data}) {
  return (
    <div id="mailbox-list-container">
      {data.map((user, idx) => {
        const imgIdx = idx % mailboxImgList.length;

        return (
          <div>
            <img
              src={
                user.has_new_mail
                  ? mailboxWithNotificationImgList[imgIdx]
                  : mailboxImgList[imgIdx]
              }
              alt={`${user.user_name}의 우체통`}
            />

            <span>{user.user_name}</span>
          </div>
        );
      })}
    </div>
  );
}
