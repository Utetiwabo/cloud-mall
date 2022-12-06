import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ChatBubbleBottomCenterIcon,
  CheckIcon,
  ChevronLeftIcon,
  KeyIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { User } from "firebase/auth";
import { Form, Formik } from "formik";
import { auth } from "@lib/firebase";
import { UserData } from "types/customer";
// import { FacebookIconSvg, GoogleIconSvg } from "@components/Svgs";
import { Loading } from "src/components/Loading";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import {
  passwordValidationSchema,
  profileValidationSchema,
  shippingValidationSchema,
} from "@lib/validationSchemas";
import {
  TDivider,
  TFlex,
  TGrid,
  THStack,
  TStack,
} from "src/components/TElements";
import { InputTemp } from "src/components/InputTemp";
import Link from "next/link";
import Avatar from "src/r-components/Avatar";

const Settings = ({ user }: { user: User }) => {
  // const shippingDetailsRef = useRef<HTMLButtonElement | null>(null);
  // const passwordRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const { data: userdata, isLoading: queryLoading } = useQuery<UserData>(
    ["user", { query: { customerId: user?.uid } }],
    {
      enabled: !!user,
      networkMode: "offlineFirst",
    }
  );

  const {
    mutate,
    isLoading: mutationLoading,
    data,
    error,
    status,
  } = useMutation(
    async (variables: { customerId: string; data: {} }) => {
      const { data } = await axios.put("/api/user", variables);
      return data;
    },

    {
      onError: () => {},
      onSuccess: (data, variables) => {
        queryClient.setQueryData(
          ["user", { query: { customerId: variables.customerId } }],
          data
        );
      },
    }
  );

  const queryClient = useQueryClient();

  const [newsLetters, setNewsLetters] = useState(
    userdata?.preferences?.newsLetters || false
  );

  const [passwordValidated, setPasswordValidated] = useState(false);

  const [shippingDetailsIndex, setShippingDetailsIndex] = useState(0);

  const [addNewAddress, setAddNewAddress] = useState(false);

  const focusedShippingDetails =
    (userdata?.shippingDetails ||
      (userdata?.shippingDetails && userdata?.shippingDetails?.length > 0)) &&
    !addNewAddress
      ? userdata?.shippingDetails[shippingDetailsIndex]
      : { address: "", phone: "", email: "", location: "", state: "" };

  const handleProfileSubmit = (data) => {
    mutate({
      customerId: user.uid,
      data,
    });
  };

  const handlePasswordChange = () => {};

  const handleDeleteShippingDetail = () => {
    const unFocusedShippingDetails = userdata?.shippingDetails.filter(
      (details, index) => index !== shippingDetailsIndex
    );
    mutate(
      {
        customerId: user.uid,
        data: { shippingDetails: unFocusedShippingDetails },
      },
      { onSuccess: () => setShippingDetailsIndex(0) }
    );
  };

  const handleShippingChanges = (values: any) => {
    if (addNewAddress) {
      if (userdata?.shippingDetails && userdata?.shippingDetails.length > 4) {
        return;
      } else {
        mutate(
          {
            customerId: user.uid,
            data: {
              shippingDetails:
                userdata?.shippingDetails && userdata.shippingDetails.length > 0
                  ? [...userdata.shippingDetails, values]
                  : [{ ...values, default: true }],
            },
          },
          { onSuccess: () => setAddNewAddress(false) }
        );
      }
      // console.log(values);
    } else {
      const unFocusedShippingDetails =
        userdata?.shippingDetails.filter(
          (details, index) => index !== shippingDetailsIndex
        ) || [];

      const focusedDetails = userdata?.shippingDetails.find(
        (details, index) => index === shippingDetailsIndex
      );
      if (focusedDetails) {
        const updatedShippingDetails =
          shippingDetailsIndex === 0
            ? [...unFocusedShippingDetails, { ...values, default: true }]
            : [...unFocusedShippingDetails, values];
        mutate({
          customerId: user.uid,
          data: { shippingDetails: updatedShippingDetails },
        });
      } else return;
    }
  };

  if (queryLoading || mutationLoading) return <Loading />;

  return (
    <>
      <div className='fixed bg-black top-0 right-0 left-0 w-full'>
        <div className='relative w-full p-2 '>
          <button
            onClick={() => router.back()}
            className='absolute left-0 text-white'>
            <ChevronLeftIcon width={30} stroke='white' />
          </button>
          <p className='text-white text-2xl text-center'>Settings</p>
        </div>
      </div>

      <TGrid className='grid grid-cols-6 max-w-screen-lg gap-5 lg:gap-2 mt-16 p-2'>
        <Formik
          initialValues={{
            firstName: userdata?.firstName || "",
            lastName: userdata?.lastName || "",
            phone: userdata?.phone || "",
            email: userdata?.email || "",
          }}
          enableReinitialize
          validationSchema={profileValidationSchema}
          onSubmit={handleProfileSubmit}>
          {({ getFieldProps, errors, touched, dirty }) => (
            <div className='col-span-6 lg:col-span-2 p-2 bg-white rounded-xl'>
              <Form className='flex flex-col items-center'>
                <h2 className=' text-lg font-semibold'>profile</h2>
                <TDivider className='border-gray-200 w-full mb-3' />
                {/* <Avatar  /> */}
                {/* <HStack> */}
                <TStack className='w-full'>
                  <InputTemp
                    fieldType='text'
                    fieldProps={getFieldProps("firstName")}
                    error={errors.firstName}
                    touched={!!touched.firstName}
                    fieldTitle='First Name'
                    placeholder='firstname'
                    hColor='dark'
                  />
                  <InputTemp
                    fieldType='text'
                    fieldProps={getFieldProps("lastName")}
                    error={errors.lastName}
                    touched={!!touched.lastName}
                    fieldTitle='Last Name'
                    placeholder='lastname'
                    hColor='dark'
                  />
                  <InputTemp
                    fieldType='text'
                    fieldProps={getFieldProps("phone")}
                    error={errors.phone}
                    touched={!!touched.phone}
                    fieldTitle='Phone'
                    placeholder='phone'
                    hColor='dark'
                  />
                  <p className='text-sm text-gray-600'>Confirmation required</p>
                  <InputTemp
                    fieldType='text'
                    fieldProps={getFieldProps("email")}
                    error={errors.email}
                    touched={!!touched.email}
                    fieldTitle='E-mail'
                    placeholder='@mail'
                    hColor='dark'
                  />
                </TStack>

                <button
                  className='bg-black disabled:bg-gray-500 w-full p-1.5 mt-5 text-white rounded-2xl'
                  type='submit'
                  disabled={!dirty}>
                  Save
                </button>
              </Form>
            </div>
          )}
        </Formik>

        <div className='col-span-6 lg:col-span-2 p-2 bg-white rounded-xl'>
          <h2 className=' text-lg font-semibold text-center'>
            Shipping Details
          </h2>
          <TDivider className='border-gray-200 w-full mb-3' />
          {addNewAddress ? (
            <p className='font-medium'>New shipping details</p>
          ) : (
            <TFlex className='justify-between w-full'>
              {shippingDetailsIndex < 1 ? (
                <p className='text-red-500'>default</p>
              ) : (
                <button
                  aria-label='next-shipping-address'
                  onClick={() =>
                    setShippingDetailsIndex(shippingDetailsIndex - 1)
                  }>
                  <ArrowLeftCircleIcon width={30} />
                </button>
              )}

              {shippingDetailsIndex > 0 && (
                <button
                  aria-label='next-shipping-address'
                  onClick={() => handleDeleteShippingDetail()}>
                  <TrashIcon width={20} />
                </button>
              )}

              <button
                aria-label='next-shipping-address'
                disabled={
                  !userdata?.shippingDetails ||
                  !!(
                    userdata?.shippingDetails?.length - 1 ===
                    shippingDetailsIndex
                  )
                }
                onClick={() =>
                  setShippingDetailsIndex(shippingDetailsIndex + 1)
                }>
                <ArrowRightCircleIcon width={30} />
              </button>
            </TFlex>
          )}

          <Formik
            initialValues={{
              address: focusedShippingDetails.address,
              phone: focusedShippingDetails.phone,
              email: focusedShippingDetails.email,
              location: focusedShippingDetails.location,
              state: focusedShippingDetails.state,
            }}
            enableReinitialize
            validationSchema={shippingValidationSchema}
            onSubmit={handleShippingChanges}>
            {({ getFieldProps, dirty, errors, touched }) => (
              <Form className='space-y-1'>
                <TFlex className='justify-between'>
                  <p>Address</p>
                  {touched.address && errors.address && (
                    <p className='text-sm text-orange-200 style'>
                      {errors.address.toString()}
                    </p>
                  )}
                </TFlex>
                <textarea
                  className='resize-none w-full bg-[whitesmoke] rounded-lg text-[14px] p-2 outline-none '
                  rows={3}
                  placeholder='address'
                  {...getFieldProps("address")}
                />

                <InputTemp
                  fieldType='number'
                  fieldProps={getFieldProps("phone")}
                  error={errors.phone}
                  touched={!!touched.phone}
                  fieldTitle='Phone'
                  placeholder='phone'
                  hColor='dark'
                />

                <InputTemp
                  fieldType='email'
                  fieldProps={getFieldProps("email")}
                  error={errors.email}
                  touched={!!touched.email}
                  fieldTitle='E-mail'
                  placeholder='@mail'
                  hColor='dark'
                />

                <THStack className='w-full'>
                  <InputTemp
                    fieldType='text'
                    fieldProps={getFieldProps("location")}
                    error={errors.location}
                    touched={!!touched.location}
                    fieldTitle='Location'
                    placeholder='location'
                    hColor='dark'
                  />
                  <InputTemp
                    fieldType='text'
                    fieldProps={getFieldProps("state")}
                    error={errors.state}
                    touched={!!touched.state}
                    fieldTitle='State'
                    placeholder='state'
                    hColor='dark'
                  />
                </THStack>
                {/* <button ref={shippingDetailsRef} type='submit' /> */}
                {addNewAddress ? (
                  <THStack className='w-full'>
                    <button
                      className='bg-black disabled:bg-gray-500 w-full p-1.5 mt-5 text-white rounded-2xl'
                      disabled={
                        !!(userdata && userdata?.shippingDetails.length > 4)
                      }
                      onClick={() => {
                        setAddNewAddress(false);
                      }}>
                      Cancel
                    </button>
                    <button
                      className='bg-black disabled:bg-gray-500 w-full p-1.5 mt-5 shadow-md text-white rounded-2xl'
                      type='submit'
                      disabled={!dirty}>
                      Save
                    </button>
                  </THStack>
                ) : (
                  <TStack>
                    <button
                      className='bg-black text-sm px-2 disabled:bg-gray-500 mx-auto p-1.5 mt-5 shadow-md
                       text-white rounded-xl'
                      onClick={() => {
                        setAddNewAddress(true);
                      }}>
                      Add address
                    </button>
                    <button
                      className='bg-black disabled:bg-gray-500 w-full p-1.5 mt-5 shadow-md text-white rounded-2xl'
                      disabled={!dirty}>
                      Save
                    </button>
                  </TStack>
                )}
              </Form>
            )}
          </Formik>
        </div>

        <div className='col-span-6 lg:col-span-2 p-2 bg-white rounded-xl'>
          <h2 className=' text-lg font-semibold text-center'>
            Security / Privacy
          </h2>
          <TDivider className='border-gray-200 w-full mb-3' />

          <p className=''>Preferences</p>

          <button
            className='bg-black inline-flex disabled:bg-gray-500 w-full py-1 justify-evenly items-center mt-5 text-white rounded-2xl'
            onClick={() =>
              newsLetters ? setNewsLetters(false) : setNewsLetters(true)
            }>
            <p> Receive E-mail Newsletters</p>
            {newsLetters ? (
              <CheckIcon width={20} stroke='white' />
            ) : (
              <XMarkIcon width={20} stroke='white' />
            )}
          </button>

          <TStack space='space-y-2' className='w-full p-2 '>
            <p className='text-center text-[15px]'>Connected accounts</p>
            <TFlex className='items-center justify-between w-full bg-[whitesmoke] py-2 px-3 rounded-lg'>
              {/* <GoogleIconSvg boxSize={5} /> */}
              <button className='font-semibold text-[13px] text-gray-500'>
                {!!user?.providerData.find(
                  (data) => data.providerId === "google"
                )
                  ? "Disconnect"
                  : "Connect"}
              </button>
            </TFlex>

            <TFlex className='items-center justify-between w-full bg-[whitesmoke] py-2 px-3 rounded-lg'>
              {/* <FacebookIconSvg boxSize={5} /> */}
              <button className='font-semibold text-[13px] text-gray-500'>
                {!!user?.providerData.find(
                  (data) => data.providerId === "facebook"
                )
                  ? "Disconnect"
                  : "Connect"}
              </button>
            </TFlex>
          </TStack>

          {/* <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={passwordValidationSchema}
            onSubmit={handlePasswordChange}>
            {({ getFieldProps, errors, touched }) => (
              <Form>
                <Text textAlign='center' fontWeight={600} fontSize='15'>
                  Change Password
                </Text>

                <div>
                  <Input
                    bgColor='whitesmoke'
                    type='password'
                    rounded='md'
                    placeholder='Current password'
                    {...getFieldProps("currentPassword")}
                  />
                  {touched.currentPassword && errors.currentPassword && (
                    <Text
                      color='wheat'
                      textAlign='center'
                      fontStyle='oblique'
                      fontSize={13}>
                      {errors.currentPassword}
                    </Text>
                  )}
                </div>

                <div>
                  <Input
                    bgColor='whitesmoke'
                    display={passwordValidated ? "unset" : "none"}
                    placeholder='New password'
                    type='password'
                    rounded='md'
                    {...getFieldProps("newPassword")}
                  />
                  {touched.newPassword && errors.newPassword && (
                    <Text
                      color='wheat'
                      textAlign='center'
                      fontStyle='oblique'
                      fontSize={13}>
                      {errors.newPassword}
                    </Text>
                  )}
                </div>

                <div>
                  <Input
                    bgColor='whitesmoke'
                    display={passwordValidated ? "unset" : "none"}
                    placeholder='Confirm password'
                    type='password'
                    rounded='md'
                    {...getFieldProps("confirmPassword")}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text
                      color='wheat'
                      textAlign='center'
                      fontStyle='oblique'
                      fontSize={13}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </div>
              </Form>
            )}
          </Formik> */}
        </div>

        <div className='col-span-6 lg:col-start-3 lg:col-span-2 p-2 rounded-xl'>
          <TStack>
            {/* <Button
            variant='solid'
            color='white'
            bgColor='black'
            onClick={() => {
              profileRef.current.click();
              addressRef.current.click();
            }}>
            Save Changes
          </Button> */}

            <Link
              href='/fs'
              className='inline-flex justify-between px-2 py-2 relative shadow-md w-full bg-white rounded-xl'>
              <p className='text-center text-xl w-full'>FeedBack</p>
              <ChatBubbleBottomCenterIcon
                width={20}
                className='absolute right-3'
              />
            </Link>
            <button className='inline-flex justify-between px-2 relative shadow-md py-2 w-full bg-white rounded-xl'>
              <p className='text-center text-xl w-full'>Privacy Policy</p>
              <KeyIcon width={20} className='absolute right-3' />
            </button>
          </TStack>
        </div>
      </TGrid>
    </>
  );
};

export default Settings;
