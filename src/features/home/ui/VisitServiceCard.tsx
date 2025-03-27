import Typography from '@/shared/ui/typography/Typography';
import styles from './card.module.scss';

const VisitServiceCard = () => {
  return (
    <div className={styles.visitServiceCard}>
      <div className={styles.visitServiceCardInner}>
        <Typography
          fontFamily="Pretendard"
          fontSize="clamp(2.4rem, calc(1.648rem + 2.006vw), 5.5rem)"
        >
          에어로웨이
          <br />
          전문 설치 팀 방문
        </Typography>
        <Typography
          fontFamily="Pretendard"
          fontSize="clamp(1.6rem, calc(1.309rem + 0.777vw), 2.8rem)"
          letterSpacing="clamp(-0.056rem, calc(-0.062rem + 0.025vw), -0.032rem)"
          marginTop="clamp(1.2rem, calc(0.715rem + 1.294vw), 3.2rem)"
          marginBottom="clamp(1.2rem, calc(1.103rem + 0.259vw), 1.6rem)"
        >
          설치 후 안정성을 위해서 전문 설치 팀이 방문하여 설치 해요
        </Typography>
        <Typography
          fontFamily="Pretendard"
          fontSize="clamp(1.4rem, calc(1.254rem + 0.388vw), 2rem)"
          letterSpacing="clamp(-0.064rem, calc(-0.069rem + 0.012vw), -0.045rem)"
          color="#A0A0A0"
        >
          사전예약 고객님들에 한정한 이벤트 입니다.
        </Typography>
        <button className={styles.visitServiceReserveButton}>
          설치 상담신청하기
        </button>
      </div>
    </div>
  );
};

export default VisitServiceCard;
