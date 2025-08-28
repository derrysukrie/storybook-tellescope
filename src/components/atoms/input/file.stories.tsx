import type { Meta, StoryObj } from '@storybook/react-vite'
import type { FileItem, FileUploadProps, UploadStatus } from './file'
import FileUpload from './file'

// Story args extends component props with 'status'
type StoryArgs = FileUploadProps & { status: UploadStatus }

// Meta typed with StoryArgs, so argTypes can include 'status'
const meta = {
    title: 'ATOMS/FormInputs/Input',
    component: FileUpload,
    parameters: {
        controls: {
            exclude: ['files'],
        },
    },
    argTypes: {
        status: {
            options: ['pre-upload', 'uploading', 'complete', 'error'],
            control: { type: 'select' },
        },
        onSelectFiles: { action: 'onSelectFiles' },
        onDelete: { action: 'onDelete' },
    },
} satisfies Meta<StoryArgs>

export default meta

const createFilesFromStatus = (status: UploadStatus): FileItem[] => {
    if (status === 'pre-upload') return []

    return [
        {
            name:
                status === 'uploading'
                    ? 'document_file_name.pdf'
                    : status === 'complete'
                      ? 'document_file_name.pdf'
                      : 'Upload failed.',
            size: 102000,
            status,
            progress: status === 'uploading' ? 42 : 100,
            errorMessage: status === 'error' ? 'File too large' : undefined,
        },
    ]
}

export const File: StoryObj<StoryArgs> = {
    args: {
        status: 'pre-upload',
        files: [],
        error: false,
        errorMsg: 'Unsuported file.',
    },
    render: ({ status, onSelectFiles, onDelete, ...rest }) => {
        const files = createFilesFromStatus(status)
        return (
            <FileUpload {...rest} files={files} onSelectFiles={onSelectFiles} onDelete={onDelete} />
        )
    },
}
