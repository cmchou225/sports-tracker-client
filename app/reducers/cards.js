const defaultState = {
  allCards: []
};

function cards(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_CARD':
      if (state.find(card => card.gameId === action.game.gameId)) {
        return [...state];
      }
      return [action.game, ...state];

    case 'TOGGLE_PLAY_BY_PLAY': {
      return state.map((card) => {
        if (card.gameId === action.gameId) {
          return {
            ...card,
            displayPlayByPlay: !card.displayPlayByPlay
          };
        }
        return card;
      });
    }

    case 'REMOVE_CARD': {
      return state.filter(card => card.gameId !== action.gameId);
    }

    case 'RECEIVE_CARD': {
      return state.map((card) => {
        if (card.gameId === action.game.gameId) {
          return action.game;
        }
        return card;
      });
    }

    case 'UPDATE_CARDS': {
      return state.map((card) => {
        const found = action.some.find((game => game.gameId === card.gameId));
        if (found) {
          return {
            ...found,
            displayPlayByPlay: card.displayPlayByPlay
          };
        }
        return card;
      });
    }

    case 'REPOSITION_CARD': {
      const { from, to } = action;
      if (from < 0 || from >= state.length || to < 0 || to >= state.length) return state;
      const newArray = state.slice();
      newArray[from] = state[to];
      newArray[to] = state[from];
      return newArray;
    }

    case 'SHARE_GAME':
      return {};

    case 'FAILED_CARD_LOAD':
      return state.map((card) => {
        if (card.gameId === action.gameId) {
          return { ...card, failedLoad: true };
        }
        return card;
      });

    default:
      return state;
  }
}

export default cards;
