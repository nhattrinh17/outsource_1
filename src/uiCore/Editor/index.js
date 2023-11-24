import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import PropTypes from 'prop-types';

function EditorUi(params) {
    const { handleUploadImg } = params;
    const editContent = useRef('');

    return (
        <div>
            <Editor
                onInit={(evt, editor) => (editContent.current = editor)}
                initialValue="Hãy xóa và nhập nội dung tin tức vào đây..."
                init={{
                    selector: 'textarea',
                    // plugins: 'image',
                    // toolbar: 'image',
                    images_file_types: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp',
                    automatic_uploads: true,
                    images_upload_handler: handleUploadImg,
                    height: 500,
                    menubar: true,
                    plugins: [
                        'a11ychecker',
                        'advlist',
                        'advcode',
                        'advtable',
                        'autolink',
                        'checklist',
                        'export',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'powerpaste',
                        'fullscreen',
                        'formatpainter',
                        'insertdatetime',
                        'media',
                        'table',
                        'help',
                        'wordcount',
                    ],
                    toolbar:
                        'undo redo | casechange blocks | bold italic backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
        </div>
    );
}

EditorUi.propTypes = {
    handleUploadImg: PropTypes.func,
};

export default EditorUi;
