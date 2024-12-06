import { Document, Page, View, Text, Image } from "@react-pdf/renderer";

const ReportPDF = ({ header, data }) => (
    <Document>
        <Page size="Letter" style={{ padding: 96 }}>
            <View style={{ marginBottom: 20 }}>
                {/* Report Overview */}
                <Text style={{ fontSize: 10, marginBottom: 10, textAlign: "justify"}}>{header}</Text>
            </View>
            {data.map((chart, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                {/* Chart Title */}
                <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10, width: "100%", textAlign: "center" }}>
                    {chart.name}
                </Text>
                {/* Chart Overview */}
                <Text style={{ fontSize: 10, marginBottom: 5, textAlign: "justify"}}>{chart.overview}</Text>
                {/* Embed Chart */}
                {chart.chartImage ? (
                    <Image
                    src={chart.chartImage}
                    style={{ width: "100%", height: "auto" }}
                    />  
                ) : (
                    <Text style={{ fontSize: 12 }}>No chart available</Text>
                )}
                </View>
            ))}
        </Page>
    </Document>
);

export default ReportPDF;
