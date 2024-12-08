import { useEffect, useState } from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import makeSvgDataUri from "../util/makeSvgDataUri";
import { getComments } from "../queries/comment";

const styles = StyleSheet.create({
  page: {
    padding: 56,
  },
  header: {
    fontSize: 16,
    fontWeight: 1000,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 1000,
    marginBottom: 10,
    marginTop: 4,
  },
  span: {
    fontSize: 11,
    fontWeight: 1000,
    textAlign: "center",
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 11,
    textAlign: "justify",
    marginBottom: 8,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    objectPosition: "center",
  },
});

const ReportPDF = ({ report, data }) => {
  const [processedData, setProcessedData] = useState([]);
  const { id: reportId } = report;

  useEffect(() => {
    const processData = async () => {
      const newProcessedData = await Promise.all(
        data.map(async (d) => {
          const { id: pageId, name, overview, type } = d;

          try {
            const svgElement = document.getElementById(name);

            if (!svgElement)
              throw new Error(`Element with ID "${name}" not found`);

            const svg = svgElement.outerHTML;
            let width = +svgElement.getAttribute("width");
            let height = +svgElement.getAttribute("height");

            const pngDataUri = await makeSvgDataUri(svg, { width, height });
            const comments = await getComments(reportId, pageId);

            return {
              id: pageId,
              name,
              overview,
              pngDataUri,
              comments,
              type: type.split("_").join(" ").toLowerCase(),
            };
          } catch (error) {
            console.error(error);
            return { pageId, name, overview, pngDataUri: null, comments: [] };
          }
        })
      );
      setProcessedData(newProcessedData);
    };

    if (reportId) {
      processData();
    }
  }, [reportId, data]);

  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.header}>Overview</Text>
          <Text style={styles.paragraph}>{report.overview}</Text>
        </View>
        {processedData.map(
          ({ id, name, overview, type, comments, pngDataUri }, idx) => (
            <View key={id} style={{ marginBottom: 10 }}>
              <Image style={styles.image} src={pngDataUri} />

              <Text style={styles.span}>
                {`Figure ${idx + 1}: ${name} ${type}`}
              </Text>

              <Text style={styles.subHeader}>Summary</Text>
              <Text style={styles.paragraph}>{overview}</Text>

              <Text style={styles.subHeader}>Notes</Text>

              <View>
                {comments.map(({ id, comment }) => (
                  <Text key={`comment-${id}`} style={styles.paragraph}>
                    {comment}
                  </Text>
                ))}
              </View>
            </View>
          )
        )}
      </Page>
    </Document>
  );
};

export default ReportPDF;
