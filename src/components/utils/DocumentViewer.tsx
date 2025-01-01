import React, {
  useEffect,
  useRef,
  useState,
  ReactElement,
  JSXElementConstructor,
} from "react";
import ReactPDF, {
  PDFViewer,
  PDFDownloadLink,
  DocumentProps,
} from "@react-pdf/renderer";
import { Button, Space } from "antd";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";

interface Prop {
  children: ReactElement<DocumentProps, string | JSXElementConstructor<any>>;
  fileName: string;
}

const DocumentViewer: React.FC<Prop> = ({ children, fileName }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  // Preload the PDF blob when the component mounts
  useEffect(() => {
    const preloadPdf = async () => {
      const blob = await ReactPDF.pdf(children).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfBlobUrl(url);

      return () => {
        URL.revokeObjectURL(url); // Clean up URL when component unmounts
      };
    };

    preloadPdf();
  }, [children]);

  const printPDF = () => {
    if (pdfBlobUrl) {
      const iframe = iframeRef.current;
      if (iframe) {
        iframe.src = pdfBlobUrl;

        iframe.onload = () => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        };
      }
    }
  };

  return (
    <div>
      <div className="mb-5">
        <Space>
          <PDFDownloadLink document={children} fileName={fileName}>
            <Button type="primary" icon={<DownloadOutlined />} size="small">
              Download
            </Button>
          </PDFDownloadLink>
          <Button
            onClick={printPDF}
            type="primary"
            icon={<PrinterOutlined />}
            size="small"
          >
            Print
          </Button>
        </Space>
      </div>

      <PDFViewer
        width={"100%"}
        style={{ maxWidth: "700px", aspectRatio: "1 / 0.8" }}
        showToolbar={false}
        className="drop-shadow-md border-none"
      >
        {children}
      </PDFViewer>
      <iframe
        ref={iframeRef}
        style={{ display: "none" }}
        title="waybill-iframe"
      />
    </div>
  );
};

export default DocumentViewer;
