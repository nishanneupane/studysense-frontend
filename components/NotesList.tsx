"use client"
import { useState, useEffect } from 'react';
import { getNotes } from '../lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const NotesList = ({ subject }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotes(subject)
            .then(res => setNotes(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [subject]);

    if (loading) return <p className="text-center">Loading notes...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Notes for {subject}</h1>
            {notes.length === 0 ? (
                <p className="text-gray-600">No notes available. Upload some to get started!</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>File Name</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {notes.map(note => (
                            <TableRow key={note.file_name}>
                                <TableCell>{note.file_name}</TableCell>
                                <TableCell>{new Date(note.created_at).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default NotesList;