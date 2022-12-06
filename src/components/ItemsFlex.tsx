import { ItemFlex } from "src/components/Item";
import { ItemTypes } from "types/types";
import { THStack } from "./TElements";

const ItemsFlex = ({ items }: { items: ItemTypes[] }) => {
  return (
    <THStack className='overflow-x-auto w-full lg:justify-center mx-auto'>
      {items?.map((item) => (
        <ItemFlex key={item._id} product={item} />
      ))}
    </THStack>
  );
};

export default ItemsFlex;
