import { User } from "firebase/auth";
import { FieldInputProps, Form, Formik } from "formik";
import { MutableRefObject, useState } from "react";
import { shippingDetailsValidationSchema } from "@lib/validationSchemas";
import { InputTemp, TextareaTemp } from "./InputTemp";
import { TButton, TDivider, TFlex, THStack, TStack } from "./TElements";
import { useRouter } from "next/router";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Checkbox } from "./CartItem";
import { useStore } from "store/store";
import Link from "next/link";
import Select from "src/r-components/Select";
import { UserData } from "types/customer";

interface ShippingInfoProps {
  dirty: boolean;
  formikFieldProps: {
    getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
    touched: any;
    errors: any;
  };
  user: User;
  selectAddress: (value: string) => void;
  userdata?: UserData;
}

const ShippingInfoArea = ({
  dirty,
  formikFieldProps,
  user,
  selectAddress,
  userdata,
}: ShippingInfoProps) => {
  const router = useRouter();

  const [checked, setChecked] = useState(false);

  const { getFieldProps, touched, errors } = formikFieldProps;

  return (
    <form className='space-y-2 border z-0 border-[#CFD3D9] text-gray-700 rounded-2xl p-3'>
      {!user && (
        <TFlex className='md:absolute z-50 top-0 w-fit'>
          <div className='mr-2'>
            <button
              type='button'
              onClick={() => setChecked((old) => !old)}
              className={`rounded-lg  cursor-pointer group hover:bg-gray-100 grow flex w-6 h-6 items-center justify-center shadow-md text-black ${
                checked ? "bg-gray-300" : "bg-gray-300"
              }`}>
              {checked && <CheckIcon width={"100%"} />}
            </button>
          </div>
          <p className='text-base md:text-base text-gray-700 italic'>
            Also create an account for me?
          </p>
        </TFlex>
      )}

      <h2 className='font-semibold text-xl text-center'>
        Shipping Information
      </h2>
      <TDivider />

      {user && userdata && userdata?.shippingDetails?.length > 0 && (
        <TFlex className='justify-between items-start'>
          <div className='flex space-x-3 text-lg mr-10'>
            <Select
              triggerStyles='rounded-lg bg-neutral-500 text-white'
              contentStyles='bg-neutral-500'
              selectList={userdata?.shippingDetails?.map((detail) => ({
                item: detail.tag,
                value: detail.tag,
              }))}
              defaultSelected='default'
              onValueChange={selectAddress}
            />
            {/* <button className='underline'>change</button> */}
            <Link href='/account/settings' className='underline'>
              edit
            </Link>
          </div>
          <p className='text-neutral-400 text-sm'>
            {dirty
              ? "using current details for this order only"
              : "or you can quickly set the details for this order"}
          </p>
        </TFlex>
      )}
      {/* <Divider /> */}
      <THStack>
        <InputTemp
          fieldTitle='Firstname'
          fieldType='text'
          placeholder='firstname'
          fieldProps={getFieldProps("firstName")}
          touched={touched.firstName}
          error={errors.firstName}
        />

        <InputTemp
          fieldTitle='Lastname'
          fieldType='text'
          placeholder='firstname'
          fieldProps={getFieldProps("lastName")}
          touched={touched.lastName}
          error={errors.lastName}
        />
      </THStack>

      <InputTemp
        fieldTitle='Phone'
        fieldType='tel'
        placeholder='firstname'
        fieldProps={getFieldProps("phone")}
        touched={touched.phone}
        error={errors.phone}
      />

      <InputTemp
        fieldTitle='E-mail'
        fieldType='email'
        placeholder='firstname'
        fieldProps={getFieldProps("email")}
        touched={touched.email}
        error={errors.email}
      />

      <THStack>
        <InputTemp
          fieldTitle='Location'
          fieldType='text'
          placeholder='location'
          fieldProps={getFieldProps("location")}
          touched={touched.location}
          error={errors.location}
        />
        <InputTemp
          fieldTitle='State'
          fieldType='text'
          placeholder='state'
          fieldProps={getFieldProps("state")}
          touched={touched.state}
          error={errors.state}
        />
      </THStack>

      <TextareaTemp
        fieldTitle='Address'
        fieldType='text'
        placeholder='state'
        fieldProps={getFieldProps("address")}
        touched={touched.address}
        error={errors.address}
      />

      <TextareaTemp
        fieldTitle='Notes'
        placeholder='Optional notes'
        fieldProps={getFieldProps("notes")}
        touched={touched.notes}
        error={errors.notes}
      />
    </form>
  );
};

export default ShippingInfoArea;
