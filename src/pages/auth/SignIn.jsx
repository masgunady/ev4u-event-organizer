import imgFemale from "../../assets/img/female.png";
import imgMale from "../../assets/img/male.png";
import logo from "../../assets/img/icon-logo.svg";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import propTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../redux/reducers/auth";

import { asyncLoginAction } from "../../redux/action/auth";

import * as Yup from "yup";

const validationSchema = Yup.object({
    email: Yup.string()
        .required("Email is Required!")
        .email("Email is invalid!"),
    password: Yup.string().required("Password is invalid"),
});

const FormLogin = ({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
}) => {
    const errorMessage = useSelector((state) => state.auth.errorMessage);
    const warningMessage = useSelector((state) => state.auth.warningMessage);
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {warningMessage && (
                <div className="alert alert-warning">{warningMessage}</div>
            )}
            <div className="form-control text-sm tracking[0.5]">
                <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={`input input-bordered ${
                        errors.email && touched.email && "input-error"
                    } w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl`}
                    type="text"
                    name="email"
                    placeholder="Email"
                />
                {errors.email && touched.email && (
                    <label htmlFor="email" className="label">
                        <span className="label-text-alt text-error">
                            {errors.email}
                        </span>
                    </label>
                )}
            </div>

            <div className="form-control text-sm tracking[0.5] relative">
                <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={`input input-bordered ${
                        errors.password && touched.password && "input-error"
                    } w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl`}
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                {errors.password && touched.password && (
                    <label htmlFor="password" className="label">
                        <span className="label-text-alt text-error">
                            {errors.password}
                        </span>
                    </label>
                )}

                <div className="absolute top-[18px] right-4 text-[#4c3f91]">
                    <i className="">
                        <FiEye size={20} />
                    </i>
                </div>
            </div>
            {errorMessage && (
                <div className="alert alert-error">{errorMessage}</div>
            )}
            <div className="self-end text-sm text-[#4c3f91] font-semibold tracking[0.5] my-3">
                <Link to="/auth/forgot-password">Forgot Password ?</Link>
            </div>
            <div>
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn shadow-for-all-button w-full h-14 rounded-xl bg-[#4c3f91] text-base font-semibold tracking-[1px] text-white"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
};

FormLogin.propTypes = {
    values: propTypes.objectOf(propTypes.string),
    errors: propTypes.objectOf(propTypes.string),
    touched: propTypes.objectOf(propTypes.bool),
    handleBlur: propTypes.func,
    handleChange: propTypes.func,
    handleSubmit: propTypes.func,
    isSubmitting: propTypes.bool,
};

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const formError = useSelector((state) => state.auth.formError);

    React.useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);
    const doLogin = async (values, { setSubmitting, setErrors }) => {
        dispatch(clearMessage());
        dispatch(asyncLoginAction(values));
        if (formError.length) {
            setErrors({
                email: formError.filter((item) => item.param === "email")[0]
                    .message,
                password: formError.filter(
                    (item) => item.param === "password"
                )[0].message,
            });
        }
        setSubmitting(false);
    };
    return (
        <>
            <main>
                <div className="flex">
                    <section className="basis-3/5 hidden lg:block">
                        <div className="h-[100vh] flex items-center justify-center bg-[#4c3f91]">
                            <div className="w-[549px] h-[478px] relative">
                                <img
                                    className="absolute z-10"
                                    src={imgFemale}
                                    alt=""
                                />
                                <img
                                    className="absolute right-[0px] top-[100px]"
                                    src={imgMale}
                                    alt=""
                                />
                                <div className="absolute bottom-0 z-10 h-[230px] w-full bg-gradient-to-t from-[#4c3f91] from-35%"></div>
                            </div>
                        </div>
                    </section>
                    <section className="w-full lg:basis-2/5 mt-24 px-11 xl:px-24 2xl:px-36">
                        <div className="w-full flex flex-col gap-3.5">
                            <div className="flex justify-start items-center gap-3.5 mb-12">
                                <div>
                                    <img src={logo} alt="" />
                                </div>
                                <div>
                                    <Link to="/">
                                        <p className="text-2xl font-semibold text-[#3366FF] tracking-[1px]">
                                            We
                                            <span className="text-[#FF3D71]">
                                                tick
                                            </span>
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className="text-2xl font-semibold tracking-[1px] text-[#373A42]">
                                Sign In
                            </div>
                            <div className="text-sm font-semibold tracking-[0.5px] text-[#373A42] mb-8">
                                Hi, Welcome back to Urticket!
                            </div>

                            <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={validationSchema}
                                onSubmit={doLogin}
                            >
                                {(props) => <FormLogin {...props} />}
                            </Formik>
                            <div className="flex flex-col items-center justify-center gap-4 mt-12">
                                <div className="text-sm tracking[0.5] text-[#373A42]">
                                    or sign in with
                                </div>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-24 h-14 flex items-center justify-center rounded-md border-2 border-[#4c3f91] cursor-pointer">
                                        <i className="">
                                            <FcGoogle size={25} />
                                        </i>
                                    </div>
                                    <div className="w-24 h-14 flex items-center justify-center rounded-md border-2 border-[#4c3f91] cursor-pointer">
                                        <i className="">
                                            <FaFacebook size={25} />
                                        </i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default SignIn;
