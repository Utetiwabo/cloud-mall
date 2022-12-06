import { FieldInputProps, FormikErrors, FormikTouched } from "formik";
import { HTMLInputTypeAttribute, LegacyRef } from "react";
import { TFlex } from "./TElements";

export interface InputTempProps {
  autoFocus?: boolean;
  fieldTitle: string;
  fieldType?: HTMLInputTypeAttribute;
  fieldProps: FieldInputProps<string | number | readonly string[] | undefined>;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  placeholder?: string;
  hColor?: "light" | "dark";
}

export interface TextareaTempProps extends InputTempProps {
  resize?: boolean;
  rows?: number;
}

export const InputTemp = ({
  autoFocus,
  fieldTitle,
  fieldType = "text",
  fieldProps,
  touched,
  error,
  placeholder,
  hColor = "light",
}: InputTempProps) => {
  //TODO switch ibg to inputprops
  return (
    <div className='w-full'>
      <TFlex className='justify-between w-full h-5 mb-2 mt-1'>
        <h1
          className={`${
            hColor === "light" ? "text-gray-300 " : "text-gray-700"
          }`}>
          {fieldTitle}
        </h1>
        {touched && error && (
          <p className='text-sm text-orange-200 style'>{error?.toString()}</p>
        )}
      </TFlex>
      <div>
        <input
          autoFocus={autoFocus}
          className='bg-gray-200 w-full px-5 rounded-lg h-9 text-base text-start placeholder:text-opacity-75 text-md outline-none '
          type={fieldType}
          placeholder={placeholder}
          // ref={ref}
          {...fieldProps}
        />
      </div>
    </div>
  );
};

export const TextareaTemp = ({
  autoFocus,
  fieldTitle,
  fieldProps,
  touched,
  error,
  placeholder,
  resize,
  rows = 2,
  hColor = "light",
}: TextareaTempProps) => {
  //TODO switch ibg to inputprops
  return (
    <div>
      <TFlex className='justify-between w-full h-5 mb-2'>
        <h1
          className={`${
            hColor === "light" ? "text-gray-300 " : "text-gray-700"
          }`}>
          {fieldTitle}
        </h1>
        {touched && error && (
          <p className='text-sm text-orange-200 style'>{error?.toString()}</p>
        )}
      </TFlex>
      <textarea
        autoFocus={autoFocus}
        rows={rows}
        className={`bg-gray-200 w-full ${
          !resize && "resize-none"
        } rounded-lg text-base placeholder:text-opacity-75 py-2 px-5 text-md outline-none `}
        placeholder={placeholder}
        // ref={ref}
        {...fieldProps}
      />
    </div>
  );
};

const data = [
  {
    _id: "nhyg6gbdvtg6ghnj",
    id: "how-to-place-and-order",
    body1:
      "This is the first part of the help blog, ideally the body should be splitted into two or three parts to make for images",
    images: [
      { id: "1", url: "https://image.png" },
      { id: "2", url: "https://image.png" },
    ],
    body2:
      "This is the second part of the body that should be seperated by an image or paragraph or some section. The images can be accessed based on their ids, so it makes sense to store them together in an array. Additional data like links and medias can be created with their keys. The _id is a special field used in the database to save unique documents, so we can make use of id to save our custom id and query the database by that key",
  },
  {
    _id: "ehdyggh6gb44vtg6ghnj",
    id: "how-to-change-my-email-address",
    body1:
      "This is the first part of the help blog, ideally the body should be splitted into two or three parts to make for images",
    images: [
      { id: "1", url: "https://image.png" },
      { id: "2", url: "https://image.png" },
    ],
    body2:
      "This is the second part of the body that should be seperated by an image or paragraph or some section. The images can be accessed based on their ids, so it makes sense to store them together in an array. Additional data like links and medias can be created with their keys.",
  },
];
