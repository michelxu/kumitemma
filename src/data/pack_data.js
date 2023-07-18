import pack_01 from '../assets/pack_starter.png' //**imgs
import pack_02 from '../assets/pack_standard.png'
import pack_03 from '../assets/pack_premium.png'
import pack_04 from '../assets/pack_prize.png'
import pack_05 from '../assets/pack_premium_prize.png'

export const packs = [
  {
    id: 1,
    name: 'Starter Pack',
    image: pack_01,
    quantity: 2,
    price: 500,
    available: false,
    description: `Contains 2 cards to start your journey in the arena`,
  },
  {
    id: 2,
    name: 'Standard Pack',
    image: pack_02,
    quantity: 2,
    price: 500,
    available: true,
    description: `Contains 2 cards to start your journey in the arena`,
  },
  {
    id: 3,
    name: 'Premium Pack',
    image: pack_03,
    quantity: 4,
    price: 950,
    available: true,
    description: `Contains 4 cards to start your journey in the arena`,
  },
  {
    id: 4,
    name: 'Prize Pack',
    image: pack_04,
    quantity: 2,
    price: 750,
    available: false,
    description: `Contains 2 cards. Pack obtained as a reward.`,
  },
  {
    id: 5,
    name: 'Prize Premium Pack',
    image: pack_05,
    quantity: 4,
    price: 950,
    available: false,
    description: `Contains 4 cards. Pack obtained as a reward.`,
  },
]