import {useParams, useLocation} from 'react-router-dom';

import MailWriteForm from '../components/mailWrite/MailWriteForm';

export default function MailWritePage() {
  const location = useLocation();
  const receiver_name = location.state?.receiver_name;
  const {receiver_id} = useParams();

  return (
    <div>
      <main>
        <p>To. {receiver_name}님께 보내는 편지💙</p>

        <MailWriteForm recevier_id={receiver_id} />
      </main>
    </div>
  );
}
