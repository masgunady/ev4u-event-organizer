import imgFemale from '../../assets/img/female.png'
import imgMale from '../../assets/img/male.png'
import logo from '../../assets/img/icon-logo.svg'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Formik } from 'formik'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import propTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../redux/reducers/auth'
import { asyncRegisterAction } from '../../redux/action/auth'

import * as Yup from 'yup'

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is Required!').min(3, 'Please insert valid full name'),
    email: Yup.string().required('Email is Required!').email('Email is invalid!'),
    password: Yup.string().required('Password is Required'),
    confirmPassword: Yup.string()
        .required('Confirm password is Required')
        .oneOf([Yup.ref('password'), null], 'Password must match'),
    termAndCondition: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
})

const FormRegister = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => {
    const errorMessage = useSelector((state) => state.auth.errorMessage)
    const warningMessage = useSelector((state) => state.auth.warningMessage)
    const successMessage = useSelector((state) => state.auth.successMessage)
    const [iconEye, setIconEye] = React.useState(false)
    const [typePassword, setTypePassword] = React.useState(false)
    const [iconEyeCp, setIconEyeCp] = React.useState(false)
    const [typeConfirmPassword, setTypeConfirmPassword] = React.useState(false)

    const handleInputPassword = () => {
        setIconEye(!typePassword)
        setTypePassword(!iconEye)
    }
    const handleInputConfirmPassword = () => {
        setIconEyeCp(!typeConfirmPassword)
        setTypeConfirmPassword(!iconEyeCp)
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3.5'>
            {warningMessage && <div className='alert alert-warning'>{warningMessage}</div>}
            {errorMessage && <div className='alert alert-error'>{errorMessage}</div>}
            {successMessage && <div className='alert alert-success'>{successMessage}</div>}
            <div className='form-control text-sm tracking[0.5]'>
                <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    className={`input input-bordered ${errors.fullName && touched.fullName && 'input-error'} w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl text-secondary`}
                    type='text'
                    name='fullName'
                    placeholder='Full Name'
                />
                {errors.fullName && touched.fullName && (
                    <label htmlFor='fullName' className='label'>
                        <span className='label-text-alt text-error'>{errors.fullName}</span>
                    </label>
                )}
            </div>
            <div className='form-control text-sm tracking[0.5]'>
                <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={`input input-bordered ${errors.email && touched.email && 'input-error'} w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl text-secondary`}
                    type='text'
                    name='email'
                    placeholder='Email'
                />
                {errors.email && touched.email && (
                    <label htmlFor='email' className='label'>
                        <span className='label-text-alt text-error'>{errors.email}</span>
                    </label>
                )}
            </div>

            <div className='form-control text-sm tracking[0.5] relative'>
                <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={`input input-bordered ${errors.password && touched.password && 'input-error'} w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl text-secondary`}
                    type={typePassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Password'
                />
                {errors.password && touched.password && (
                    <label htmlFor='password' className='label'>
                        <span className='label-text-alt text-error'>{errors.password}</span>
                    </label>
                )}
                <button type='button' onClick={handleInputPassword} className='absolute top-[18px] right-4 text-[#4c3f91]'>
                    {iconEye ? (
                        <i className=''>
                            <FiEyeOff size={20} />
                        </i>
                    ) : (
                        <i className=''>
                            <FiEye size={20} />
                        </i>
                    )}
                </button>
            </div>
            <div className='form-control text-sm tracking[0.5] relative'>
                <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    className={`input input-bordered ${errors.confirmPassword && touched.confirmPassword && 'input-error'} w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl text-secondary`}
                    type={typeConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    placeholder='Confirm Password'
                />
                {errors.confirmPassword && touched.confirmPassword && (
                    <label htmlFor='confirmPassword' className='label'>
                        <span className='label-text-alt text-error'>{errors.confirmPassword}</span>
                    </label>
                )}
                <button type='button' onClick={handleInputConfirmPassword} className='absolute top-[18px] right-4 text-[#4c3f91]'>
                    {iconEyeCp ? (
                        <i className=''>
                            <FiEyeOff size={20} />
                        </i>
                    ) : (
                        <i className=''>
                            <FiEye size={20} />
                        </i>
                    )}
                </button>
            </div>

            <div className='flex items-center gap-3.5'>
                <div className='form-control'>
                    <Field type='checkbox' name='termAndCondition' id='termAndCondition' />
                </div>
                <label htmlFor='termAndCondition' className='self-end text-sm text-[#373A42] font-medium tracking[0.5] my-3'>
                    Accept terms and condition
                </label>
            </div>
            {errors.termAndCondition && touched.termAndCondition && (
                <label htmlFor='termAndCondition' className='label'>
                    <span className='label-text-alt text-error'>{errors.termAndCondition}</span>
                </label>
            )}
            <div>
                <button type='submit' disabled={isSubmitting} className='btn btn-primary capitalize shadow-for-all-button w-full h-14 rounded-xl  text-base font-semibold tracking-[1px] text-white'>
                    Sign up
                </button>
            </div>
        </form>
    )
}

FormRegister.propTypes = {
    values: propTypes.objectOf(propTypes.string),
    errors: propTypes.objectOf(propTypes.string),
    touched: propTypes.objectOf(propTypes.bool),
    handleBlur: propTypes.func,
    handleChange: propTypes.func,
    handleSubmit: propTypes.func,
    isSubmitting: propTypes.bool,
}

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formError = useSelector((state) => state.auth.formError)
    const successMessage = useSelector((state) => state.auth.successMessage)

    const doRegister = async (values, { setSubmitting, setFieldError }) => {
        dispatch(clearMessage())
        dispatch(asyncRegisterAction(values))
        if (formError.length) {
            // setErrors({
            //     fullName: formError.filter((item) => item.param === 'fullName')[0].msg,
            //     email: formError.filter((item) => item.param === 'email')[0].msg,
            //     password: formError.filter((item) => item.param === 'password')[0].msg,
            //     confirmPassword: formError.filter((item) => item.param === 'confirmPassword')[0].msg,
            //     termAndCondition: formError.filter((item) => item.param === 'termAndCondition')[0].msg,
            // })

            console.log(formError)
            const fullName = formError.filter((item) => item.param === 'fullName')[0]?.msg
            const email = formError.filter((item) => item.param === 'email')[0]?.msg
            const password = formError.filter((item) => item.param === 'password')[0]?.msg

            console.log(fullName)
            console.log(email)
            console.log(password)

            if (fullName) {
                setFieldError('fullName', fullName)
            }
            if (email) {
                setFieldError('email', email)
            }
            if (password) {
                setFieldError('password', password)
                setFieldError('confirmPassword', password)
            }
        }
        setSubmitting(false)
    }

    React.useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                navigate('/auth/login')
            }, 3000)
            // setTimeout(() => {
            //     dispatch(clearMessage())
            // }, 2000)
        }
    }, [successMessage, navigate])

    const handleLinkLogin = () => {
        dispatch(clearMessage())
    }

    React.useEffect(() => {
        dispatch(clearMessage())
    }, [dispatch])
    return (
        <>
            <main>
                <div className='flex'>
                    <section className='basis-3/5 hidden lg:block'>
                        <div className='h-[100vh] flex items-center justify-center bg-[#4c3f91]'>
                            <div className='w-[549px] h-[478px] relative'>
                                <img className='absolute z-10' src={imgFemale} alt='' />
                                <img className='absolute right-[0px] top-[100px]' src={imgMale} alt='' />
                                <div className='absolute bottom-0 z-10 h-[230px] w-full bg-gradient-to-t from-[#4c3f91] from-35%'></div>
                            </div>
                        </div>
                    </section>
                    <section className='w-full lg:basis-2/5 mt-24 px-11 xl:px-24 2xl:px-36'>
                        <div className='w-full flex flex-col gap-3.5'>
                            <div className='flex justify-start items-center gap-3.5 mb-12'>
                                <div>
                                    <img src={logo} alt='' />
                                </div>
                                <div>
                                    <Link to='/'>
                                        <p className='text-2xl font-semibold text-[#3366FF] tracking-[1px]'>
                                            We
                                            <span className='text-[#FF3D71]'>tick</span>
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className='text-2xl font-semibold tracking-[1px] text-[#373A42]'>Sign up</div>
                            <div className='text-sm font-semibold tracking-[0.5px] text-[#373A42] mb-8'>
                                Already have an account ?{' '}
                                <Link to='/auth/login' className='text-primary capitalize'>
                                    <button type='button' onClick={handleLinkLogin}>
                                        Sign in
                                    </button>
                                </Link>
                            </div>

                            <Formik initialValues={{ fullName: '', email: '', password: '', confirmPassword: '', termAndCondition: false }} validationSchema={validationSchema} onSubmit={doRegister}>
                                {(props) => <FormRegister {...props} />}
                            </Formik>
                            <div className='flex flex-col items-center justify-center gap-4 mt-2'>
                                <div className='text-sm tracking[0.5] text-[#373A42]'>or sign in with</div>
                                <div className='flex items-center justify-center gap-4'>
                                    <div className='w-24 h-14 flex items-center justify-center rounded-md border-2 border-[#4c3f91] cursor-pointer'>
                                        <i className=''>
                                            <FcGoogle size={25} />
                                        </i>
                                    </div>
                                    <div className='w-24 h-14 flex items-center justify-center rounded-md border-2 border-[#4c3f91] cursor-pointer'>
                                        <i className=''>
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
    )
}

export default SignUp
