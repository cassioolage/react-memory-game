import { GridItemType } from "../types/GridItemType";
import b7 from '../svgs/b7.svg';
import { items } from '../data/items';

type Props = {
    item: GridItemType;
    onClick: () => void;
}

export const GridItems = ({item, onClick}: Props) => {
    return (
        <div className={`${(item.permanentShown || item.shown) ? "bg-indigo-600" : "bg-indigo-300 opacity-50"} rounded-lg border flex justify-center items-center p-3 cursor-pointer`} onClick={onClick}>
            {!item.permanentShown && !item.shown &&
                <img width={40} src={b7} alt="" />
            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <img width={40} src={items[item.item].icon} alt="" />
            }
        </div>
    );
}