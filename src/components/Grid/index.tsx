import {useCallback, useEffect, useState} from "react";

import Card from "../Card";

import './index.css'

const Grid = () => {
  const [activeCards, setActiveCards] = useState<{cellIndex: number, rowIndex: number}[]>([])
  const [cards, setCards] = useState<Array<boolean[]>>(
    [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ]
  )

  const grid = [
    [1, 1, 2, 2],
    [3, 3, 4, 4],
    [5, 5, 6, 6],
    [7, 7, 8, 8]
  ]

  const openCard = (cellIndex: number, rowIndex: number) => {
    setActiveCards([...activeCards, { rowIndex, cellIndex }])
  }

  const updateCards = (state: boolean) => {
    activeCards.forEach(({ rowIndex, cellIndex }) => {
      setCards((prevState) => {
        prevState[rowIndex][cellIndex] = state;

        return [...prevState]
      })
    })
  }

  useEffect(() => {
    if (activeCards.length === 2) {
      const firstCard = grid[activeCards[0].rowIndex][activeCards[0].cellIndex];
      const secondCard = grid[activeCards[1].rowIndex][activeCards[1].cellIndex];

      if (firstCard === secondCard) {
        setActiveCards([])
        updateCards(true)
      } else {
        setActiveCards([])
        updateCards(false)
      }
    } else {
      updateCards(true)
    }

    checkGrid()
  }, [activeCards])

  const checkGrid = () => {
    const isGameFinished = [...cards].flat().every(card => card);

    if (isGameFinished) {
      alert('Woo Hoo!')
    }
  }

  const renderCells = (row: number[], rowIndex: number) => {
    return row.map((cell, cellIndex) => {
      return <Card key={`${rowIndex}-${cellIndex}`} isOpen={cards[rowIndex][cellIndex]} onClick={() => openCard(cellIndex, rowIndex)}>{cell}</Card>
    })
  }

  const renderRow = (row: number[], rowIndex: number) => {
    return renderCells(row, rowIndex)
  }

  const renderCards = useCallback(() => {
    return grid.map(renderRow)
  }, [grid, cards])

  return (
    <>
      <div className="grid__wrapper">
        {renderCards()}
      </div>
    </>
  )
}

export default Grid;