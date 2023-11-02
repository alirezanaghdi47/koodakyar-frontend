import {createContext, useState} from "react";

const initialModalState = {isOpen: false, type: "", data: null};
const initialDialogState = {isOpen: false, type: "", data: null};
const initialDrawerState = {isOpen: false, type: "", data: null};
const initialMenuState = {isOpen: false, type: "", data: null, anchorEl: null};
const initialPopoverState = {isOpen: false, type: "", data: null, anchorEl: null};

export const PortalContext = createContext(null);

export const PortalProvider = ({children}) => {

    const [modal, setModal] = useState(initialModalState);
    const [dialog, setDialog] = useState(initialDialogState);
    const [drawer, setDrawer] = useState(initialDrawerState);
    const [menu, setMenu] = useState(initialMenuState);
    const [popover, setPopover] = useState(initialPopoverState);

    const isOpenModal = (type) => modal.isOpen && modal.type === type;
    const isOpenDialog = (type) => dialog.isOpen && dialog.type === type;
    const isOpenDrawer = (type) => drawer.isOpen && drawer.type === type;
    const isOpenMenu = (type) => menu.isOpen && menu.type === type;
    const isOpenPopover = (type) => popover.isOpen && popover.type === type;

    const _onOpenModal = (type, data = null) => setModal({isOpen: true, type: type, data: data});
    const _onCloseModal = () => setModal(initialModalState);
    const _onOpenDialog = (type, data = null) => setDialog({isOpen: true, type: type, data: data});
    const _onCloseDialog = () => setDialog(initialDialogState);
    const _onOpenDrawer = (type, data = null) => setDrawer({isOpen: true, type: type, data: data});
    const _onCloseDrawer = () => setDrawer(initialDrawerState);
    const _onOpenMenu = (type, anchorEl, data = null) => setMenu({isOpen: true, type: type, data: data, anchorEl: anchorEl});
    const _onCloseMenu = () => setMenu(initialMenuState);
    const _onOpenPopover = (type, anchorEl, data = null) => setPopover({isOpen: true, type: type, data: data, anchorEl: anchorEl});
    const _onClosePopover = () => setPopover(initialPopoverState);

    return (
        <PortalContext.Provider value={{
            modal, isOpenModal, _onOpenModal, _onCloseModal,
            dialog, isOpenDialog, _onOpenDialog, _onCloseDialog,
            drawer, isOpenDrawer, _onOpenDrawer, _onCloseDrawer,
            menu, isOpenMenu, _onOpenMenu, _onCloseMenu,
            popover, isOpenPopover, _onOpenPopover, _onClosePopover
        }}>
            {children}
        </PortalContext.Provider>
    )
}