import {useState, useEffect, useRef, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {xModalAtom} from '../recoil/atom';

import MailList from '../components/mailbox/MailList';
import MoveToMailWriteButton from '../components/mailbox/MoveToMailWriteButton';

import {API_AUTH} from '../apis/apiSettings';
import {MAIL_URL} from '../apis/apiUrls';

import {loginRoute, mailboxRootRoute} from '../router/Routes';

import go_back_arrow from '../assets/images/go_back_arrow.png';
import styles from '../styles/pages/MailboxPage.module.css';
import mailStyles from '../styles/components/mailbox/MailList.module.css';

export default function MailboxPage() {
  // page 이동
  const navigate = useNavigate();

  // 에러 메시지 전역 상태
  const setXModalState = useSetRecoilState(xModalAtom);

  const {receiver_id} = useParams();

  // 데이터
  const [isFetching, setIsFetching] = useState(false); // 현재 가져오는 중인가?
  const [mailList, setMailList] = useState([]); // 편지 목록
  const [currentPage, setCurrentPage] = useState(1); // 마지막으로 불러온 페이지
  const [totalPage, setTotalPage] = useState(1); // 전체 페이지 수
  const observerRef = useRef(); // IntersectionObserver
  const lastElementRef = useRef(); // 게시글 목록의 마지막 요소
  const [receiver_name, setReceiverName] = useState(''); // 수신자 이름

  const loadMore = useCallback(() => {
    if (currentPage < totalPage && !isFetching) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPage, isFetching]);

  const initObserver = useCallback(() => {
    if (!observerRef.current) {
      // IntersectionObserver
      // :스크롤 감지해서 게시글 목록의 마지막 요소가 화면에 표시되면 페이지 증가
      observerRef.current = new IntersectionObserver(
        entries => {
          // 현재 마지막 페이지가 아니고,
          // isFetching이 false일 때만 페이지 증가
          if (entries && entries[0].isIntersecting) {
            loadMore();
          }
        },
        {threshold: 1}, // 요소가 거의 다 보였을 때 트리거
      );
    }
  }, [isFetching, loadMore]);

  // Observer 초기화
  useEffect(() => {
    initObserver();
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [totalPage, initObserver]);

  // mail_list가 변경될 때, 스크롤 감지 대상이 될 마지막 요소 변경
  useEffect(() => {
    if (mailList.length > 0) {
      const lastElement = document.querySelector(
        `.${mailStyles.containerMail}:last-child`,
      );

      if (lastElementRef.current) {
        observerRef.current.unobserve(lastElementRef.current);
      }
      lastElementRef.current = lastElement; // 마지막 요소 업데이트
      observerRef.current.observe(lastElement); // 새로운 마지막 요소 감지
    }
  }, [mailList]);

  // 현재 페이지가 변화하면 게시글을 요청
  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  // 게시글 요청
  const fetchArticles = () => {
    setIsFetching(true); // 데이터 요청 시작

    const params = {current_page: currentPage};

    API_AUTH.get(MAIL_URL + '/' + receiver_id, {params})
      .then(({data}) => {
        // 첫 번째 요청일 때
        if (currentPage === 1) {
          setMailList(data.mail_list); // 덮어쓰기
        } else {
          // 두 번째 요청부터는 기존 데이터에 추가
          setMailList(prev => [...prev, ...data.mail_list]);
        }

        setTotalPage(data.total_pages); // 총 페이지 수 갱신
        setReceiverName(data.receiver_name); // 수신자 이름 갱신
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
      })
      .finally(setIsFetching(false));
  };

  const handleClickGoBackButton = () => {
    navigate(mailboxRootRoute);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <img
          className={styles.iconGoBackArrow}
          src={go_back_arrow}
          alt="뒤로 가기 버튼"
          onClick={handleClickGoBackButton}
        />
        {receiver_name}님의 우체통 💌
      </div>

      <MailList data={mailList} />

      <div className={styles.containerButton}>
        <MoveToMailWriteButton
          receiver_id={receiver_id}
          receiver_name={receiver_name}
        />
      </div>
    </div>
  );
}
