import { PDFDownloadLink } from '@react-pdf/renderer';

const useExport = ({ document, fileName = "report.pdf" }) => {
    return (
        <PDFDownloadLink document={document} fileName={fileName}>
            {({ blob, url, loading, error }) =>
                loading ? 
                    <button className='bg-transparent text-white border-2 border-blue-700 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white'>Loading document...</button > : 
                    <button className='bg-transparent text-white border-2 border-blue-700 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white'>Download Reports</button>
            }
        </PDFDownloadLink>
    );
};

export default useExport;
