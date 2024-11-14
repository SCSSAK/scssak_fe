import {useNavigate} from 'react-router-dom';

import {
  imgMailbox01,
  imgMailbox02,
  imgMailbox03,
  imgMailbox04,
  imgMailbox05,
  imgMailboxWithNotification01,
  imgMailboxWithNotification02,
  imgMailboxWithNotification03,
  imgMailboxWithNotification04,
  imgMailboxWithNotification05,
} from '../../assets/images/index';

const mailboxImgList = [
  imgMailbox01,
  imgMailbox02,
  imgMailbox03,
  imgMailbox04,
  imgMailbox05,
];
const mailboxWithNotificationImgList = [
  imgMailboxWithNotification01,
  imgMailboxWithNotification02,
  imgMailboxWithNotification03,
  imgMailboxWithNotification04,
  imgMailboxWithNotification05,
];

export default function MailboxList({data}) {
  // page 이동
  const navigate = useNavigate();

  return (
    <div id="mailbox-list-container">
      {data.map((user, idx) => {
        const imgIdx = idx % mailboxImgList.length;

        return (
          <div key={idx} onClick={() => navigate(`/mail/box/${user.user_id}`)}>
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
