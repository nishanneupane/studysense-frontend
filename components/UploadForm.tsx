"use client"
import { useState } from 'react';
import { uploadNote } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const UploadForm = ({ subject }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const router = useRouter()

    const handleUpload = async () => {
        if (files.length === 0) return;
        setUploading(true);
        try {
            await uploadNote(subject, files);
            setFiles([]);
            router.refresh();
            alert('Notes uploaded successfully!');
        } catch (error) {
            alert('Error uploading notes: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Upload Notes</h2>
            <Input
                type="file"
                multiple
                accept=".txt,.docx,.pdf"
                onChange={e => setFiles(Array.from(e.target.files))}
                className="mb-4"
            />
            <Button onClick={handleUpload} disabled={uploading || files.length === 0}>
                {uploading ? 'Uploading...' : 'Upload'}
            </Button>
        </div>
    );
};

export default UploadForm;