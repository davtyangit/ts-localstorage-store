import { createContext, ReactNode, useContext, useState } from "react"
import ShoppingCard from "../components/ShoppingCard"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCardProviderProps = {
    children: ReactNode
}

type ShoppingCardContext = {
    openCard: () => void,
    closeCard: () => void,
    getItemQuantity: (id: number) => void,
    increaseCardQuantity: (id: number) => void,
    decreaseCardQuantity: (id: number) => void,
    removeFromCard: (id: number) => void,
    cardQuantity: number, 
    cardItems: CardItem[]
}

type CardItem = {
    id: number,
    quantity: number
}

const ShoppingCardContext = createContext({} as ShoppingCardContext)

export const useShoppingCard = () => {
    return useContext(ShoppingCardContext)
}

export const ShoppingCardProvider = ({children} : ShoppingCardProviderProps) => {
    const [cardItems, setCardItems] = useLocalStorage<CardItem[]>("shopping-cart", [])
    const [isOpen, setIsOpen] = useState(false)

    const cardQuantity = cardItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCard = () => setIsOpen(true)
    const closeCard = () => setIsOpen(false)

    const getItemQuantity = (id: number) => {
        return cardItems.find((item) => item.id === id)?.quantity || 0
    }
    const increaseCardQuantity = (id: number) => {
        setCardItems(currItems => {
            if(currItems.find((item) => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map((item) => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item 
                    }
                })
            }
        })
    }
    const decreaseCardQuantity = (id: number) => {
        setCardItems(currItems => {
            if(currItems.find((item) => item.id === id)?.quantity === 1) {
                return currItems.filter((item) => item.id !== id)
            } else {
                return currItems.map((item) => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item 
                    }
                })
            }
        })
    }
    const removeFromCard = (id: number) => {
        setCardItems((currItems) => {
            return currItems.filter((item) => item.id !== id)
        })
    }

    return <ShoppingCardContext.Provider 
        value={{                                         
            getItemQuantity, 
            increaseCardQuantity, 
            decreaseCardQuantity, 
            removeFromCard, 
            cardItems, 
            cardQuantity,
            openCard,
            closeCard
        }}>
            {children}
            <ShoppingCard isOpen={isOpen}/>
            </ShoppingCardContext.Provider>
}