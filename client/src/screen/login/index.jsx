import { Button, Container, Grid } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import authApi from "../../apis/api/authApi";
import { FCButton } from "../../component/FCButton";
import { FCTextField } from "../../component/FCTextField";
import { actionLoginSuccess } from "./loginSlice";
import "./style.scss";
export const LoginView = () => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [changeView, setChangeView] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (value) => {
    authApi.loginApi(value).then((res) => {
      dispatch(actionLoginSuccess(res.data.user));

      Cookies.set("user", JSON.stringify(res.data.user));
      if (res.data.user) {
        history.push("/");
      }
    });
  };
  const onSubmitRegistor = (value) => {
    authApi.registerApi(value).then((res) => {
      dispatch(actionLoginSuccess(res.data.newUser));
      Cookies.set("user", JSON.stringify(res.data.newUser));
      history.push("/");
    });
  };
  const hanldeChangeView = () => {
    setChangeView(!changeView);
  };
  const renderTextFieldTemp = (
    label,
    type,
    placeholder,
    name,
    require,
    disabled
  ) => {
    return (
      <div className="item-text-field">
        <span>{label}</span>
        <span className={require ? "text_error" : ""}>*</span>
        <FCTextField
          type={type}
          placeholder={placeholder}
          name={name}
          size="small"
          register={register}
          disabled={disabled}
          className="input-login"
        />
      </div>
    );
  };
  const renderLogin = () => {
    return (
      <>
        <div className="form-item-login">
          <form className="form-" onSubmit={handleSubmit(onSubmit)}>
            {renderTextFieldTemp(
              "T??i kho???n",
              "text",
              "H??? v?? t??n",
              "userName",
              true
            )}
            {renderTextFieldTemp(
              "M???t kh???u",
              "password",
              "M???t kh???u",
              "password",
              true
            )}
            <div className="btn-login">
              <FCButton type="submit" text="????ng nh???p" />
            </div>
          </form>
          <div className="forgot-password">
            <div>
              <Link to="/forgot-password"> Qu??n m???t kh???u</Link>
            </div>
            <div>
              Ch??a c?? t??i kho???n ?{" "}
              <Button onClick={hanldeChangeView}> ????ng k?? ngay </Button>
            </div>
          </div>
        </div>
      </>
    );
  };
  const renderRegistor = () => {
    return (
      <>
        <div className="form-item-register">
          <form className="form-" onSubmit={handleSubmit(onSubmitRegistor)}>
            {renderTextFieldTemp(
              "T??n ????ng nh???p",
              "text",
              "T??n ????ng nh???p",
              "fullName",
              true
            )}
            {renderTextFieldTemp(
              "M???t kh???u",
              "password",
              "M???t kh???u",
              "password",
              true
            )}

            {renderTextFieldTemp(
              "H??? v?? t??n",
              "text",
              "H??? v?? t??n",
              "userName",
              true
            )}
            {renderTextFieldTemp("?????a ch???", "text", "?????a ch???", "address", true)}
            {renderTextFieldTemp(
              "S??? ch???ng minh nh??n d??n",
              "text",
              "S??? ch???ng minh nh??n d??n",
              "numberCMND",
              true
            )}
            {renderTextFieldTemp("Email", "email", "Email", "email", true)}
            {renderTextFieldTemp(
              "S??? ??i???n tho???i",
              "text",
              "S??? ??i???n tho???i",
              "phone",
              true
            )}
            <div className="btn-register">
              <FCButton type="submit" text="????ng k??" />
              <div>
                ???? c?? t??i kho???n ?{" "}
                <Button type="submit" onClick={hanldeChangeView}>
                  {" "}
                  ????ng nh???p ngay{" "}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  };
  return (
    <div className="login-view">
      <Grid container>
        <Grid md={7} item className="left-form-login"></Grid>
        <Grid md={5} item className="right-form-login">
          <Container className="container-login">
            {changeView ? renderRegistor() : renderLogin()}
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};
