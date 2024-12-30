import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import {getBorderCircularity, getGradcamResult, getSymmetry} from "../../lib/requests";

const Details = ({ route }) => {
    const { scan } = route.params;
    const [gradcamUri, setGradcamUri] = useState(null);
    const [borderCircularity, setBorderCircularity] = useState("");
    const [symmetry, setSymmetry] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const uri = await getGradcamResult(scan);
                setGradcamUri(uri);
                const circularityResult = await getBorderCircularity(scan);
                setBorderCircularity(circularityResult.message);
                const symmetryResult = await getSymmetry(scan);
                setSymmetry(symmetryResult.message);
            } catch (error) {
                console.error("Error fetching Grad-CAM:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [scan]);


    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : gradcamUri && borderCircularity && symmetry ? (
                <>
                    <Text className="">
                        Grad-CAM Result
                    </Text>
                    <Image
                        source={{ uri: gradcamUri }} // gradcamUri will be the Base64 string
                        style={{ width: 300, height: 300, borderRadius: 8 }}
                    />
                    <Text className="">
                        Border Circularity: {borderCircularity}
                    </Text>
                    <Text className="">
                        Symmetry: {symmetry}
                    </Text>
                </>
            ) : (
                <Text>Unable to load details.</Text>
            )}
        </View>
    );
};

export default Details;
