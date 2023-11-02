import {useCallback, useRef, useContext} from "react";

//===== libraries =====//
import {EditorContent, useEditor} from '@tiptap/react';
import TextStyle from '@tiptap/extension-text-style';
import {Color} from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Italic from '@tiptap/extension-italic';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Focus from '@tiptap/extension-focus';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import {History} from "@tiptap/extension-history";
import {useFormik} from "formik";
import {useClickOutside} from "@react-hooks-library/core";
import {Box, Button, FormControl, IconButton, Menu, MenuItem, Popover, Stack, Tooltip, Typography} from "@mui/material";
import {
    FiBold,
    FiItalic,
    FiRotateCcw,
    FiType,
    // FiUnderline,
    FiLink,
    FiAlignRight,
    FiAlignLeft,
    FiAlignCenter,
    FiEdit2,
    FiMinus,
    FiAlignJustify,
    FiCheck,
    FiX, FiRotateCw
} from "react-icons/fi";
import {RiPaletteLine} from "react-icons/ri";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {linkSchema} from "@/utils/validations";

//===== modules =====//
import TextInput from "@/components/ui/TextInput";

//===== variables =====//
const colors = [
    {id: 1, title: "مشکی", value: '#1e293b'},
    {id: 2, title: "قرمز", value: '#dc0000'},
    {id: 3, title: "آبی", value: "#0074cc"},
];

const sizes = [
    {id: 1, title: "24", value: 1},
    {id: 2, title: "20", value: 2},
    {id: 3, title: "16", value: 4},
];

const aligns = [
    {id: 1, title: "راست چین", value: "right", icon: <FiAlignRight size={20}/>},
    {id: 2, title: "چپ چین", value: "left", icon: <FiAlignLeft size={20}/>},
    {id: 3, title: "وسط چین", value: "center", icon: <FiAlignCenter size={20}/>},
];

