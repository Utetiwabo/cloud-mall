import * as Dialog from "@radix-ui/react-dialog/dist";
import axios from "axios";
import { updateProfile, User } from "firebase/auth";
import { Form, Formik, useFormik } from "formik";
import {
  Dispatch,
  Fragment,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@lib/firebase";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "@lib/validationSchemas";
import { InputTemp } from "./InputTemp";
// import { AppleIconSvg, FacebookIconSvg, GoogleIconSvg } from "./Svgs";
import { THStack, TIconButton, TStack } from "./TElements";
import { useStore } from "store/store";

interface PageProps {
  setPage: Dispatch<SetStateAction<string>>;
  // initialFocusRef: MutableRefObject<HTMLInputElement>;
}

const AuthModal = () => {
  const authModalOpen = useStore((state) => state.auth.modalOpen);

  const onToggle = useStore((state) => state.onToggleAuthModal);

  const [page, setPage] = useState("login");

  return (
    <Dialog.Root open={authModalOpen} onOpenChange={onToggle}>
      <Dialog.Portal>
        <Dialog.Overlay className=' bg-gray-800 z-20 opacity-60 inset-0 fixed' />
        <div className='flex fixed inset-0 min-h-full items-end z-30 justify-center p-2 text-center sm:items-center sm:p-0'>
          <Dialog.Content className='relative w-full p-3 overflow-hidden rounded-2xl border-t border-gray-400 bg-maingray shadow-md shadow-gray-500 transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <>
              <h1 className='text-center font-semibold text-2xl text-white'>
                {page}
              </h1>
              <THStack className='w-full justify-center py-3' space='space-x-4'>
                <TIconButton aria-label='google-sign-in/up' variant='ghost'>
                  {/* <GoogleIconSvg boxSize={10} /> */}
                </TIconButton>
                {/* <FacebookIconSvg boxSize={10} opacity='0.4' /> */}
                <div className='rounded-full bg-white shadow-lg opacity-30'>
                  {/* <AppleIconSvg boxSize={10} /> */}
                </div>
              </THStack>
              {page === "login" ? (
                <LoginForm setPage={setPage} />
              ) : (
                <RegisterForm setPage={setPage} />
              )}
            </>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const LoginForm = ({ setPage }: PageProps) => {
  const [signIn, loggedInUser, loginLoading, loginError] =
    useSignInWithEmailAndPassword(auth);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValidationSchema}
        onSubmit={({ email, password }) => {
          signIn(email, password);
        }}>
        {({ getFieldProps, errors, touched }) => (
          <Form>
            <div className='w-full'>
              <div className='h-5 flex items-center'>
                {loginError && (
                  <p className='text-center mx-auto text-sm text-orange-200 style'>
                    {loginError.code === "auth/network-request-failed"
                      ? "offline"
                      : loginError.code}
                  </p>
                )}
              </div>
              <InputTemp
                autoFocus={true}
                touched={touched.email}
                error={errors.email}
                fieldTitle='E-mail'
                fieldType='text'
                placeholder='@mail'
                fieldProps={getFieldProps("email")}
              />
              <InputTemp
                placeholder='password'
                touched={touched.password}
                error={errors.password}
                fieldTitle='Password'
                fieldType='password'
                fieldProps={getFieldProps("password")}
              />
              {/* <button style={{ display: "none" }} /> */}
            </div>
            <THStack className='pt-5'>
              <>
                <button
                  type='button'
                  className='w-full bg-white text-black p-2 rounded-xl '
                  onClick={() => {
                    setPage("register");
                  }}>
                  Register
                </button>

                <button
                  type='submit'
                  className='w-full bg-black text-white p-2 rounded-xl '
                  onClick={() => {}}>
                  Sign In
                </button>
              </>
            </THStack>
          </Form>
        )}
      </Formik>
      <button className='text-sm  text-blue-500 pt-2'>forgot password?</button>
    </>
  );
};

const RegisterForm = ({ setPage }: PageProps) => {
  const [createUser, createdUser, createNewLoading, createError] =
    useCreateUserWithEmailAndPassword(auth);

  const { mutate, mutateAsync } = useMutation(async (variables: {}) =>
    axios.post("/api/user/new", variables)
  );

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerValidationSchema}
        onSubmit={async (values) => {
          createUser(values.email, values.password);
          // try {
          //   await createUser(values.email, values.password);
          //   !createError &&
          //     (await updateProfile(createdUser?.user, {
          //       displayName: values.name,
          //     }));
          //   !createError &&
          //     mutate({
          //       uid: createdUser?.user.uid,
          //       firstName: values.name.split(" ")[0],
          //       lastName: values.name.split(" ")[1] || "",
          //       // phone: parseInt(values.phone),
          //       email: values.email,
          //     });
          // } catch (err) {
          //   console.log(err);
          // }
        }}>
        {({ getFieldProps, errors, touched }) => (
          <Form>
            <TStack className=''>
              <div className='h-3 flex items-center'>
                {createError && (
                  <p className='text-center mx-auto text-sm text-orange-200 style'>
                    {createError.code === "auth/network-request-failed"
                      ? "offline"
                      : createError.code}
                  </p>
                )}
              </div>
              <InputTemp
                autoFocus
                touched={touched.name}
                error={errors.name}
                fieldTitle='Name'
                fieldType='text'
                fieldProps={getFieldProps("name")}
              />

              <InputTemp
                touched={touched.email}
                error={errors.email}
                fieldTitle='E-mail'
                fieldType='email'
                fieldProps={getFieldProps("email")}
              />

              <InputTemp
                touched={touched.password}
                error={errors.password}
                fieldTitle='Password'
                fieldType='password'
                fieldProps={getFieldProps("password")}
              />

              <InputTemp
                touched={touched.confirmPassword}
                error={errors.confirmPassword}
                fieldTitle='Confirm Password'
                fieldType='password'
                fieldProps={getFieldProps("confirmPassword")}
              />
              {/* <button style={{ display: "none" }} /> */}
            </TStack>
            <THStack className='pt-5'>
              <>
                <button
                  type='button'
                  className='w-full bg-white text-black p-2 rounded-xl '
                  onClick={() => {
                    setPage("login");
                  }}>
                  Sign In
                </button>

                <button
                  type='submit'
                  className='w-full bg-black text-white p-2 rounded-xl '
                  onClick={() => {}}>
                  Register
                </button>
              </>
            </THStack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthModal;
