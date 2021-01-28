export const PRE_EXCHANGE = {
  userBorrowingId: 1,
  userLendingId: 2,
  itemBorrowedId: 1,
  itemLentId: 2
}

export const EXCHANGE_COMPLETE = {
  userBorrowing: {
    id: 1,
    username: 'Alba',
    password: 'isright',
    location: 'Barcelona',
    email: 'alba.stark@knightswatch.got',
    exchangesBorr: [],
    exchangesLend: [
      {
        id: 1,
        accepted: null,
        isActiveBorr: null,
        isActiveLend: null,
        createdAt: new Date()
      }
    ],
    toLendList: [],
    toBorrowList: []
  },
  userLending: {
    id: 2,
    username: 'Jérôme',
    password: 'numbersdivisibleby5',
    location: 'Barcelona',
    email: 'jerome.climaster@verycool.git',
    exchangesBorr: [
      {
        id: 1,
        accepted: null,
        isActiveBorr: null,
        isActiveLend: null,
        createdAt: new Date()
      }
    ],
    exchangesLend: [],
    toLendList: [],
    toBorrowList: []
  },
  itemBorrowed: {
    id: 1,
    title: 'PS4 - Cyberpunk 2077',
    img: 'https://howlongtobeat.com/games/Cyberpunk-2077-2.jpg',
  },
  itemLent: {
    id: 2,
    title: 'PS4 - The Witcher 3: Wild Hunt',
    img: 'https://howlongtobeat.com/games/10270_The_Witcher_3_Wild_Hunt.jpg',
  },
  createdAt: new Date(),
  accepted: null,
  isActiveBorr: null,
  isActiveLend: null,
  id: 2
};

export const EXCHANGE_ACCEPTED = {
  userBorrowing: {
    id: 1,
    username: 'Alba',
    password: 'isright',
    location: 'Barcelona',
    email: 'alba.stark@knightswatch.got',
    exchangesBorr: [],
    exchangesLend: [
      {
        id: 1,
        accepted: null,
        isActiveBorr: null,
        isActiveLend: null,
        createdAt: new Date()
      }
    ],
    toLendList: [],
    toBorrowList: []
  },
  userLending: {
    id: 2,
    username: 'Jérôme',
    password: 'numbersdivisibleby5',
    location: 'Barcelona',
    email: 'jerome.climaster@verycool.git',
    exchangesBorr: [
      {
        id: 1,
        accepted: null,
        isActiveBorr: null,
        isActiveLend: null,
        createdAt: new Date()
      }
    ],
    exchangesLend: [],
    toLendList: [],
    toBorrowList: []
  },
  itemBorrowed: {
    id: 1,
    title: 'PS4 - Cyberpunk 2077',
    img: 'https://howlongtobeat.com/games/Cyberpunk-2077-2.jpg',
  },
  itemLent: {
    id: 2,
    title: 'PS4 - The Witcher 3: Wild Hunt',
    img: 'https://howlongtobeat.com/games/10270_The_Witcher_3_Wild_Hunt.jpg',
  },
  createdAt: new Date(),
  accepted: true,
  isActiveBorr: null,
  isActiveLend: null,
  id: 2
};

export const EXCHANGE_REJECTED = {
  userBorrowing: {
    id: 1,
    username: 'Alba',
    password: 'isright',
    location: 'Barcelona',
    email: 'alba.stark@knightswatch.got',
    exchangesBorr: [],
    exchangesLend: [
      {
        id: 1,
        accepted: null,
        isActiveBorr: null,
        isActiveLend: null,
        createdAt: new Date()
      }
    ],
    toLendList: [],
    toBorrowList: []
  },
  userLending: {
    id: 2,
    username: 'Jérôme',
    password: 'numbersdivisibleby5',
    location: 'Barcelona',
    email: 'jerome.climaster@verycool.git',
    exchangesBorr: [
      {
        id: 1,
        accepted: null,
        isActiveBorr: null,
        isActiveLend: null,
        createdAt: new Date()
      }
    ],
    exchangesLend: [],
    toLendList: [],
    toBorrowList: []
  },
  itemBorrowed: {
    id: 1,
    title: 'PS4 - Cyberpunk 2077',
    img: 'https://howlongtobeat.com/games/Cyberpunk-2077-2.jpg',
  },
  itemLent: {
    id: 2,
    title: 'PS4 - The Witcher 3: Wild Hunt',
    img: 'https://howlongtobeat.com/games/10270_The_Witcher_3_Wild_Hunt.jpg',
  },
  createdAt: new Date(),
  accepted: false,
  isActiveBorr: null,
  isActiveLend: null,
  id: 2
};

export const USER1 = {
  id: 1,
  username: 'Alba',
  password: 'isright',
  location: 'Barcelona',
  email: 'alba.stark@knightswatch.got',
  exchangesBorr: [],
  exchangesLend: [
    {
      id: 1,
      accepted: null,
      isActiveBorr: null,
      isActiveLend: null,
      createdAt: new Date()
    }
  ],
  toLendList: [],
  toBorrowList: []
}