const Toolbar = ({editor, ...props}) => {

    const dropdownMenuRef = useRef(null);
    const {
        popover,
        isOpenPopover,
        _onOpenPopover,
        _onClosePopover,
        menu,
        isOpenMenu,
        _onOpenMenu,
        _onCloseMenu
    } = useContext(PortalContext);

    useClickOutside(dropdownMenuRef, () => _onCloseMenu());

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            link: editor?.getAttributes("link")?.href ? editor?.getAttributes("link")?.href : "",
        },
        validationSchema: linkSchema,
        onSubmit: async (data) => {
            await editor.chain().focus().extendMarkRange('link').setLink({href: data.link}).run();
            await _onClosePopover();
        }
    });

    if (!editor) return null;

    return (
        <Stack
            direction="row"
            gap={1}
            {...props}
        >

            {/* color button */}
            <Tooltip title="رنگ">
                <IconButton
                    variant="text"
                    color="secondary"
                    onClick={(e) => _onOpenMenu("color", e.currentTarget)}
                >
                    <RiPaletteLine
                        size={20}
                        color="#374151"
                    />
                </IconButton>
            </Tooltip>

            {/* color menu */}
            <Menu
                anchorEl={menu.anchorEl}
                open={isOpenMenu("color")}
                onClose={_onCloseMenu}
                transformOrigin={{horizontal: 'center', vertical: 'top'}}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                MenuListProps={{
                    style: {
                        display: "grid",
                        gap: 4
                    }
                }}
                PaperProps={{
                    style: {
                        padding: 8
                    },
                }}
            >

                {
                    colors.map(color =>
                        <MenuItem
                            key={color.id}
                            onClick={(e) => {
                                editor.chain().focus().setColor(color.value).run();
                                _onCloseMenu();
                            }}
                            style={{
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: "center",
                                background: editor.isActive("textStyle", {color: color.value}) ? "#4f46e5" : "transparent",
                                borderRadius: 8,
                                padding: 8,
                            }}
                        >

                            <Box
                                style={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: 8,
                                    background: color.value,
                                }}
                            />

                        </MenuItem>
                    )
                }

            </Menu>

            {/* size button */}
            <Tooltip title="اندازه">
                <IconButton
                    variant="text"
                    color="secondary"
                    onClick={(e) => _onOpenMenu("size", e.currentTarget)}
                >
                    <FiType
                        size={18}
                        color="#374151"
                    />
                </IconButton>
            </Tooltip>

            {/* size menu */}
            <Menu
                anchorEl={menu.anchorEl}
                open={isOpenMenu("size")}
                onClose={_onCloseMenu}
                transformOrigin={{horizontal: 'center', vertical: 'top'}}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                MenuListProps={{
                    style: {
                        display: "grid",
                        gap: 4
                    }
                }}
                PaperProps={{
                    style: {
                        padding: 8
                    }
                }}
            >

                {
                    sizes.map(size =>
                        <MenuItem
                            key={size.id}
                            onClick={() => {
                                editor.chain().focus().toggleHeading({level: size.value}).run();
                                _onCloseMenu();
                            }}
                            style={{
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: "center",
                                background: editor.isActive('heading', {level: size.value}) ? "#4f46e5" : "transparent",
                                borderRadius: 8,
                                padding: 8,
                            }}
                        >

                            <Typography
                                variant="body2"
                                color={editor.isActive('heading', {level: size.value}) ? "#f3f4f6" : "#374151"}
                                fontWeight="bold"
                            >
                                {size.title}
                            </Typography>

                        </MenuItem>
                    )
                }

            </Menu>

            {/* align button */}
            <Tooltip title="تراز بندی">
                <IconButton
                    variant="text"
                    color="secondary"
                    onClick={(e) => _onOpenMenu("align", e.currentTarget)}
                >
                    <FiAlignJustify
                        size={20}
                        color="#374151"
                    />
                </IconButton>
            </Tooltip>

            {/* align menu */}
            <Menu
                anchorEl={menu.anchorEl}
                open={isOpenMenu("align")}
                onClose={_onCloseMenu}
                transformOrigin={{horizontal: 'center', vertical: 'top'}}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                MenuListProps={{
                    style: {
                        display: "grid",
                        gap: 4
                    }
                }}
                PaperProps={{
                    style: {
                        padding: 8
                    }
                }}
            >

                {
                    aligns.map(align =>
                        <Tooltip
                            key={align.id}
                            title={align.title}
                            placement="left"
                        >
                            <MenuItem
                                onClick={() => {
                                    editor.chain().focus().setTextAlign(align.value).run();
                                    _onCloseMenu();
                                }}
                                style={{
                                    display: 'flex',
                                    justifyContent: "start",
                                    alignItems: "center",
                                    background: editor.isActive({textAlign: align.value}) ? "#4f46e5" : "transparent",
                                    color: editor.isActive({textAlign: align.value}) ? "#f3f4f6" : "#374151",
                                    borderRadius: 8,
                                    padding: 8,
                                }}
                            >
                                {align.icon}
                            </MenuItem>
                        </Tooltip>
                    )
                }

            </Menu>

            {/* state button */}
            <Tooltip title="ظاهر متن">
                <IconButton
                    variant="text"
                    color="secondary"
                    onClick={(e) => _onOpenMenu("state", e.currentTarget)}
                >
                    <FiEdit2
                        size={18}
                        color="#374151"
                    />
                </IconButton>
            </Tooltip>

            {/* state menu */}
            <Menu
                anchorEl={menu.anchorEl}
                open={isOpenMenu("state")}
                onClose={_onCloseMenu}
                transformOrigin={{horizontal: 'center', vertical: 'top'}}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                MenuListProps={{
                    style: {
                        display: "grid",
                        gap: 4
                    }
                }}
                PaperProps={{
                    style: {
                        padding: 8
                    }
                }}
            >
                <Tooltip
                    title="تو پر"
                    placement="left"
                >
                    <MenuItem
                        onClick={() => {
                            editor.chain().focus().toggleBold().run();
                            _onCloseMenu();
                        }}
                        style={{
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: "center",
                            background: editor.isActive('bold') ? "#4f46e5" : "transparent",
                            borderRadius: 8,
                            padding: 8,
                        }}
                    >
                        <FiBold
                            size={18}
                            color={editor.isActive('bold') ? "#f3f4f6" : "#374151"}
                        />
                    </MenuItem>
                </Tooltip>

                {/*<Tooltip*/}
                {/*    title="خط زیر"*/}
                {/*    placement="left"*/}
                {/*>*/}
                {/*    <MenuItem*/}
                {/*        onClick={() => editor.chain().focus().toggleUnderline().run()}*/}
                {/*        style={{*/}
                {/*            display: 'flex',*/}
                {/*            justifyContent: "center",*/}
                {/*            alignItems: "center",*/}
                {/*            background: editor.isActive('underline') ? "#4f46e5" : "transparent",*/}
                {/*            borderRadius: 8,*/}
                {/*            padding: 8,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <FiUnderline size={18}/>*/}
                {/*    </MenuItem>*/}
                {/*</Tooltip>*/}

                <Tooltip
                    title="انحنا دار"
                    placement="left"
                >
                    <MenuItem
                        onClick={() => {
                            editor.chain().focus().toggleItalic().run();
                            _onCloseMenu();
                        }}
                        style={{
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: "center",
                            background: editor.isActive('italic') ? "#4f46e5" : "transparent",
                            borderRadius: 8,
                            padding: 8,
                        }}
                    >
                        <FiItalic
                            size={18}
                            color={editor.isActive('italic') ? "#f3f4f6" : "#374151"}
                        />
                    </MenuItem>
                </Tooltip>

            </Menu>

            {/* link button */}
            <Tooltip title="لینک">
                <IconButton
                    color="secondary"
                    onClick={(e) => {
                        _onOpenPopover("link", e.currentTarget);
                    }}
                >
                    <FiLink size={18} color="#374151"/>
                </IconButton>
            </Tooltip>

            {/* link popover */}
            <Popover
                open={isOpenPopover("link")}
                anchorEl={popover.anchorEl}
                onClose={async () => {
                    const pattern = new RegExp("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)", "g");

                    if (!formik.values.link.match(pattern)) {
                        await editor.chain().focus().extendMarkRange('link').setLink({href: editor?.getAttributes("link")?.href}).run();
                        await formik.setFieldValue("link" , editor?.getAttributes("link")?.href)
                    }

                    await _onClosePopover();
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    elevation: 2,
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "end",
                        padding: 16
                    }
                }}
            >

                {/* text input */}
                <TextInput
                    name="link"
                    label="لینک"
                    value={decodeURI(formik.values.link)}
                    onChange={formik.handleChange}
                    touched={formik.touched.link}
                    error={formik.errors.link}
                    style={{
                        width: "100%",
                        marginBottom: 16
                    }}
                />

                <Stack
                    direction='row'
                    gap={1}
                    justifyContent="end"
                    alignItems="center"
                    width="100%"
                >

                    <Button
                        variant="text"
                        color="secondary"
                        size="small"
                        startIcon={<FiX size={16}/>}
                        onClick={() => {
                            editor.chain().focus().extendMarkRange('link').unsetLink().run();
                            _onClosePopover();
                        }}
                    >
                        حذف
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<FiCheck size={16}/>}
                        onClick={() => formik.handleSubmit()}
                    >
                        ثبت
                    </Button>

                </Stack>

            </Popover>

            <Tooltip title="خط افقی">
                <IconButton
                    color="secondary"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <FiMinus size={20} color="#374151"/>
                </IconButton>
            </Tooltip>

            <Tooltip title="بازگشت به جلو">
                <IconButton
                    color="secondary"
                    onClick={() => editor.commands.redo()}
                >
                    <FiRotateCw size={18} color="#374151"/>
                </IconButton>
            </Tooltip>

            <Tooltip title="بازگشت به عقب">
                <IconButton
                    color="secondary"
                    onClick={() => editor.commands.undo()}
                >
                    <FiRotateCcw size={18} color="#374151"/>
                </IconButton>
            </Tooltip>

        </Stack>
    )
}

