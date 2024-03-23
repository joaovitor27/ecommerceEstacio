import green from '../assets/producers/green.png';
import grow from '../assets/producers/grow.png';
import potager from '../assets/producers/potager.png';
import jennyJack from '../assets/producers/jennyJack.png';
import salad from '../assets/producers/salad.png';
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
      image: green,
      distance: `${randomNumberGenerator(1, 500)} m`,
      stars: randomNumberGenerator(1, 5),
    },
    {
      id: 2,
      name: 'Salad',
      image: salad,
      distance: `${randomNumberGenerator(1, 500)} m`,
      stars: randomNumberGenerator(1, 5),
    },
    {
      id: 3,
      name: 'Potager',
      image: potager,
      distance: `${randomNumberGenerator(1, 500)} m`,
      stars: randomNumberGenerator(1, 5),
    },
    {
      id: 4,
      name: 'Grow',
      image: grow,
      distance: `${randomNumberGenerator(1, 500)} m`,
      stars: randomNumberGenerator(1, 5),
    },
    {
      id: 5,
      name: 'Jenny Jack',
      image: jennyJack,
      distance: `${randomNumberGenerator(1, 500)} m`,
      stars: randomNumberGenerator(1, 5),
    },
  ],
};

export default producer;
