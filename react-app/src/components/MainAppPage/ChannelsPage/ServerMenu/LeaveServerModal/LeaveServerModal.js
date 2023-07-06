import './LeaveServerModal.css';

export default function LeaveServerModal({ serverToLeave }) {
  return (
    <div className="leave-server-modal">
      <header className="leave-server-modal__header">
        <h2>Leave '{serverToLeave.name}'</h2>
      </header>
      <p className="leave-server-modal__warning">
        Are you sure you want to leave {serverToLeave.name}? You won't be able
        to rejoin this server unless you are re-invited?
      </p>
      <footer className="leave-server-modal__footer">
        <div className="leave-server-modal__btn-container">
          <button className="leave-server-modal__cancel-btn">Cancel</button>
          <button className="leave-server-modal__leave-btn">
            Leave Server
          </button>
        </div>
      </footer>
    </div>
  );
}
