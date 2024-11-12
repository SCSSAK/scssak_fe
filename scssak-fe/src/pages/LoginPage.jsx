import LoginForm from '../components/login/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <main>
        <p>슥사 새싹들의 커뮤니티, 슥싹</p>

        <img src="./logo.svg" />

        <p>커뮤니티 하나로 출석부터 꿀팁 공유까지 한 번에!</p>
        <p>슥사로의 여정, 시작해볼까요?</p>

        <LoginForm />
      </main>
    </div>
  );
}
