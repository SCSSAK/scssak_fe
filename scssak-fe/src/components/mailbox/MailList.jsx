import styles from '../../styles/components/mailbox/MailList.module.css';

export default function MailList({data}) {
  return (
    <div className={styles.container}>
      {data.map((mail, idx) => {
        return (
          <div key={idx} className={styles.containerMail}>
            <p className={styles.textMailContent}>{mail.mail_content}</p>
            <p className={styles.textMailCreatedAt}>{mail.mail_created_at}</p>
          </div>
        );
      })}
    </div>
  );
}
