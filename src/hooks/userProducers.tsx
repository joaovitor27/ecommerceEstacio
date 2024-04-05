import {useEffect, useState} from 'react';
import {ProducerData} from '../models/ProducerData.tsx';
import ProducerService from '../services/producer.tsx';

export default function useProducers(): [string, ProducerData[]] {
  const [title, setTitle] = useState<string>('');
  const [producers, setProducers] = useState<ProducerData[]>([]);

  useEffect(() => {
    const producerService = new ProducerService()
    producerService.findAll().then((result) => {
      setTitle('Produtores');
      setProducers(result);
    });

  }, []);

  return [title, producers];
}
