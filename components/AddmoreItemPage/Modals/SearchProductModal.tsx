import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import SearchProductAutoComplete from '../../SearchProductsAutoComplete'

interface searchProductModalProps {
    isOpen: boolean
    handleClick: Function
    onClose: () => void
}

const SearchProductModal = ({ isOpen, onClose, handleClick }: searchProductModalProps) => {
    return (
        <Modal
            blockScrollOnMount={true}
            motionPreset='slideInRight'
            isOpen={isOpen}
            size="4xl"
            onClose={onClose}>

            <ModalOverlay />
            <ModalContent className='w-11/12'>
                <ModalBody>

                    <SearchProductAutoComplete handleProductClicked={handleClick} />

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SearchProductModal