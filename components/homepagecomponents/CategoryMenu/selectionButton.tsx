import { Button } from '@chakra-ui/react';
import React from 'react';

export default function SelectionButton({ title, select, setSelect }: { title: { title: string }, select: { title: string }, setSelect: any }) {

    return (
        <Button
            h="45px"
            borderRadius={["8px","16px","24px"]}
            mr="10px"
            style={title.title == select.title ? { background: "#C3DFEE" } : {}}
            onClick={() => {
                setSelect(title)
            }}>
            {title.title}
        </Button>
    )
}