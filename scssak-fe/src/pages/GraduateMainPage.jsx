import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {xModalAtom} from '../recoil/atom';

import PopularArticleList from '../components/main/PopularArticleList';

import {API_AUTH} from '../apis/apiSettings';
import {MAIN_URL} from '../apis/apiUrls';

import {loginRoute, boardRoute} from '../router/Routes';

import {
  imgLogo,
  imgLogin,
  iconChat,
  iconMegaphone,
  iconQuestion,
  iconHearts,
  iconArrowRight,
  backgroundImgGraduateMain,
} from '../assets/images';

import styles from '../styles/pages/GraduateMainPage.module.css';

export default function GraduateMainPage() {
  // page 이동
  const navigate = useNavigate();

  // 에러 메시지 전역 상태
  const setXModalState = useSetRecoilState(xModalAtom);

  // 표시할 데이터
  const [data, setData] = useState({
    popular_article_list_opened_true: [],
    popular_article_list_opened_false: [],
  });

  const boardList = [
    {
      title: '자유 게시판',
      content: '슥사인을 위한\n유용한 정보들',
      icon: iconChat,
      boardType: 1,
    },
    {
      title: '자랑 게시판',
      content: '졸업해도\n자랑하고 싶어',
      icon: iconMegaphone,
      boardType: 5,
    },
    {
      title: '질문 게시판',
      content: '후배들이\n질문하고 싶대요!',
      icon: iconQuestion,
      boardType: 3,
    },
    {
      title: '칭찬 게시판',
      content: '장한 후배들\n칭찬하러 가기',
      icon: iconHearts,
      boardType: 4,
    },
  ];

  // main api 호출
  useEffect(() => {
    API_AUTH.get(MAIN_URL)
      .then(r => {
        setData(r.data);
      })
      .catch(e => {
        const status = e.status;

        switch (status) {
          // 에러 처리 (401, 비로그인)
          case 401:
            setXModalState({
              isOpened: true,
              message: '로그인이 필요합니다.',
              onClose: () => navigate(loginRoute),
            });
            break;

          // 에러 처리 (500, 네트워크 문제 또는 서버 에러)
          default:
            setXModalState({
              isOpened: true,
              message: '서버와 통신 중\n오류가 발생했습니다.',
            });
            break;
        }
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerInfo}>
        <div className={styles.containerInfoText}>
          <img src={imgLogo} alt="슥싹 로고" />
          <p className={styles.textBlue}>오늘도 슥-싹한 하루!</p>
        </div>
        <img src={imgLogin} alt="슥싹 이미지" />
      </div>

      <div
        className={styles.containerBackground}
        style={{backgroundImage: `url(${backgroundImgGraduateMain})`}}>
        <div className={styles.containerBoards}>
          {boardList.map(({title, content, icon, boardType}, idx) => {
            return (
              <div
                key={idx}
                className={styles.containerBoard}
                onClick={() =>
                  navigate(boardRoute, {
                    state: {boardType: boardType},
                  })
                }>
                <img src={icon} alt={title + ' 아이콘'} />
                <div className={styles.containerBoardText}>
                  <p className={styles.textBoardTitle}>{title}</p>
                  <p className={styles.textBoardContent}>{content}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={styles.containerTips}
          onClick={() =>
            navigate(boardRoute, {
              state: {boardType: 2},
            })
          }>
          <span className={styles.containerTipsText}>
            후배들을 위해 꿀팁 남겨주기!
          </span>
          <span className={styles.containerTipsTitle}>
            꿀팁 게시판에 글쓰기
          </span>
          <img src={iconArrowRight} alt="꿀팁 게시판 이동 버튼" />
        </div>

        <PopularArticleList
          opened={true}
          data={data.popular_article_list_opened_true}
        />
        <PopularArticleList
          opened={false}
          data={data.popular_article_list_opened_false}
        />
      </div>
    </div>
  );
}
