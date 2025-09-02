import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../pages/auth_pages/auth.css"

interface AuthFormProps {
  title: string;
  subtitle: string;
  fields: { label: string; type: string; id: string; name: string }[];
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  backHref?: string;
  redirectText?: string;
  redirectHref?: string;
  redirectBtnText?: string;
  disabled?: boolean; 
}

const AuthForm = ({
  title,
  subtitle,
  fields,
  buttonText,
  onSubmit,
  backHref = "/",
  redirectText,
  redirectHref,
  redirectBtnText,
  disabled = false, 
}: AuthFormProps) => {
  return (
    <section className="login_container">
      <div className="auth_child1">
        <div className="auth_form_box">
          <button
            onClick={() => (window.location.href = backHref)}
            className="back_arrow_btn"
            disabled={disabled} 
          >
            <div className="back_arrow_box">
              <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" />
              <p>Back</p>
            </div>
          </button>

          <div className="login-form">
            <div className="form_text_box">
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>

            <form className="auth_form" onSubmit={onSubmit}>
              {fields.map((field) => (
                <div className="form-field" key={field.id}>
                  <label htmlFor={field.id}>{field.label}</label>
                  <input type={field.type} id={field.id} name={field.name} disabled={disabled} />
                </div>
              ))}

              <button className="auth_form_btn" disabled={disabled}>{buttonText}</button>
            </form>

            {redirectText && redirectHref && redirectBtnText && (
              <div className="rdct_box">
                <p className="redirect_text">{redirectText}</p>
                <button
                  onClick={() => (window.location.href = redirectHref)}
                  className="rdrct_btn"
                  disabled={disabled} 
                >
                  {redirectBtnText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
