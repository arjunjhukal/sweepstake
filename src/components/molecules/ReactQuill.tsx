// 'use client';

// // next
// import dynamic from 'next/dynamic';

// // material-ui
// import Box from '@mui/material/Box';

// // third-party
// import 'react-quill-new/dist/quill.snow.css';

// // project imports

// const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

// interface Props {
//     value?: string;
//     editorMinHeight?: number;
//     onChange?: (value: string) => void;
// }


// export default function ReactQuillEditor({ value, editorMinHeight = 135, onChange }: Props) {

//     return (
//         <Box
//             sx={(theme) => ({
//                 '& .quill': {
//                     // bgcolor: 'background.paper',
//                     // ...theme.applyStyles('dark', { bgcolor: 'secondary.main' }),
//                     borderRadius: '4px',
//                     '& .ql-toolbar': {
//                         // bgcolor: 'secondary.100',
//                         // ...theme.applyStyles('dark', { bgcolor: 'secondary.light' }),
//                         borderColor: 'divider',
//                         borderTopLeftRadius: '8px',
//                         borderTopRightRadius: '8px'
//                     },
//                     // '& .ql-snow .ql-picker': {
//                     //     ...theme.applyStyles('dark', { color: 'secondary.500' })
//                     // },
//                     // '& .ql-snow .ql-stroke': {
//                     //     ...theme.applyStyles('dark', { stroke: theme.palette.secondary.main })
//                     // },
//                     '& .ql-container': {
//                         // bgcolor: 'transparent',
//                         // ...theme.applyStyles('dark', { bgcolor: 'background.default' }),
//                         // borderColor: `${theme.palette.secondary.light} !important`,
//                         borderBottomLeftRadius: '8px',
//                         borderBottomRightRadius: '8px',
//                         '& .ql-editor': { minHeight: editorMinHeight }
//                     },
//                     // ...(theme.direction === ThemeDirection.RTL && {
//                     //     '& .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg': {
//                     //         right: '0%',
//                     //         left: 'inherit'
//                     //     }
//                     // })
//                 }
//             })}
//         >
//             <ReactQuill {...(value && { value })} {...(onChange && { onChange })} />
//         </Box>
//     );
// }

'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Box from '@mui/material/Box';

interface Props {
    value?: string;
    editorMinHeight?: number;
    onChange?: (value: string) => void;
}


export default function CKEditorEditor({
    value = '',
    editorMinHeight = 135,
    onChange
}: Props) {
    return (
        <Box
            sx={{
                '& .ck.ck-editor__editable_inline': {
                    minHeight: editorMinHeight,
                    borderRadius: '8px',
                },
                '& .ck.ck-toolbar': {
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                },
            }}
        >
            <CKEditor
                disableWatchdog={true}
                // editor={ClassicEditor}
                editor={ClassicEditor as any}
                data={value}
                config={{
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        // '|',
                        // 'undo',
                        // 'redo',

                    ],
                }}
                onChange={(_, editor) => {
                    const data = editor.getData();
                    onChange?.(data);
                }}
            />
        </Box>
    );
}

