import React from 'react';
import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

interface Props {
    isVisible: boolean
}

const NewFolderModal = ({isVisible = false}: Props) => {
    return (
        <Modal title={"Добавление папки"}
               height='auto'
               width='40%'
               isVisible
               buttons={(
                   <>
                       <Button>Создать</Button>
                       <Button>Отмена</Button>
                   </>
               )}
        >
            <Input label='Название'/>
        </Modal>
    );
};

export default NewFolderModal;