import { useEffect, useState } from 'react';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';

import Logo from './assets/devmemory_logo.png';
import Reset from './svgs/restart.svg';
import { GridItems } from './components/GridItem';
import { formatTimeElapse } from './helpers/formatTimeElapse';

function App() {

  const [play, setPlay] = useState<boolean>(false);
  const [timeElapsed, setTimeElapse] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  // Start and restart the game
  useEffect(() => resetAndCreateGame(), []);

  // Duration game
  useEffect( () => {
    const timer = setInterval( () => {
      play && setTimeElapse(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [play, timeElapsed]);

  // Verify if the cards are match and count moves
  useEffect( () => {
    if(shownCount === 2){
      let opened = gridItems.filter( item => item.shown === true);
      if(opened.length === 2){

        if(opened[0].item === opened[1].item){
          
          let tmpGrid = [...gridItems];
          for(let i in tmpGrid){
        
            if(tmpGrid[i].shown){
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          } 
          setGridItems(tmpGrid);
          setShownCount(0);
        }
        else{
          
          setTimeout( () => {
            let tmpGrid = [...gridItems];
            for(let i in tmpGrid){
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 400);
          
        }
        setMoveCount(moveCount+1);

      }
    }
  }, [shownCount, gridItems]);

  // Verify if game is over
  useEffect( () => {
    if(moveCount > 0 && gridItems.every( item => item.permanentShown === true)){
      setPlay(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGame = () => {
    // step 1 - reset game
    setTimeElapse(0);
    setMoveCount(0);
    setShownCount(0);

    // step 2 - make grid
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      tmpGrid.push({
        item: null, shown: false, permanentShown: false
      });
    }
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1
        do {
          pos = Math.floor(Math.random() * (items.length * 2));
        } while (tmpGrid[pos].item !== null);
        tmpGrid[pos].item = i;
      }
    }


    setGridItems(tmpGrid);
    // step 3 - start game
    setPlay(true);
  }

  const handleClickItem = (index: number) => {
    if(play && index !== null && shownCount < 2){
      let tmpGrid = [...gridItems];

      if(!tmpGrid[index].permanentShown && !tmpGrid[index].shown){
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1)
      }

      setGridItems(tmpGrid);
    }
  }

  return (
    <div className="max-w-[768px] w-full m-auto flex py-12 md:flex-col">
      <div className="flex flex-col md:items-center md:mb-10 sm:px-5">
        <a href="" className="block">
          <img src={Logo} width={200} alt="" />
        </a>
        <div className="w-full my-3 md:w-2/4 md:flex md:justify-between ">
          <InfoItem label="Tempo" value={formatTimeElapse(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </div>

        <Button label="Reiniciar" icon={Reset} onClick={resetAndCreateGame} />
      </div>
      <div className="flex-1 flex justify-end md:justify-center">

        <div className="w-[430px] grid grid-cols-4 gap-2 md:grid-cols-3 sm:px-5" >
          {gridItems.map((item, index) => (
            <GridItems
              key={index}
              item={item}
              onClick={() => handleClickItem(index)}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default App
