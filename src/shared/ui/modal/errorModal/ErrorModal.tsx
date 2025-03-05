import Modal from '../Modal';

export type ErrorModalProps = { error: Error; reset: () => void };

const ErrorModal = ({ error, reset }: ErrorModalProps) => {
  return (
    <Modal type="ErrorModal">
      <div className="modal">
        <h2>🚨 오류 발생!</h2>
        <p>{error.message}</p>
        <button onClick={reset}>다시 시도</button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
