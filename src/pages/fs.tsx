import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Loading } from "src/components/Loading";
import { NextPage } from "next";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TStack } from "src/components/TElements";
import Select from "src/r-components/Select";
import { Formik } from "formik";

const Feedback: NextPage = () => {
  const [subject, setSubject] = useState("Feature Request");
  const [suggestion, setSuggestion] = useState("");
  const [email, setEmail] = useState("");

  const { mutate, isLoading, isError, isSuccess, isIdle } = useMutation(
    async () => await axios.post("/api/fs", { email, subject, suggestion })
  );

  if (isLoading) return <Loading />;

  return (
    <div className='flex flex-col justify-center items-center h-full p-4'>
      <div className='flex bg-white drop-shadow-md rounded-2xl items-center p-3 border border-bordergray'>
        {isError ? (
          <h2 className='text-base'>Something went wrong!</h2>
        ) : isSuccess ? (
          <>
            <h2 className='text-base'>
              Thank you for your feedback, your response has been recorded
            </h2>
            <h2 className='text-base'>
              We will sincerly take your precious suggestions 😃
            </h2>
          </>
        ) : (
          isIdle && (
            <Formik
              initialValues={{
                heading: "feature-request",
                suggestion: "",
                email: "",
              }}
              onSubmit={(values) => {
                console.log(values);
              }}>
              {({
                values,
                dirty,
                getFieldProps,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit} className='space-y-4 '>
                  <Select
                    triggerStyles='bg-black text-white p-1 rounded-lg'
                    value={values.heading}
                    onValueChange={(selected) => {
                      setFieldValue("heading", selected);
                    }}
                    selectList={[
                      { item: "Feature Request", value: "feature-request" },
                      { item: "Bug(s) Reporting", value: "bug-reporting" },
                    ]}
                  />

                  <textarea
                    className='rounded-xl px-3 py-1 bg-neutral-200 w-full resize-none'
                    name='suggestion'
                    value={suggestion}
                    placeholder='suggestion'
                    {...getFieldProps("suggestion")}
                  />
                  <input
                    className='rounded-xl px-3 py-2 bg-neutral-200 w-full'
                    type='email'
                    name='email'
                    placeholder='your email address'
                    {...getFieldProps("email")}
                  />
                  <button
                    disabled={!dirty}
                    className='bg-black p-2 w-full rounded-xl text-white'
                    type='submit'>
                    Send
                  </button>
                </form>
              )}
            </Formik>
          )
        )}
      </div>
    </div>
  );
};

export default Feedback;
