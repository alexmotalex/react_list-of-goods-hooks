import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE = '',
  ALPHABET = 'Sort alphabetically',
  LENGTH = 'Sort by length',
}

function getPreparedGoods(
  goods: string[],
  sortBy: SortType,
  isReversed: boolean,
) {
  const sortedGoods = [...goods];

  if (sortBy === SortType.ALPHABET) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === SortType.LENGTH) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        {Object.values(SortType)
          .filter(Boolean)
          .map(type => (
            <button
              key={type}
              type="button"
              className={cn('button', {
                'is-info': type === SortType.ALPHABET,
                'is-success': type === SortType.LENGTH,
                'is-light': sortBy !== type,
              })}
              onClick={() => setSortBy(type)}
            >
              {type}
            </button>
          ))}

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
