import { useEffect, useState } from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";

import makeSvgDataUri from "../util/makeSvgDataUri";

const ReportPDF = ({ header, data }) => {
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    const processData = async () => {
      const newProcessedData = await Promise.all(
        data.map(async (d) => {
          const { id, name, overview } = d;

          try {
            const svgElement = document.getElementById(name);
            if (!svgElement)
              throw new Error(`Element with ID "${name}" not found`);

            const svg = svgElement.outerHTML;
            const pngDataUri = await makeSvgDataUri(svg);

            return { id, name, overview, pngDataUri };
          } catch (error) {
            console.error(error);
            return { id, name, overview, pngDataUri: null };
          }
        })
      );
      setProcessedData(newProcessedData);
    };

    processData();
  }, [data]);

  return (
    <Document>
      <Page size="Letter" style={{ padding: 96 }}>
        <View style={{ marginBottom: 20 }}>
          {/* Report Overview */}
          <Text
            style={{ fontSize: 10, marginBottom: 10, textAlign: "justify" }}
          >
            {header}
          </Text>
        </View>
        {processedData.map(({ id, overview, pngDataUri }) => (
          <View key={id} style={{ marginBottom: 20 }}>
            {/* Embed Chart */}
            <Image src={pngDataUri} />
            {/* Chart Overview */}
            <Text
              style={{ fontSize: 10, marginBottom: 5, textAlign: "justify" }}
            >
              {overview}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ReportPDF;
