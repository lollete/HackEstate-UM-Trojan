import React, { useState } from 'react';
import { UploadCloud, FileText, PlusCircle, Trash2, FileWarning } from 'lucide-react';

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- Data Interfaces ---
interface UploadedFile {
    id: string;
    name: string;
    type: string; // e.g., 'pdf', 'jpg', 'png'
    size: string; // e.g., '2.5 MB'
}

// --- Main UploadListingDocuments Component ---
const UploadListingDocuments: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadedDocuments, setUploadedDocuments] = useState<UploadedFile[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            const invalidFiles = filesArray.filter(file => !allowedTypes.includes(file.type));

            if (invalidFiles.length > 0) {
                setError('Only PDF, JPG, and PNG files are allowed.');
                setSelectedFiles([]); // Clear selection
                return;
            }
            setSelectedFiles(filesArray);
        }
    };

    const handleUpload = () => {
        if (selectedFiles.length === 0) {
            setError('Please select files to upload.');
            return;
        }
        setError(null);

        // Simulate upload process
        const newUploaded = selectedFiles.map(file => ({
            id: Math.random().toString(36).substring(2, 11), // Simple unique ID
            name: file.name,
            type: file.type.split('/')[1],
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        }));

        setUploadedDocuments(prev => [...prev, ...newUploaded]);
        setSelectedFiles([]); // Clear selected files after "upload"
        alert(`Successfully "uploaded" ${newUploaded.length} documents.`);
    };

    const handleDeleteDocument = (id: string) => {
        setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen font-inter flex justify-center items-center">
            <Card className="w-full max-w-2xl rounded-xl shadow-2xl border border-gray-200">
                <CardHeader className="p-6 border-b border-gray-200 bg-white rounded-t-xl">
                    <CardTitle className="text-3xl font-extrabold text-gray-800 flex items-center">
                        <UploadCloud size={28} className="mr-3 text-blue-600" /> Upload Listing Documents
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2 text-base">
                        Upload property titles, floor plans, permits, and other related documents.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 bg-white rounded-b-xl space-y-7">
                    {/* File Input Section */}
                    <div>
                        <label htmlFor="documentUpload" className="block text-sm font-semibold text-gray-800 mb-2">
                            Select Documents <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center space-x-3">
                            <Input
                                id="documentUpload"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="flex-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <Button
                                onClick={handleUpload}
                                disabled={selectedFiles.length === 0}
                                className="bg-blue-600 hover:bg-blue-700 py-2.5 px-6 text-base font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Upload
                            </Button>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                <FileWarning size={16} className="mr-1" /> {error}
                            </p>
                        )}
                        {selectedFiles.length > 0 && (
                            <div className="mt-3 text-sm text-gray-600">
                                Selected: {selectedFiles.map(file => file.name).join(', ')}
                            </div>
                        )}
                    </div>

                    {/* Uploaded Documents List */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <FileText size={20} className="mr-2 text-gray-600" /> Uploaded Documents
                        </h3>
                        {uploadedDocuments.length === 0 ? (
                            <p className="text-gray-500 text-sm">No documents uploaded yet.</p>
                        ) : (
                            <ul className="space-y-3">
                                {uploadedDocuments.map(doc => (
                                    <li key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <FileText size={20} className="text-green-600" />
                                            <div>
                                                <p className="font-medium text-gray-800">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{doc.size} - {doc.type.toUpperCase()}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteDocument(doc.id)}
                                            className="text-red-500 hover:bg-red-50"
                                            aria-label={`Delete ${doc.name}`}
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Submit Button for the form context (if this was part of a larger form) */}
                    {/* <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3.5 text-xl font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Save Listing Documents
          </Button> */}
                </CardContent>
            </Card>
        </div>
    );
};

export default UploadListingDocuments;
