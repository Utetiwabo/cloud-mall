import Link from "next/link";
import { TFlex } from "./TElements";

export const ListItem1 = ({ name, href }) => {
  return (
    <>
      <li className='m-1 mx-3'>
        <Link href={href}>{name}</Link>
      </li>
    </>
  );
};

export const ListItem2 = ({ Icon, category, href }) => {
  return (
    <>
      <li className='m-1 mx-2 flex flex-col items-center cursor-pointer '>
        <Link href={href}>
          <TFlex className='flex-col items-center'>
            <div className='bg-gray-200 p-4 rounded-full'>
              <Icon />
            </div>
            <p className=''>{category}</p>
          </TFlex>
        </Link>
      </li>
    </>
  );
};
