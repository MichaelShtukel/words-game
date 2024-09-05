import { useEffect, useMemo, useState } from 'react';
import Modal from '../../components/Modal/Modal';

function onunload() {
  const newTabCounter = localStorage.getItem('tabsCounter')
  if (newTabCounter) {
    localStorage.setItem('tabsCounter', (parseInt(newTabCounter) - 1).toString())
  }
}

export default function useTabsCounter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    const tabsCounter = localStorage.getItem('tabsCounter')
    if (tabsCounter) {
      localStorage.setItem('tabsCounter', (parseInt(tabsCounter) + 1).toString())
      localStorage.setItem('tabsCounter', tabsCounter)
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    const tabsCounter = localStorage.getItem('tabsCounter')
    console.log('tabsCounter', tabsCounter)
    if (!tabsCounter) {
      localStorage.setItem('tabsCounter', '1')
    } else {
      localStorage.setItem('tabsCounter', (parseInt(tabsCounter) + 1).toString())
    }

    window.onunload = onunload

    return onunload
  }, []);

  useEffect(() => {
    const cb = () => {
      const tabsOpen = localStorage.getItem('tabsCounter')
      if (tabsOpen) {
        if (parseInt(tabsOpen) > 1) {
          handleOpenModal()
        } else {
          handleCloseModal()
        }
      }
    }
    window.addEventListener('storage', cb);

    return () => {
      window.removeEventListener('storage', cb);
    }
  }, []);

  const tabsCounterModal = useMemo(() => <Modal isOpen={isModalOpen} onClose={handleCloseModal} />, [isModalOpen])

  return {
    tabsCounterModal,
  }
}
