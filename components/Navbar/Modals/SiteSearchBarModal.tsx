import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import SiteSearch from '../../SiteSearch'

interface Props {
  isOpen: boolean,
  onClose: () => void
}

const SiteSearchBarModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal
      blockScrollOnMount={true}
      motionPreset='slideInBottom'
      isOpen={isOpen}
      size="4xl"
      onClose={onClose}
    >

      <ModalOverlay />
      <ModalContent className='w-11/12 h-[400px]'>
        <ModalBody>

          <SiteSearch />

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SiteSearchBarModal