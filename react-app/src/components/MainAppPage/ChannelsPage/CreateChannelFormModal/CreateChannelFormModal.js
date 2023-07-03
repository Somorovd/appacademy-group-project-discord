import './CreateChannelFormModal.css';

export default function CreateChannelFormModal() {
  return (
    <div className="form-wrapper">
      <form className="create-channel-form">
        <header className="create-channel-form__header">
          <div>
            <h2>Create Channel</h2>
          </div>
          <div>
            <span>X</span>
          </div>
        </header>
      </form>
    </div>
  );
}
