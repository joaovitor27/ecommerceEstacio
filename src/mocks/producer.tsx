import {Producer} from '../models/Producer.tsx';

function randomNumberGenerator(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const producer: Producer = {
  title: 'Produtores',
  data: [
    {
      id: 1,
      name: 'Green',
      image: require('../assets/producers/green.png'),
      distance: randomNumberGenerator(1, 500),
      stars: randomNumberGenerator(1, 5),
    },
    {
      id: 2,
      name: 'Salad',
      image: require('../assets/producers/salad.png'),
      distance: randomNumberGenerator(1, 500),
      stars: randomNumberGenerator(1, 5),
    },
    {
      id: 3,
      name: 'Potager',
      image: require('../assets/producers/potager.png'),
      distance: randomNumberGenerator(1, 500),
      stars: randomNumberGenerator(1, 5),
    },
    {
      id: 4,
      name: 'Grow',
      image: require('../assets/producers/grow.png'),
      distance: randomNumberGenerator(1, 500),
      stars: randomNumberGenerator(1, 5),
    },
    {
      id: 5,
      name: 'Jenny Jack',
      image: require('../assets/producers/jennyJack.png'),
      distance: randomNumberGenerator(1, 500),
      stars: randomNumberGenerator(1, 5),
    },
    {
      id: 6,
      name: 'Potager',
      image: require('../assets/producers/potager.png'),
      distance: randomNumberGenerator(1, 500),
      stars: randomNumberGenerator(1, 5),
    },
    {
      id: 7,
      name: 'Green',
      image: require('../assets/producers/green.png'),
      distance: randomNumberGenerator(1, 500),
      stars: randomNumberGenerator(1, 5),
    },
    {
      id: 8,
      name: 'Grow',
      image: require('../assets/producers/grow.png'),
      distance: randomNumberGenerator(1, 500),
      stars: randomNumberGenerator(1, 5),
    },
  ],
};

export default producer;