// @ts-ignore
const TextEditor = ({name, label, value, onChange, touched, error, style}) => {

    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Underline,
            Bold,
            Italic,
            History.configure({
                depth: 10,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Heading.configure({
                levels: [1, 2, 3, 4],
            }),
            Focus.configure({
                className: 'has-focus',
                mode: 'all',
            }),
            Link.configure({
                openOnClick: false,
            }),
            HorizontalRule,
            TextStyle,
            Color,
        ],
        autofocus: false,
        content: value,
        name: name,
        onUpdate: ({editor}) => {
            onChange(editor.isEmpty ? "" : editor.getHTML());
        }
    });

    return (
        <FormControl
            variant="outlined"
            style={style}
        >

            <Typography
                variant="subtitle2"
                color="textSecondary"
                fontWeight="bold"
                style={{marginBottom: 8}}
            >
                {label}
            </Typography>

            <Toolbar
                editor={editor}
                className="toolbar"
            />

            <EditorContent
                editor={editor}
                className='editor'
            />

            {
                (touched && error) && (
                    <Typography
                        variant="caption"
                        color="error"
                        fontWeight="bold"
                        style={{marginTop: 8}}
                    >
                        {error}
                    </Typography>
                )
            }

        </FormControl>
    )
}

export default TextEditor;
