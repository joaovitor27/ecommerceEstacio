import {useEffect, useState} from 'react';
import {ProducerData} from '../models/ProducerData.tsx';
import {getProducer} from '../services/producer.tsx';

export default function useProducers(): [string, ProducerData[]] {
  const [title, setTitle] = useState<string>('');
  const [producers, setProducers] = useState<ProducerData[]>([]);

  useEffect(() => {
    const result = getProducer();
    setTitle(result.title);
    setProducers(result.data);
  }, []);

  return [title, producers];
}
