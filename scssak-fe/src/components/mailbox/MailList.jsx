export default function MailList({data}) {
  return (
    <div id="mail-list-container">
      {data.map((mail, idx) => {
        return (
          <div key={idx}>
            <p>{mail.mail_content}</p>
            <p>{mail.mail_created_at}</p>
          </div>
        );
      })}
    </div>
  );
}
