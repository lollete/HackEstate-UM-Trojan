import React, { useState } from 'react';
import { FileText, CheckCircle, XCircle, Clock, FileWarning, UploadCloud, PlusCircle, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- Data Interfaces ---
interface DocumentStatus {
    id: string;
    step: number; // For ordered display, optional
    title: string; // e.g., "Property Title Deed", "Building Permit"
    description: string; // Brief info about the document
    uploadedFileName: string;
    uploadedFileType: string; // e.g., 'PDF', 'JPG', 'PNG'
    uploadedFileSize: string; // e.g., '1.4MB'
    status: 'verified' | 'rejected' | 'pending';
    submissionDate: string; // e.g., 'July 30, 2025' or '16 Sept 10:00 am'
}

// --- Mock Data (Initial documents for display) ---
const initialMockDocuments: DocumentStatus[] = [
    {
        id: 'doc1',
        step: 1,
        title: 'Property Title Deed',
        description: 'Official document proving ownership of the property.',
        uploadedFileName: 'title_deed_12345.pdf',
        uploadedFileType: 'PDF',
        uploadedFileSize: '2.1MB',
        status: 'verified',
        submissionDate: 'July 25, 2025 10:00 am',
    },
    {
        id: 'doc2',
        step: 2,
        title: 'Building Permit',
        description: 'Permit for construction and renovations on the property.',
        uploadedFileName: 'building_permit_ABC.pdf',
        uploadedFileType: 'PDF',
        uploadedFileSize: '1.8MB',
        status: 'rejected',
        submissionDate: 'July 26, 2025 02:30 pm',
    },
    {
        id: 'doc3',
        step: 3,
        title: 'Floor Plan',
        description: 'Detailed layout of the property.',
        uploadedFileName: 'floor_plan_XYZ.jpg',
        uploadedFileType: 'JPG',
        uploadedFileSize: '0.9MB',
        status: 'pending',
        submissionDate: 'July 27, 2025 09:00 am',
    },
];

// --- Sub-Component for a single document item ---
interface DocumentItemProps {
    document: DocumentStatus;
    onUpdateStatus: (id: string, status: 'verified' | 'rejected') => void;
    onDelete: (id: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onUpdateStatus, onDelete }) => {
    const statusClasses = {
        verified: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
        pending: 'bg-gray-100 text-gray-700',
    };

    const statusIcon = {
        verified: <CheckCircle size={18} className="mr-1 fill-green-500 text-white" />,
        rejected: <XCircle size={18} className="mr-1 fill-red-500 text-white" />,
        pending: <Clock size={18} className="mr-1 text-gray-500" />,
    };

    return (
        <div className="flex items-start space-x-4 p-4 border-b last:border-b-0">
            {/* Step Number */}
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm shadow-sm">
                {document.step}
            </div>

            {/* Document Details */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-gray-800">{document.title}</h3>
                    <span className="text-sm text-gray-500">{document.submissionDate}</span>
                </div>
                {document.description && (
                    <p className="text-sm text-gray-600 mb-3">{document.description}</p>
                )}

                {/* File Preview */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 w-fit">
                    <FileText size={20} className="text-blue-500" />
                    <div>
                        <p className="font-medium text-gray-800">{document.uploadedFileName}</p>
                        <p className="text-xs text-gray-500">{document.uploadedFileType}, {document.uploadedFileSize}</p>
                    </div>
                </div>

                {/* Action Buttons (for demonstration of verification) */}
                {document.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                        <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => onUpdateStatus(document.id, 'verified')}
                        >
                            Verify
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => onUpdateStatus(document.id, 'rejected')}
                        >
                            Reject
                        </Button>
                    </div>
                )}
            </div>

            {/* Status Badge & Delete Button */}
            <div className="flex-shrink-0 flex flex-col items-end justify-between h-full pt-1">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${statusClasses[document.status]} mb-2`}>
                    {statusIcon[document.status]}
                    {document.status === 'pending' ? 'Pending' : document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(document.id)}
                    className="text-gray-400 hover:bg-gray-100 hover:text-red-500"
                    aria-label={`Delete ${document.uploadedFileName}`}
                >
                    <Trash2 size={18} />
                </Button>
            </div>
        </div>
    );
};

// --- Main RealEstateDocumentVerificationManager Component ---
const DocumentVerificationManager: React.FC = () => {
    const [documents, setDocuments] = useState<DocumentStatus[]>(initialMockDocuments);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [newDocTitle, setNewDocTitle] = useState('');
    const [newDocDescription, setNewDocDescription] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploadError(null);
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            // Allowed types for real estate documents
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            const invalidFiles = filesArray.filter(file => !allowedTypes.includes(file.type));

            if (invalidFiles.length > 0) {
                setUploadError('Only PDF, JPG, PNG, GIF, DOC, DOCX files are allowed.');
                setSelectedFiles([]);
                return;
            }
            setSelectedFiles(filesArray);
        }
    };

    const handleUpload = () => {
        if (selectedFiles.length === 0 || !newDocTitle) {
            setUploadError('Please select a file and provide a document title.');
            return;
        }
        setUploadError(null);

        const newDocumentsToAdd: DocumentStatus[] = selectedFiles.map((file, index) => ({
            id: `new-doc-${Date.now()}-${index}`, // Unique ID
            step: documents.length + 1 + index, // Assign next step number
            title: newDocTitle,
            description: newDocDescription,
            uploadedFileName: file.name,
            uploadedFileType: file.type.split('/')[1] || 'Unknown',
            uploadedFileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            status: 'pending', // New uploads are always pending
            submissionDate: format(new Date(), 'MMM dd, yyyy hh:mm a'),
        }));

        setDocuments(prev => [...prev, ...newDocumentsToAdd]);
        setSelectedFiles([]);
        setNewDocTitle('');
        setNewDocDescription('');
        alert(`Successfully submitted ${newDocumentsToAdd.length} document(s) for verification.`);
    };

    const handleUpdateDocumentStatus = (id: string, newStatus: 'verified' | 'rejected') => {
        setDocuments(prev =>
            prev.map(doc =>
                doc.id === id ? { ...doc, status: newStatus } : doc
            )
        );
    };

    const handleDeleteDocument = (id: string) => {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
    };

    return (
        <div className="p-4 sm:p-6 min-h-screen font-inter flex justify-center items-start">
            <Card className="w-full">
                <CardHeader className="p-6 ">
                    <CardTitle className="text-3xl font-extrabold text-gray-800 flex items-center">
                        <UploadCloud size={28} className="mr-3 text-blue-600" /> Document Verification
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2 text-base">
                        Upload new real estate documents and track their verification status.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 bg-white space-y-8">
                    {/* Upload New Document Section */}
                    <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                            <PlusCircle size={24} className="mr-2 text-green-600" /> Upload New Document
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="newDocTitle" className="block text-sm font-semibold text-gray-800 text-left mb-2">
                                    Document Title <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="newDocTitle"
                                    type="text"
                                    placeholder="e.g., Property Title Deed, Sales Agreement"
                                    value={newDocTitle}
                                    onChange={(e) => setNewDocTitle(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="newDocDescription" className="block text-sm font-semibold text-gray-800 text-left mb-2">
                                    Description (Optional)
                                </label>
                                <Input
                                    id="newDocDescription"
                                    type="text"
                                    placeholder="Brief description of the document..."
                                    value={newDocDescription}
                                    onChange={(e) => setNewDocDescription(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="documentFileInput" className="block text-sm font-semibold text-gray-800 text-left mb-2">
                                    Select File <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="documentFileInput"
                                    type="file"
                                    multiple={false} // Typically one legal document at a time for specific titles
                                    onChange={handleFileChange}
                                    className="flex-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {selectedFiles.length > 0 && (
                                    <p className="text-sm text-gray-600 mt-2 text-left">Selected: <span className="font-medium">{selectedFiles[0]?.name}</span></p>
                                )}
                            </div>
                            {uploadError && (
                                <p className="text-red-500 text-sm mt-2 flex items-center justify-center">
                                    <FileWarning size={16} className="mr-1" /> {uploadError}
                                </p>
                            )}
                            <Button
                                onClick={handleUpload}
                                disabled={selectedFiles.length === 0 || !newDocTitle}
                                className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Submit Document for Verification
                            </Button>
                        </div>
                    </div>

                    {/* Verification Status List */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <FileText size={24} className="mr-2 text-gray-600" /> Verification Status
                        </h3>
                        {documents.length === 0 ? (
                            <p className="text-gray-500 text-center py-6">No documents submitted for verification yet.</p>
                        ) : (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                {documents.map(doc => (
                                    <DocumentItem
                                        key={doc.id}
                                        document={doc}
                                        onUpdateStatus={handleUpdateDocumentStatus}
                                        onDelete={handleDeleteDocument}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DocumentVerificationManager;
