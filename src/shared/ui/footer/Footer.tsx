import Link from 'next/link';
import Typography from '../typography/Typography';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.companyInfo}>
        <div className={styles.basicInfo}>
          <Typography
            fontFamily="Pretendard"
            fontWeight="bold"
            fontSize="clamp(1.4rem, calc(1.254rem + 0.388vw), 2rem)"
          >
            에어로웨이
            <Typography
              as="span"
              fontFamily="Pretendard"
              fontWeight="medium"
              fontSize="clamp(1.4rem, calc(1.351rem + 0.129vw), 1.6rem)"
              marginLeft="11px"
            >
              / 주식회사 스틸브로 서비스
            </Typography>
          </Typography>
          <Typography
            fontFamily="Pretendard"
            color="#363636"
            fontSize="clamp(1.4rem, calc(1.303rem + 0.259vw), 1.8rem)"
          >
            <Typography
              as="span"
              marginRight="16px"
              fontSize="clamp(1.4rem, calc(1.303rem + 0.259vw), 1.8rem)"
            >
              대표이사
            </Typography>
            박동원, 박해승
            <span className={styles.divider} />
            경기도 평택시 진위면 남부대로 645
            <span className={styles.divider} />
            <Typography
              as="span"
              marginRight="16px"
              fontSize="clamp(1.4rem, calc(1.303rem + 0.259vw), 1.8rem)"
            >
              사업자 등록번호
            </Typography>
            838-87-92480
          </Typography>
          <Typography
            fontFamily="Pretendard"
            color="#363636"
            fontSize="clamp(1.4rem, calc(1.303rem + 0.259vw), 1.8rem)"
          >
            <Typography
              as="span"
              marginRight="16px"
              fontSize="clamp(1.4rem, calc(1.303rem + 0.259vw), 1.8rem)"
            >
              TEL
            </Typography>
            1644-4198 (유료)
            <span className={styles.divider} />
            <Typography
              as="span"
              marginRight="16px"
              fontSize="clamp(1.4rem, calc(1.303rem + 0.259vw), 1.8rem)"
            >
              MAIL
            </Typography>
            official@aeroway.com
            <span className={styles.divider} />
            <Typography
              as="span"
              marginRight="16px"
              fontSize="clamp(1.4rem, calc(1.303rem + 0.259vw), 1.8rem)"
            >
              통신판매업신고
            </Typography>
            제 2025- 경기 평택-031198호
          </Typography>
        </div>
        <div className={styles.infoLinks}>
          <Link href="">사업자 정보 확인</Link>
          <Link href="">이용약관</Link>
          <Link href="">매장안내</Link>
          <Link href="">개인정보처리방침</Link>
        </div>
      </div>
      <div className={styles.customerService}>
        <Typography
          fontFamily="Pretendard"
          fontSize="clamp(1.6rem, calc(1.454rem + 0.388vw), 2.2rem)"
        >
          고객센터
        </Typography>
        <Typography
          className={styles.operationHour} // TODO: 미디어쿼리로 모바일에서는 없애야함!
          fontFamily="Pretendard"
          fontSize="18px"
        >
          운영시간 : 10:00 - 18:00 (주말/공휴일 휴무)
        </Typography>
        <Typography
          fontFamily="Pretendard"
          fontSize="clamp(1.8rem, calc(1.46rem + 0.906vw), 3.2rem)"
          fontWeight="bold"
        >
          1644-4198
        </Typography>
      </div>
      <div className={styles.copyright}>
        Copyright © 2025 areaway. All Rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
