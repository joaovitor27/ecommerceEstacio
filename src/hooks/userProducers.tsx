import {useEffect, useState} from 'react';
import {ProducerData} from '../models/ProducerData.tsx';
import ProducerService from '../services/producer.tsx';

export default function useProducers(): [ProducerData[]] {
  const [producers, setProducers] = useState<ProducerData[]>([]);

  useEffect(() => {
    const producerService = new ProducerService()
    producerService.findAll().then((result) => {
      setProducers(result);
    });

  }, []);

  return [producers];
}
